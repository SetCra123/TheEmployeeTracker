const pool = require('./connection');

class DB {
    constructor() {}

    // async query(sql, args = []) {
    //     const user = await pool.connect();
    //     try {
    //         return await user.query(sql, args);
    //         } catch (error) {
    //           console.error("Database query failed:", error)
    //           throw error;
    //         }
    //         finally {
    //             user.release();
    //         }
    // }

    async query(sql, args = []) {
      const client = await pool.connect();
      console.log('Executing query:', sql); // Log query for debugging
      console.log('With arguments:', args);
      try {
          const result = await client.query(sql, args);
          return result; 
      } catch (error) {
          console.error('Database query failed:', error);
          throw error;
      } finally {
          client.release();
      }
  }

showAllEmployees() {
    return this.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}


findEmployeesByDepartment(departmentId) {
    return this.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = $1;',
      [departmentId]
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

findAllDepartments() {
    return this.query('SELECT id, name FROM department;');
  }



  createDepartment(department) {
    return this.query('INSERT INTO department (name) VALUES ($1)', [
      department.name,
    ]);
  }

  
  removeDepartment(departmentId) {
    return this.query('DELETE FROM department WHERE id = $1', [departmentId]);
  }

  

}

  module.exports = new DB();