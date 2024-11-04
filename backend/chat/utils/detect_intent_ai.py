from pydantic import BaseModel, Field
from openai import OpenAI
import openai
import os 
import time


openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

class MessageIntent(BaseModel):
    intent: str = Field(..., description="The user intent for the message", enum=["Summarization", "Translation", "Paraphrasing", "Role-play", "Miscellaneous"])


def detect_intent_ai(text: str, max_retries) -> str:
    """
    Detects the intent of a message using the OpenAI fast GPT-4o-mini model.
    Retries with delay if rate limit (error 429) is encountered.
    """
    for attempt in range(max_retries):
        try:
            response = client.beta.chat.completions.parse(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an expert at classifying short phrases in different languages. Classify the user message according to intent. Options: Summarization, Translation, Paraphrasing, Role-play, Miscellaneous."},
                    {"role": "user", "content": text}
                ],
                response_format=MessageIntent
            )
            intent = response.choices[0].message.parsed.intent
            print(intent)
            return intent

        except Exception as e:
            # check if rate limit openai reached
            if 'rate_limit_exceeded' in str(e):
                wait_time = 2 ** attempt  # exponential delay, 2^0, 2^1, 2^2, ...
                print(f"Rate limit reached. Waiting for {wait_time} seconds before retrying...")
                time.sleep(wait_time)
            else:
                print(f"Error in intent detection: {e}")
                return "error"
    
    print("Max retries reached")
    return "error"