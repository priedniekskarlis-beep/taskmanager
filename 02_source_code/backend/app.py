from flask import Flask, jsonify, request
from db import get_all_tasks, create_task, delete_task, update_task
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        description = data.get("description")
        priority = data.get("priority", "Medium")
        due_date = data.get("due_date")
        assigned_to = data.get("assigned_to")
        new_task = create_task(title, status, description, priority, due_date, assigned_to)
        return jsonify(new_task), 201
    return jsonify(get_all_tasks())

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task_route(task_id):
    deleted = delete_task(task_id)
    if deleted == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Task deleted"}), 200

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task_route(task_id):
    data = request.get_json(silent=True)
    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400
    title = data["title"]
    status = data.get("status", "To do")
    description = data.get("description")
    priority = data.get("priority", "Medium")
    due_date = data.get("due_date")
    assigned_to = data.get("assigned_to")
    updated = update_task(task_id, title, status, description, priority, due_date, assigned_to)
    if updated is None:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(updated), 200

if __name__ == "__main__":
    app.run(debug=True)