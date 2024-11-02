

def detect_intent_word(text: str) -> str:
    """
    Detect the intent of a message based on keywords.
    We expect bad performance with this method.
    """
    text = text.lower()
    if any(word in text for word in ["summarize", "summary", "resume"]):
        return "Summarization"
    elif any(word in text for word in ["translate", "translation", "traduis"]):
        return "Translation"
    elif any(word in text for word in ["paraphrase", "rephrase", "réécrire"]):
        return "Paraphrasing"
    elif any(word in text for word in ["role-play", "pretend", "joue le rôle de"]):
        return "Role-play"
    else:
        return "Miscellaneous"