from celery import shared_task
from chat.utils.detect_intent_ai import detect_intent_ai

@shared_task
def async_detect_intent(text):
    return detect_intent_ai(text)
