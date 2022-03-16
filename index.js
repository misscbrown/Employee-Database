// Dependencies needed to run
const inquirer = require("inquirer");
let Database = require("./database.js");
let consoleTable = require("console.table");
const prompts = require("./prompts.js");

// console.log("hello world")

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    // password: "password",
    database: "employee_tracker"
});

// Starts calls to the database using async - which makes a function return a Promise
// and await, which makes the function wait for a Promise

// Gets information for the manager
async function getManagerInfo() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";
    const rows = await db.query(query);
    console.log("number of rows returned " + rows.length);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

// Gets all the roles in the database
async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);
    let roles = [];
    for(const row of rows) {
        roles.push(row.title);
    }
    return roles;
}

// The required department names
async function getDeptNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}

 // The required department id
async function getDeptId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let arguments = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

// The required role id
async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let arguments = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

// Find the employee id of the named manager
async function getEmployeeId(fullName) {
    let employee = getFirstAndSurname(fullName) 
    let query = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?";
    let arguments = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}

// Gets the employees names
async function getEmployeeNames() {
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

// Selects all to view all roles
async function viewAllRoles() {
    console.log("");
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}

// Selects all to view all departments
async function viewAllDepts() {
    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}

// Selects all to view all employees
async function viewAllEmployees() {
    console.log("");
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}

// Allows viewing all employees by department
async function viewAllEmployeesByDepartment() {
    let query = "SELECT first_name, last_name, department.name FROM ((employeee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

// Returns an array featuring two elements
// Trims any spaces in first name
function getFirstAndSurname( fullName ) {
    let employee = fullName.split(" ");
    if(employee.length === 2) {
        return employee;
    }
    const last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i=0; i<employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}

// Updates the role of the employee
async function updateEmployeeRole(employeeInfo) {
    const roleId = await getRoleId(employeeInfo.role);
    const employee = getFirstAndSurname(employeeInfo.employeeName);
    let query = "UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?";
    let args = [roleId, employee[0], employee[1]];
    const rows = await db.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}

// Adds a manager as an employee 
async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);
    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    const rows = await db.query(query, args);
    console.log(`added employee ${employeeInfo.first_name} ${employeeInfo.last_name}`);
}

// Removes an employee from database
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndSurname(employeeInfo.employeeName);
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]]
    const rows = await db.query(query, args);
    console.log(`Removed ${employeeName[0]} ${employeeName[1]}`);
}

// Adds a department
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = "INSERT into department (name) VALUES (?)";
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added ${departmentName}`);
}

// // Adds specific information to the role
async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added ${title}`);
};

prompts();

