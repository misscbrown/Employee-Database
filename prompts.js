// Dependencies

const inquirer = require("inquirer");
let Database = require("./database.js");
let consoleTable = require("console.table");

// Questions for the user to answer
function mainQuestions() {
    return inquirer.prompt([
        {
            type: "list",
            message: 'Choose what you would like to do',
            name: 'action',
            choices: [
                'View all departments',
                'View all employees',
                'View all employees by department',
                'View all roles',
                'Add department',
                'Add employee',
                'Add role',
                'Remove employee',
                'Update employee role',
                'Exit'
            ]
        }
    ])
}

function getAddEmployeeInfo() {
    const managers = getManagerNames();
    const roles = getRoles();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'what is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            message: 'What is the role of the employee?',
            name: 'role',
            choices: [
                ...roles
            ]
        },
        {
            type: 'list',
            message: 'Who is the manager of the employee?',
            name: 'manager',
            choices: [
                ...managers
            ]
        }
    ])
}