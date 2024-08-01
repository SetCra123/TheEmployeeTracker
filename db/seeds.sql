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
       ('Marketing Director', 75000, 5),
       ('Marketing Assistant', 50000, 5),
       ('Director of Sales', 77000, 6),
       ('Sales Assistant', 45000, 6),
       ('Social Media Manager', 60000, 7),
       ('Writer', 70000, 8),
       ('CEO', 120000, 9);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'Ricketts', 1, 1),
       ('Wendell', 'Smurf', 2, 1),
       ('Tim', 'Bot', 3, 2),
       ('Setrige', 'Crawford', 4, 2),
       ('Kendrick', 'Miree', 5, 2),
       ('Marc', 'Abijato', 6, 3),
       ('DJ', 'Exclusive', 7, 4),
       ('Richard', 'McLean', 8, 4),
       ('Prescott', 'Gibbs', 9, 4),
       ('Samantha', 'Savory', 10, 5),
       ('LaTasha', 'McCoy', 11, 5),
       ('Cristine', 'Felix', 12, 6),
       ('Caden', 'Felix', 13, 6),
       ('Tricia', 'Douglas', 14, 7),
       ('Denzell', 'Jobson', 15, 8),
       ('Tomi', 'Adeyemi', 16, 8),
       ('Setrige', 'Crawford', 17, 9);