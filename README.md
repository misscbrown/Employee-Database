# Employee-Database
A database for employees

Inspiration

To provide a small company owner a database that keeps track of employees and allows he/she to manage employees, departments, roles and salaries, that can be easily run in the command line. 

Challenges

There are many moving parts to this, the first challenge was getting all the data to show in MYSQL and running the database without any errors. Then getting all the index.js code to run without errors proved a lengthy task. A lot of time was spent trying to debug and fix errors, running tests in the console and figuring out the preferred format for the application to run successfully. 

Opportunities for further development

This would be a great application to run with MYSQL Workbench, in order to see the tables and data in a more uniform way. It would also make the application more appealing for those users who do not necessarily have a tech background - viewing the details in the console is quite boring and is not the best practise for users who may have impaired vision, or reading difficulties. It could also be 'pre filled' for specific industry organisations - so that it can act as an easy to use starter template. This would be great for new startups and smaller companies.

Acceptance Criteria
GIVEN a command-line application that accepts user input

WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 