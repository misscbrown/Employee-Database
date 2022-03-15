// dependencies
const inquirer = require("inquirer");
let Database = require("./script.js");
let consoleTable = require("console.table");
console.log("hello world")

// const db = new Database({
//     host: "localhost",
//     port: 3000,
//     user: "root",
//     password: "password",
//     database: "employee_tracker"
// });

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

async function getDeptNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}



