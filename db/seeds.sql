\c employees_db;

INSERT INTO department (name)
VALUES ('Photography'),
       ('Videography'),
       ('Sound Design'),
       ('Audio'),
       ('Marketing'),
       ('Sales'),
       ('Social Media'),
       ('Writing'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Director of Photography', 75000, 1),
       ('Lighting Manager', 65000, 1),
       ('Director', 90000, 2),
       ('Videographer', 80000, 2),
       ('Editor', 70000, 2),
       ('Audio Engineer', 60000, 3),
       ('Sound Manager', 69000, 4),
       ('Microphone Operator', 50000, 4),
       ('Marketing Director', 75000, 5);
       


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'Ricketts', 1, 1),
       ('Wendell', 'Smurf', 2, 1),
       ('Tim', 'Bot', 3, 2),
       ('Setrige', 'Crawford', 4, NULL),
       ('Kendrick', 'Miree', 5, 2),
       ('Marc', 'Abijato', 6, 3),
       ('DJ', 'Exclusive', 7, 4),
       ('Richard', 'McLean', 8, 4),
       ('Prescott', 'Gibbs', 9, 4);
       