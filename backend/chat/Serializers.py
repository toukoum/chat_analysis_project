from rest_framework import serializers

# Representing in float the toxicity of a message for each category
class DetoxifySerializer(serializers.Serializer):
    toxicity = serializers.FloatField()
    severe_toxicity = serializers.FloatField()
    obscene = serializers.FloatField()
    identity_attack = serializers.FloatField()
    insult = serializers.FloatField()
    threat = serializers.FloatField()
    sexual_explicit = serializers.FloatField()

# Representing the labels of a message
class LabelsSerializer(serializers.Serializer):
    name = serializers.ListField(child=serializers.CharField())
    value = serializers.ListField(child=serializers.FloatField())
    count = serializers.ListField(child=serializers.IntegerField())

# Representing the emojis of a message
class EmojisSerializer(serializers.Serializer):
    name = serializers.ListField(child=serializers.CharField(), required=False)
    count = serializers.ListField(child=serializers.IntegerField(), required=False)

# Representing the message
class ChatMessageSerializer(serializers.Serializer):
    message_id = serializers.CharField()
    parent_id = serializers.CharField(allow_null=True, required=False)
    user_id = serializers.CharField()
    created_date = serializers.DateTimeField()
    text = serializers.CharField()
    role = serializers.CharField()
    lang = serializers.CharField()
    review_count = serializers.IntegerField(required=False)
    review_result = serializers.BooleanField(required=False, allow_null=True)
    deleted = serializers.BooleanField(required=False, allow_null=True)
    rank = serializers.IntegerField(allow_null=True, required=False)
    synthetic = serializers.BooleanField(required=False, allow_null=True)
    model_name = serializers.CharField(allow_null=True, required=False)
    message_tree_id = serializers.CharField(required=False)
    tree_state = serializers.CharField(required=False)
    detoxify = DetoxifySerializer(allow_null=True, required=False)
    emojis = EmojisSerializer(allow_null=True, required=False)
    labels = LabelsSerializer(allow_null=True, required=False)
