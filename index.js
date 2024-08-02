const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { inherits } = require("util");

init();


function init() {
    const logoText = logo({ name: "Get-Set Media"}).render();


    console.log(logoText);

    loadPrompts();
}


function loadPrompts()  {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES",
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
                },
                {
                    name: "Add New Employee",
                    value: "ADD_NEW_EMPLOYEE",  
                },
                {
                    name: "Delete Employee",
                    value: "DELETE_EMPLOYEE",
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE",
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ALL_ROLES",
                },
                {
                    name: "Add New Role",
                    value: "ADD_NEW_ROLE",
                },
                {
                    name: "Delete Roll",
                    value: "DELETE_ROLE",
                },
                {
                    
                }
            
            
            
            
            ]
        }
    ])
}