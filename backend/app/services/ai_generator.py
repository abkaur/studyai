def generate_study_material(text: str):
    # Simple MVP generator (no OpenAI, no API key needed)

    # Basic summary (first part of text)
    summary = text[:800]

    # Simple flashcards
    flashcards = [
        {
            "question": "What is the main topic of this document?",
            "answer": "The document discusses the main concepts found in the uploaded study material."
        },
        {
            "question": "What should a student focus on first?",
            "answer": "The introduction and key concepts of the document."
        },
        {
            "question": "Why is this document important?",
            "answer": "Because it contains key study material for understanding the topic."
        }
    ]

    # Simple quiz
    quiz = [
        {
            "question": "What is the purpose of this document?",
            "options": ["Entertainment", "Study", "Cooking", "Travel"],
            "answer": "Study",
            "explanation": "The document is uploaded as study material."
        },
        {
            "question": "What should you read first?",
            "options": ["The conclusion", "Random page", "The introduction", "Skip everything"],
            "answer": "The introduction",
            "explanation": "Starting with the introduction helps understand the topic."
        }
    ]

    return {
        "summary": summary,
        "flashcards": flashcards,
        "quiz": quiz
    }
