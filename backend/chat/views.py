from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import Counter
from chat.Serializers import ChatMessageSerializer
from chat.utils.detect_intent_ai import detect_intent_ai
from chat.utils.toxicity_distribution import calculate_toxicity_distribution
from concurrent.futures import ThreadPoolExecutor, as_completed

BINS = 5 
MAX_THREAD = 100
MAX_RETRIES = 3

class ChatAnalysisView(APIView):
    """
    API endpoint that allows chat messages to be analyzed.
    """
    serializer_class = ChatMessageSerializer
    def post(self, request, *args, **kwargs):
        messages = request.data.get("messages", [])

        lang_counts = Counter()
        intent_counts = Counter()
        toxicity_scores = []
        total_messages = len(messages)
        unvalid_messages = 0

        # Analyse each message
        def process_message(message):
            serializer = ChatMessageSerializer(data=message)
            if serializer.is_valid():
                data = serializer.validated_data
                intent = detect_intent_ai(data['text'], MAX_RETRIES)
                if intent == "error":
                    return None
                return {
                    "intent": intent,
                    "toxicity": data['detoxify']['toxicity'],
                    "lang": data['lang']
                }
            else:
                print(f"Invalid message: {serializer.errors}")
                return None

        # Multi-threading
        with ThreadPoolExecutor(max_workers=MAX_THREAD) as executor:
            future_to_message = {executor.submit(process_message, message): message for message in messages}
            for future in as_completed(future_to_message):
                result = future.result()
                if result:
                    intent_counts[result["intent"]] += 1
                    toxicity_scores.append(result["toxicity"])
                    lang_counts[result["lang"]] += 1
                else:
                    unvalid_messages += 1

        if (total_messages - unvalid_messages) == 0:
            return Response({"error": "No valid messages to analyze"}, status=status.HTTP_400_BAD_REQUEST)

        toxicity_data = calculate_toxicity_distribution(toxicity_scores, BINS)
        
        response_data = {
            "total_messages": total_messages,
            "valid_messages": total_messages - unvalid_messages,
            "unvalid_messages": unvalid_messages,
            "language_distribution": dict(sorted(lang_counts.items(), key=lambda item: item[1], reverse=True)),
            "intent_distribution": dict(intent_counts),
            "toxicity_distribution": toxicity_data,
        }

        return Response(response_data, status=status.HTTP_200_OK)
