from rest_framework import serializers

# Representing in float the toxicity of a message for each category
class DetoxifySerializer(serializers.Serializer):
    toxicity = serializers.FloatField()

# Representing the labels of a message
#class LabelsSerializer(serializers.Serializer):
#    name = serializers.ListField(child=serializers.CharField())
#    value = serializers.ListField(child=serializers.FloatField())
#    count = serializers.ListField(child=serializers.IntegerField())


# Representing the message
class ChatMessageSerializer(serializers.Serializer):
    message_id = serializers.CharField(required=False, allow_null=True)
    created_date = serializers.DateTimeField(required=False, allow_null=True)
    text = serializers.CharField()
    lang = serializers.CharField()
    detoxify = DetoxifySerializer()
    #labels = LabelsSerializer(allow_null=True, required=False)
