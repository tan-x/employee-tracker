const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
  figlet.text('Employee Manager', { font: 'Cybermedium' }, function (
    err,
    data
  ) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(
      '------------------------------------------------------------------------------'
    );
    console.log(data);
    console.log(
      '------------------------------------------------------------------------------'
    );
    employeeTrk();
  });
});

function employeeTrk() {
  // create arrays for query data to be passed into child functions
  let deptArray = [];
  let mgrArray = [];
  let roleArray = [];
  let emplArray = [];
  // get department list
  connection.query(
    'SELECT department.department FROM trackerdb.department',
    (err, quer) => {
      quer.forEach((dept) => deptArray.push(dept.department));
      deptArray.push(new inquirer.Separator());
      // get manager list
      connection.query(
        'SELECT department.manager FROM trackerdb.department',
        (err, quer) => {
          quer.forEach((dept) => mgrArray.push(dept.manager));
          mgrArray.push(new inquirer.Separator());
          //get role list
          connection.query(
            'SELECT role.title FROM trackerdb.role',
            (err, quer) => {
              quer.forEach((role) => roleArray.push(role.title));
              roleArray.push(new inquirer.Separator());
              // get employee list
              connection.query(
                'SELECT employee.first_name, employee.last_name FROM trackerdb.employee',
                (err, quer) => {
                  quer.forEach((emp) =>
                    emplArray.push(`${emp.first_name} ${emp.last_name}`)
                  );
                  emplArray.push(new inquirer.Separator());
                  // call inquirer function and pass arrays down
                  inquirerSwitch(deptArray, mgrArray, roleArray, emplArray);
                }
              );
            }
          );
        }
      );
    }
  );
}

// main inquirer with switch case to run a corresponding function to user's selection
function inquirerSwitch(dept, mgr, role, emp) {
  inquirer
    .prompt({
      name: 'root',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'View All Employees By Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Department Manager',
        new inquirer.Separator(),
      ],
    })
    .then((res) => {
      switch (res.root) {
        case 'View All Employees':
          viewEmpl();
          break;
        case 'View All Employees By Department':
          viewEmplDept(dept);
          break;
        case 'View All Employees By Manager':
          viewEmplMgr(mgr);
          break;
        case 'Add Employee':
          addEmpl(role);
          break;
        case 'Remove Employee':
          removeEmpl(emp);
          break;
        case 'Update Employee Role':
          updtEmplRole(emp, role);
          break;
        case 'Update Department Manager':
          updtDeptMgr(dept, emp);
          break;
      }
    });
}

function viewEmpl() {
  let query = `SELECT employee.id,
		employee.first_name,
		employee.last_name,
		role.title,
		department.department,
		employee.salary,
		department.manager
		FROM trackerdb.employee
		INNER JOIN role
		ON employee.roleID = role.roleID
		INNER JOIN department
		ON role.deptID = department.deptID`;
  connection.query(query, function (err, res) {
    console.table(res);
    employeeTrk();
  });
}

function viewEmplDept(dept) {
  inquirer
    .prompt({
      name: 'dept',
      type: 'list',
      message: 'Which department?',
      choices: dept,
    })
    .then((res) => {
      let query = `SELECT employee.id,
					employee.first_name,
					employee.last_name,
					role.title,
					department.department,
					employee.salary,
					department.manager
					FROM trackerdb.employee
					INNER JOIN role
					ON employee.roleID = role.roleID
					INNER JOIN department
					ON role.deptID = department.deptID
					WHERE department.department = "${res.dept}"`;
      connection.query(query, function (err, res) {
        console.table(res);
        employeeTrk();
      });
    });
}

function viewEmplMgr(mgr) {
  inquirer
    .prompt({
      name: 'mgr',
      type: 'list',
      message: 'Which manager?',
      choices: mgr,
    })
    .then((res) => {
      let query = `SELECT employee.id,
					employee.first_name,
					employee.last_name,
					role.title,
					department.department,
					employee.salary,
					department.manager
					FROM trackerdb.employee
					INNER JOIN role
					ON employee.roleID = role.roleID
					INNER JOIN department
					ON role.deptID = department.deptID
					WHERE department.manager = "${res.mgr}"`;
      connection.query(query, function (err, res) {
        console.table(res);
        employeeTrk();
      });
    });
}

function addEmpl(role) {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's role?",
        choices: role,
      },
      {
        name: 'salary',
        type: 'number',
        message: "What is the employee's salary?",
      },
    ])
    .then((res) => {
      let roleID = role.findIndex((i) => i === res.role) + 1;
      connection.query(
        'INSERT INTO employee (first_name, last_name, salary, roleID) VALUES (?, ?, ?, ?)',
        [res.firstName, res.lastName, res.salary, roleID],
        (err, quer) => {
          if (err) throw err;
          console.log('Employee added!');
          employeeTrk();
        }
      );
    });
}

function removeEmpl(emp) {
  inquirer
    .prompt({
      name: 'remove',
      type: 'list',
      message: 'Which employee would you like to remove?',
      choices: emp,
    })
    .then((res) => {
      let name = res.remove.split(' ');
      connection.query(
        'DELETE FROM employee WHERE first_name = ? AND last_name = ?',
        [name[0], name[1]],
        (err, quer) => {
          if (err) throw err;
          console.log('Employee removed. :(');
          employeeTrk();
        }
      );
    });
}

function updtEmplRole(emp, role) {
  inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: emp,
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's new role?",
        choices: role,
      },
    ])
    .then((res) => {
      let name = res.employee.split(' ');
      let roleID = role.findIndex((i) => i === res.role) + 1;
      connection.query(
        'UPDATE employee SET roleID = ? WHERE first_name = ? AND last_name = ?',
        [roleID, name[0], name[1]],
        (err, quer) => {
          if (err) throw err;
          console.log('Role Updated!');
          employeeTrk();
        }
      );
    });
}

function updtDeptMgr(dept, emp) {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'list',
        message: 'Which department would you like to update?',
        choices: dept,
      },
      {
        name: 'manager',
        type: 'list',
        message: "Who is the department's new manager?",
        choices: emp,
      },
    ])
    .then((res) => {
      connection.query(
        'UPDATE department SET manager = ? WHERE department = ?',
        [res.manager, res.department],
        (err, quer) => {
          if (err) throw err;
          console.log('Manager Updated!');
          employeeTrk();
        }
      );
    });
}
