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
        let selection = res.choice;

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
    db.showAllEmployees()
        .then(({rows}) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadPrompts());
    
}

function viewEmployeesByDepartment() {
    db.findAllDepartments().then(({ rows }) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));
        
        prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Which department would you like to see employees for?",
              choices: departmentChoices,
            },
        ])

         .then((res) => db.findEmployeesByDepartment(res.departmentId))
         .then(({rows}) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);

         })
         .then(() => loadPrompts());
    
    });
}


function addNewEmployee() {
    prompt([
      {
        name: "first_name",
        message: "Enter the employee's first name?",
      },
      {
        name: "last_name",
        message: "Enter the employee's last name?",
      },
    ]).then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
  
      db.findAllRoles().then(({ rows }) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
  
        prompt({
          type: "list",
          name: "roleId",
          message: "Enter the employee's role?",
          choices: roleChoices,
        }).then((res) => {
          let roleId = res.roleId;
  
          db.findAllEmployees().then(({ rows }) => {
            let employees = rows;
            const managerChoices = employees.map(
              ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              })
            );
  
            managerChoices.unshift({ name: "None", value: null });
  
            prompt({
              type: "list",
              name: "managerId",
              message: "Who is the employee's manager?",
              choices: managerChoices,
            })
              .then((res) => {
                let employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  first_name: firstName,
                  last_name: lastName,
                };
  
                db.createNewEmployee(employee);
              })
              .then(() =>
                console.log(`Added ${firstName} ${lastName} to the database`)
              )
              .then(() => loadPrompts());
          });
        });
      });
    });
  }
  

  function deleteEmployee() {
    db.findAllEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
  
      prompt([
        {
          type: "list",
          name: "employeeId",
          message:
            "Which employee do you want to remove?",
          choices: employeeChoices,
        },
      ])
        .then((res) => db.removeEmployee(res.employeeId))
        .then(() => console.log("Removed employee from the database."))
        .then(() => loadPrompts());
    });
  }
  
  
  function updateEmployeeRole() {
    db.findAllEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
  
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
        },
      ]).then((res) => {
        let employeeId = res.employeeId;
        db.findAllRoles().then(({ rows }) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
  
          prompt([
            {
              type: "list",
              name: "roleId",
              message:
                "Which new role do you want to assign to the selected employee?",
              choices: roleChoices,
            },
          ])
            .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log("Updated employee's role."))
            .then(() => loadPrompts());
        });
      });
    });
  }
  

  function viewAllRoles() {
    db.findAllRoles()
      .then(({ rows }) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadPrompts());
  }


  function addNewRole() {
    db.findAllDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
  
      prompt([
        {
          name: "title",
          message: "What is the name of the new role?",
        },
        {
          name: "salary",
          message: "What is the salary of the new role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the new role belong to?",
          choices: departmentChoices,
        },
      ]).then((role) => {
        db.addNewRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => loadPrompts());
      });
    });
  }
  


  function deleteRole() {
    db.findAllRoles().then(({ rows }) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
  
      prompt([
        {
          type: "list",
          name: "roleId",
          message:
            "Which role do you want to remove? (Warning: This will also remove the role's current employees)",
          choices: roleChoices,
        },
      ])
        .then((res) => db.deleteRole(res.roleId))
        .then(() => console.log("Removed role from the database."))
        .then(() => loadPrompts());
    });
  }



  function viewDepartments() {
    db.findAllDepartments()
      .then(({ rows }) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadPrompts());
  }



  function addNewDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the new department?",
    },
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadPrompts());
  });
}



function deleteDepartment() {
    db.findAllDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
  
      prompt({
        type: "list",
        name: "departmentId",
        message:
          "Which department would you like to remove? (Warning: This will also remove the department's associated roles and employees)",
        choices: departmentChoices,
      })
        .then((res) => db.removeDepartment(res.departmentId))
        .then(() => console.log(`Deleted department from the database`))
        .then(() => loadPrompts());
    });
  }



  function viewBudgetbyDept() {
    db.viewDepartmentBudgets()
      .then(({ rows }) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadPrompts());
  }
  
  function quit() {
    console.log("Dueces!");
    process.exit();
  }