const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3000,
  user: 'root',
  password: 'password',
  database: 'trackerDB',
});

// connection.connect(err => {
//     if (err) throw err;
// })

figlet.text('Employee Manager', { font: 'Cybermedium' }, function (err, data) {
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

function employeeTrk() {
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
        'Update Employee Manager',
      ],
    })
    .then((res) => {
      switch (res.root) {
        case 'View All Employees':
          viewEmpl();
          break;
        case 'View All Employees By Department':
          viewEmplDept();
          break;
        case 'View All Employees By Manager':
          viewEmplMgr();
          break;
        case 'Add Employee':
          addEmpl();
          break;
        case 'Remove Employee':
          removeEmpl();
          break;
        case 'Update Employee Role':
          updtEmplRole();
          break;
        case 'Update Employee Manager':
          updtEmplMgr();
          break;
      }
    });
}

function viewEmpl() {
  console.table('view employee');
  employeeTrk();
}

function viewEmplDept() {
  console.table('view employee by dept');
  employeeTrk();
}

function viewEmplMgr() {
  console.table('view employee by mgr');
  employeeTrk();
}

function addEmpl() {
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
        name: 'dept',
        type: 'list',
        message: "What is the employee's role?",
        choices: ['test'],
      },
      {
        name: 'manager',
        type: 'list',
        message: "Who is the employee's manager?",
        choices: ['test'],
      },
    ])
    .then((res) => {
      console.table(res);
      employeeTrk();
    });
}

function removeEmpl() {
  inquirer
    .prompt({
      name: 'remove',
      type: 'list',
      message: 'Which employee would you like to remove?',
      choices: ['test', 'test2'],
    })
    .then((res) => {
      console.log(res);
      employeeTrk();
    });
}

function updtEmplRole() {
  inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: ['test', 'test2'],
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's new role?",
        choices: ['test', 'test2'],
      },
    ])
    .then((res) => {
      console.log(res);
      employeeTrk();
    });
}

function updtEmplMgr() {
    inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: ['test', 'test2'],
      },
      {
        name: 'manager',
        type: 'list',
        message: "Who is the employee's new manager?",
        choices: ['test', 'test2'],
      },
    ])
    .then((res) => {
      console.log(res);
      employeeTrk();
    });
}
