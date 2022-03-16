// Dependencies

const inquirer = require("inquirer");
let Database = require("./database.js");
let consoleTable = require("console.table");
//const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

// Questions for the user to answer
function mainQuestions() {
    return inquirer
    .prompt([
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
    return inquirer
    .prompt([
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

function getRemoveEmployeeInfo() {
    const employees = getEmployeeNames();
    return inquirer
    .prompt([
        {
            type: 'list',
            message: 'Select the employee you would like to remove',
            name: 'employeeName',
            choices: [
                ...employees
            ]
        }
    ])
}

function getDepartmentInfo() {
    const departments = getDepartmentNames();
    return inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the title of the new role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Select the department the role belongs to',
            name: 'departmentName',
            choices: [
                ...departments
            ]
        }
    ])
}

function getUpdateEmployeeRoleInfo() {
    const employees = getEmployeeNames();
    const roles = getRoles();
    return inquirer
    .prompt([
        {
            type: 'list',
            message: 'Select the employee you would like to update',
            name: 'employeeName',
            choices: [
                ...employees
            ]
        },
        {
            type: 'list',
            message: 'What is the employees new role?',
            name: 'role',
            choices: [
                ...roles
            ]
        }
    ])
}

async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await mainQuestions();

        switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }
            
            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log('add employee' + newEmployee);
                await getAddEmployeeInfo(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo()
                await addRole(newRole);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }

            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break; 
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'View all employees by department': {
                await viewAllEmployeesByDepartment();
                break;
            }

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0);
                return;
            }

            default:
                console.log(`Hey! You shouldn't get here! Action ${prompt.action}`);
        }
    }
}

// Closes the database connection
process.on('exit', async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();