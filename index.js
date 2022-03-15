// dependencies
const inquirer = require("inquirer");
let database = require("./db");
let consoleTable = require("console.table");

const db = new database({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "cms"
});

