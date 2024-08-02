const pool = require('./connection');

class DB {
    constructor() {}

    async query(sql, args = []) {
        const user = await pool.connect();
        try {
            const result = await user.query(sql, args);
            return result;
        }
            finally {
                user.release();
            }
    }
}

showAllEmployees() {
    return this.query(
        "SELECT employee.id, employee.first_name, employee.last_name, roll.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employment.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}


createNewEmployee(employee) {
    const { first_name, last_name, role_id, manager_id } = employee;
    return this.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, role_id, manager_id]
    );
  }

deleteEmployee(employeeId) {
    return this.query('DELETE FROM employee WHERE id = $1', [employeeId]);
  }


newEmployeeRole (employeeId, roleId) {
    return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
       roleId,
       employeeId, 
    ]);
}


findAllRoles() {
    return this.query(
        'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;',
    )
}

createNewRole(role) {
    const { title, salary, department_id } = role;
    return this.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        [title, salary, department_id]
    );
}


deleteRole(roleId) {
    return this.query('DELETE FROM role WHERE id = $1', [roleId]);
}