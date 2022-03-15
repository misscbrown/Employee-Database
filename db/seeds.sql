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

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Carla", "Brown", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Farhiya", "Mahamud", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Rizwan", "Ashraf", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mica", "Gray", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Leon", "Jackson", 3, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Nicole", "Cristiana", 3, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Tasia", "Graham", 4, 1); 



