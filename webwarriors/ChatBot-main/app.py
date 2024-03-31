# from flask import Flask, render_template, request
# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch
# import os
# import json
# import random
# import difflib

# app = Flask(__name__)

# # Load DialoGPT model and tokenizer
# tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
# model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# # Load intents
# # Load intents
# intents_file = os.path.join(os.path.dirname(__file__), "intents.json")
# with open(intents_file, "r") as file:
#     intents = json.load(file)["intents"]


# # Initialize empty dictionary to hold question-answer pairs
# question_answer_pairs = {}
# for intent, data in intents.items():
#     questions = data.get("questions", [])
#     responses = data.get("responses", [])
#     for i in range(len(questions)):
#         question_answer_pairs[questions[i]] = responses[i]

# def get_chat_response(text):
#     # Check if the text matches any question in question-answer pairs
#     if text in question_answer_pairs:
#         return question_answer_pairs[text]
    
#     # Check for similar questions
#     similar_questions = difflib.get_close_matches(text, question_answer_pairs.keys(), n=1, cutoff=0.8)
#     if similar_questions:
#         return question_answer_pairs[similar_questions[0]]
    
    
#     # Let's chat for 5 lines
#     chat_history_ids = None
#     for step in range(5):
#         new_user_input_ids = tokenizer.encode(str(text) + tokenizer.eos_token, return_tensors='pt')
#         bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids
#         chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
#         response = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
#         # Check if the generated response is not the same as the input text
#         if response.lower().strip() != text.lower().strip():
#             return response
#     return random.choice(list(question_answer_pairs.values()))  # Return a random response if no appropriate response is found

# @app.route("/")
# def index():
#     return render_template('chat.html')

# @app.route("/get", methods=["POST"])
# def chat():
#     msg = request.form["msg"]
#     response = get_chat_response(msg)
#     return response

# if __name__ == '__main__':
#     app.run()

from flask import Flask, render_template, request
import os
import json
import difflib
import random

app = Flask(__name__)

# Load intents
intents_file = os.path.join(os.path.dirname(__file__), "intents.json")
with open(intents_file, "r") as file:
    intents = json.load(file)["intents"]

# Initialize empty dictionary to hold question-answer pairs
question_answer_pairs = {}
for intent, data in intents.items():
    questions = data.get("questions", [])
    responses = data.get("responses", [])
    for question in questions:
        question_answer_pairs[question] = random.choice(responses)


def get_chat_response(text):
    # Check if the text matches any question in question-answer pairs
    if text in question_answer_pairs:
        return question_answer_pairs[text]
    
    # Check for similar questions
    similar_questions = difflib.get_close_matches(text, question_answer_pairs.keys(), n=1, cutoff=0.8)
    if similar_questions:
        return question_answer_pairs[similar_questions[0]]
    
    return "Please take a moment to provide feedback if you have any questions or concerns!!"


@app.route("/")
def index():
    return render_template('chat.html')


@app.route("/get", methods=["POST"])
def chat():
    msg = request.form["msg"]
    response = get_chat_response(msg)
    return response


if __name__ == '__main__':
    app.run()







