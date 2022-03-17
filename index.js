// Dependencies needed to run
const inquirer = require("inquirer");
let Database = require("./database.js");
let consoleTable = require("console.table");
// const prompts = require("./prompts.js");

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
async function getManagerNames() {
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
async function getDepartmenttNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}

 // The required department id
async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let arguments = [departmentName];
    const rows = await db.query(query, arguments);
    return rows[0].id;
}

// The required role id
async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let arguments = [roleName];
    const rows = await db.query(query, arguments);
    return rows[0].id;
}

// Find the employee id of the named manager
async function getEmployeeId(fullName) {
    let employee = getFirstAndSurname(fullName) 
    let query = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?";
    let arguments = [employee[0], employee[1]];
    const rows = await db.query(query, arguments);
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
async function viewAllDepartments() {
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

async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
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

async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
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

async function deptInfo() {
    console.log('anything really')
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    console.log('these are', rows)
    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}

async function getDepartmentInfo() {
    const departments = await deptInfo();
    console.log('reading departments', departments)
    
    return inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'departmentName'
        }]
    )
}

async function getRoleInfo() {
    const departments = await getDepartmenttNames();
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


async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
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
                console.log('here is our', newDepartmentName);
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

