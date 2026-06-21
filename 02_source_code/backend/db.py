import os
import psycopg
from psycopg.rows import dict_row

def get_connection():
    return psycopg.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        port=os.environ.get("DB_PORT", "5432"),
        dbname=os.environ.get("DB_NAME", "practice_project"),
        user=os.environ.get("DB_USER", "student"),
        password=os.environ.get("DB_PASSWORD", "student_password"),
    )

def get_all_tasks():
    conn = get_connection()
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute("SELECT id, title, status, description, priority, due_date, assigned_to FROM tasks ORDER BY id")
        tasks = cur.fetchall()
    conn.close()
    return tasks

def create_task(title, status, description, priority, due_date, assigned_to):
    conn = get_connection()
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute(
            "INSERT INTO tasks (title, status, description, priority, due_date, assigned_to) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id, title, status, description, priority, due_date, assigned_to",
            (title, status, description, priority, due_date, assigned_to),
        )
        new_task = cur.fetchone()
    conn.commit()
    conn.close()
    return new_task

def delete_task(task_id):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
        deleted_count = cur.rowcount
    conn.commit()
    conn.close()
    return deleted_count

def update_task(task_id, title, status, description, priority, due_date, assigned_to):
    conn = get_connection()
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute(
            "UPDATE tasks SET title = %s, status = %s, description = %s, priority = %s, due_date = %s, assigned_to = %s WHERE id = %s RETURNING id, title, status, description, priority, due_date, assigned_to",
            (title, status, description, priority, due_date, assigned_to, task_id),
        )
        updated_task = cur.fetchone()
    conn.commit()
    conn.close()
    return updated_task