DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department INT NOT NULL

);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);