from flask import Flask, jsonify, request
from db import get_all_tasks, create_task

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from the Task Manager backend!"

@app.route("/tasks", methods=["GET", "POST"])
def tasks():
    if request.method == "POST":
        data = request.get_json(silent=True)
        if not data or not data.get("title"):
            return jsonify({"error": "Title is required"}), 400
        title = data["title"]
        status = data.get("status", "To do")
        new_task = create_task(title, status)
        return jsonify(new_task), 201
    return jsonify(get_all_tasks())

if __name__ == "__main__":
    app.run(debug=True)