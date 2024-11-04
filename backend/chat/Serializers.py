from rest_framework import serializers

"""
Very Basic serializer for chat messages
"""
class DetoxifySerializer(serializers.Serializer):
    toxicity = serializers.FloatField()

class ChatMessageSerializer(serializers.Serializer):
    message_id = serializers.CharField(required=False, allow_null=True)
    created_date = serializers.DateTimeField(required=False, allow_null=True)
    text = serializers.CharField()
    lang = serializers.CharField()
    detoxify = DetoxifySerializer()
