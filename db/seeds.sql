USE employee_tracker

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Fortune");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 150000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 150000, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 600000, 2);
INSERT into role (title, salary, department_id) VALUES ("Fortune Publisher", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Fortune Producer", 60000, 3);
INSERT into role (title, salary, department_id) VALUES ("Fortune Manager", 50000, 3);
INSERT into role (title, salary, department_id) VALUES ("Intern", 20000, 4);

