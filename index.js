// dependencies
const inquirer = require("inquirer");
let Database = require("./database.js");
let consoleTable = require("console.table");
console.log("hello world")

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    // password: "password",
    database: "employee_tracker"
});

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


