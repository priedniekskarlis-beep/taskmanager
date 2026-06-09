from flask import Flask, jsonify
from db import get_all_tasks

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from the Task Manager backend!"

@app.route("/tasks")
def tasks():
   return jsonify(get_all_tasks())

if __name__ == "__main__":
    app.run(debug=True)
