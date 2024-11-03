from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import Counter
from chat.Serializers import ChatMessageSerializer
from chat.utils.detect_intent_ai import detect_intent_ai
from chat.utils.toxicity_distribution import calculate_toxicity_distribution

BINS = 5

class ChatAnalysisView(APIView):
    serializer_class = ChatMessageSerializer
  
    def post(self, request, *args, **kwargs):
        messages = request.data.get("messages", [])

        lang_counts = Counter()
        intent_counts = Counter()
        toxicity_scores = []
        total_messages = len(messages)
        unvalid_messages = 0

        for message in messages:
            serializer = ChatMessageSerializer(data=message)
            if serializer.is_valid():
                data = serializer.validated_data
                
                lang_counts[data['lang']] += 1

                intent = detect_intent_ai(data['text'])
                intent_counts[intent] += 1

                toxicity_scores.append(data['detoxify']['toxicity'])
            else:
                print(serializer.errors)
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
