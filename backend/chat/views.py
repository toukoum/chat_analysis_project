import asyncio
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import Counter
from chat.Serializers import ChatMessageSerializer
from chat.utils.detect_intent_ai import detect_intent_ai
from chat.task import async_detect_intent
from time import sleep

class ChatAnalysisView(APIView):
    serializer_class = ChatMessageSerializer
  
    async def post(self, request, *args, **kwargs):
        messages = request.data.get("messages", [])

        lang_counts = Counter()
        intent_counts = Counter()
        toxicity_scores = []
        total_messages = len(messages)
        tasks = []
        

        for message in messages:
            serializer = ChatMessageSerializer(data=message)
            if serializer.is_valid():
                data = serializer.validated_data
                
                # Accumuler les langues
                lang_counts[data['lang']] += 1

                # Accumuler les intentions (ici faire la fonction avec les structure output d'openai)
                intent = detect_intent_ai(data['text'])
                intent_counts[intent] += 1

                ## Accumuler les scores de toxicité
                if data['detoxify'] and 'toxicity' in data['detoxify']:
                    toxicity_scores.append(data['detoxify']['toxicity'])

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Calcul de la distribution de la toxicité
        toxicity_data = calculate_toxicity_distribution(toxicity_scores)
        print(toxicity_data)

        intents = await asyncio.gather(*tasks)

        for task in intents:
            intent_counts[task] += 1


        # Préparation du JSON de retour
        response_data = {
            "total_messages": total_messages,
            "language_distribution": dict(lang_counts),
            "intent_distribution": dict(intent_counts),
            "toxicity_distribution": toxicity_data,
        }

        return Response(response_data, status=status.HTTP_200_OK)


def calculate_toxicity_distribution(scores):
    import numpy as np
    bins = 10
    hist, bin_edges = np.histogram(scores, bins=bins)
    return {
        "histogram": hist.tolist(),
        "bin_edges": bin_edges.tolist()
    }
