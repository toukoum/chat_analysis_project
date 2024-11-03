from pydantic import BaseModel, Field
from openai import OpenAI
import openai
from dotenv import load_dotenv
import os 


load_dotenv("../../../.env")
openai.api_key = os.getenv("salut")

client = OpenAI()

class MessageIntent(BaseModel):
    intent: str = Field(..., description="The user intent for the message", enum=["Summarization", "Translation", "Paraphrasing", "Role-play", "Miscellaneous", "Unknown"])


def detect_intent_ai(text: str) -> str:
    """
    Detects the intent of a message using the OpenAI GPT-4 model.
    Returns the classified intent as a string.
    """
    
    try:
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert at classifying short phrases in different languages. Classify the user message according to intent. Options: Summarization, Translation, Paraphrasing, Role-play, Miscellaneous, Unknown."},
                {"role": "user", "content": text}
            ],
            response_format=MessageIntent
        )
        intent = response.choices[0].message.parsed.intent
        print(intent)
        return intent

    except Exception as e:
        print(f"Error in intent detection: {e}")
        return "Unknown"
                            
          


