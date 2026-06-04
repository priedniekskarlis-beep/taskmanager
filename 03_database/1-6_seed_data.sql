INSERT INTO users (full_name, email, password_hash, role)
VALUES ('Demo Administrator', 'admin@example.local', '$2b$12$placeholder_hash_for_seed_data_only', 'administrator');

INSERT INTO tasks (title, description, status, priority, assigned_to)
VALUES('Setting up the repository', 'Creating the initial project structure and launching Docker', 'Done', 'High', 1);

INSERT INTO audit_logs(user_id, action, entity_name, entity_id)
VALUES(1, 'Create task', 'tasks', 1);

