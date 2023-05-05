DROP TABLE IF EXISTS users_tasks;
DROP TABLE IF EXISTS users_profiles;
DROP TABLE IF EXISTS users_projects;
DROP TABLE IF EXISTS profiles_tasks;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS profiles;

CREATE TABLE users (
    users_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(20) NOT NULL
);

CREATE TABLE users_projects (
    users_id INTEGER,
    projects_id INTEGER
);

CREATE TABLE projects (
    projects_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    class VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    starting_date DATE,
    ending_date DATE,
    project_scope VARCHAR(1000),
    project_requirements VARCHAR(1000),
    project_budget INTEGER,
    completion_time INTEGER,
    milestones VARCHAR(1000),
    state VARCHAR(20)
);

CREATE TABLE profiles (
    profiles_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT NOT NULL,
    name VARCHAR(20) NOT NULL

);

CREATE TABLE users_profiles (
    users_id INTEGER,
    profiles_id INTEGER
);

CREATE TABLE users_tasks (
    users_id INTEGER,
    tasks_id INTEGER
);

CREATE TABLE tasks (
    tasks_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id INTEGER REFERENCES projects(projects_id),
    name VARCHAR(50),
    unit TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    profile VARCHAR(20),
    starting_date DATE,
    ending_date DATE,
    performance INTEGER,
    tools VARCHAR(20)
);

CREATE TABLE profiles_tasks (
    profiles_id INTEGER,
    tasks_id INTEGER
);

ALTER TABLE ONLY users_projects
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (users_id) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY users_projects
    ADD CONSTRAINT projects_id_fkey FOREIGN KEY (projects_id) REFERENCES projects(projects_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY users_profiles
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (users_id) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY users_profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (profiles_id) REFERENCES projects(projects_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY users_tasks
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (users_id) REFERENCES users(users_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY users_tasks
    ADD CONSTRAINT tasks_id_fkey FOREIGN KEY (tasks_id) REFERENCES tasks(tasks_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY profiles_tasks
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (profiles_id) REFERENCES profiles(profiles_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY profiles_tasks
    ADD CONSTRAINT tasks_id_fkey FOREIGN KEY (tasks_id) REFERENCES tasks(tasks_id) ON UPDATE CASCADE ON DELETE RESTRICT;







