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
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS",
                },
                {
                    name: "Add New Department",
                    value: "ADD_NEW_DEPARTMENT",
                },
                {
                    name: "Delete Department",
                    value: "DELETE_DEPARTMENT",
                },
                {
                    name: "View Budget by Department",
                    value: "VIEW_BUDGET_BY_DEPARTMENT",
                },
                {
                    name: "Quit",
                    value: "QUIT",
                },
            
            
            
            ],
        },
    ]).then((res) => {
        let selection = res.selection;

        switch (selection) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;
            case "ADD_NEW_EMPLOYEE":
                addNewEmployee();
                break;
            case "DELETE_EMPLOYEE":
                deleteEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "VIEW_ALL_ROLES":
                viewAllRoles();
                break;
            case "ADD_NEW_ROLE":
                addNewRole();
                break;
            case "DELETE_ROLE":
                deleteRole();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "ADD_NEW_DEPARTMENT":
                addNewDepartment();
                break;
            case "DELETE_DEPARTMENT":
                deleteDepartment();
                break;
            case "VIEW_BUDGET_BY_DEPARTMENT":
                viewBudgetbyDept();
                break;
            default:
                quit();

        }
    });
}


function viewEmployees() {
    db.
}