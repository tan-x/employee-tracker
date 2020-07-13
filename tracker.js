var mysql = require('mysql');
var inquirer =  require('inquirer');
var figlet = require('figlet');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'root',
    password: 'password',
    database: 'employeeDB'
});

// connection.connect(err => {
//     if (err) throw err;
// })

figlet.text('Employee Manager', {font: 'Cybermedium'}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log('------------------------------------------------------------------------------');
    console.log(data);
    console.log('------------------------------------------------------------------------------');
    employeeTrk();
});

function employeeTrk() {
    
    inquirer.prompt({
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
            'Update Employee Manager'
        ]
    }).then(res => {
        console.log(res.root);
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
    })
}

function viewEmpl() {
    console.log('view employee');
    employeeTrk();
}
function viewEmplDept() {
    console.log('view employee by dept')
    employeeTrk();
}
function viewEmplMgr() {
    console.log('view employee by mgr')
    employeeTrk();
}
function addEmpl() {
    console.log('add employee')
    employeeTrk();
}
function removeEmpl() {
    console.log('remove employee')
    employeeTrk();
}
function updtEmplRole() {
    console.log('update employee role')
    employeeTrk();
}
function updtEmplMgr() {
    console.log('update employee manager')
    employeeTrk();
}