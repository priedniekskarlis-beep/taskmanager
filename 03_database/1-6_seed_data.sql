INSERT INTO users (full_name, email, role)
VALUES ('Demo Administrator', 'admin@example.local', 'administrator');

INSERT INTO tasks (title, description, status, priority, assigned_to)
VALUES('Setting up the repository', 'Creating the initial project structure and launching Docker', 'Done', 'High', 1);

INSERT INTO audit_logs(user_id, action, entity_name, entity_id)
VALUES(1, 'Create task', 'tasks', 1);

