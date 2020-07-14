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
	figlet.text('Employee Manager', { font: 'Cybermedium' }, function (err, data) {
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
				case 'Update Department Manager':
					updtDeptMgr();
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

function viewEmplDept() {
	let deptArray = [];
	connection.query('SELECT department.department FROM trackerdb.department', (err, quer) => {
		quer.forEach((dept) => deptArray.push(dept.department));
		deptArray.push(new inquirer.Separator());
		inquirer
			.prompt({
				name: 'dept',
				type: 'list',
				message: 'Which department?',
				choices: deptArray,
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
	});
}

function viewEmplMgr() {
	let mgrArray = [];
	connection.query('SELECT department.manager FROM trackerdb.department', (err, quer) => {
		quer.forEach((dept) => mgrArray.push(dept.manager));
		mgrArray.push(new inquirer.Separator());
		inquirer
			.prompt({
				name: 'mgr',
				type: 'list',
				message: 'Which manager?',
				choices: mgrArray,
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
	});
}

function addEmpl() {
	let roleArray = [];
	connection.query('SELECT role.title FROM trackerdb.role', (err, quer) => {
		quer.forEach((role) => roleArray.push(role.title));
		roleArray.push(new inquirer.Separator());
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
					choices: roleArray,
				},
				{
					name: 'salary',
					type: 'number',
					message: "What is the employee's salary?",
				},
			])
			.then((res) => {
				let roleID = roleArray.findIndex((i) => i === res.role) + 1;
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
	});
}

function removeEmpl() {
	let empArray = [];
	connection.query(
		'SELECT employee.first_name, employee.last_name FROM trackerdb.employee',
		(err, quer) => {
			quer.forEach((emp) => empArray.push(`${emp.first_name} ${emp.last_name}`));
			empArray.push(new inquirer.Separator());
			inquirer
				.prompt({
					name: 'remove',
					type: 'list',
					message: 'Which employee would you like to remove?',
					choices: empArray,
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
	);
}

function updtEmplRole() {
	let empArray = [];
	let roleArray = [];
	connection.query(
		`SELECT employee.first_name,
		employee.last_name,
		role.title
		FROM trackerdb.employee
		RIGHT JOIN role
		ON employee.roleID = role.roleID`,
		(err, quer) => {
			quer.forEach((emp) => {
				if (emp.first_name !== null) {
					empArray.push(`${emp.first_name} ${emp.last_name}`);
				}
				roleArray.push(emp.title);
			});
			empArray.push(new inquirer.Separator());
			roleArray.push(new inquirer.Separator());
			inquirer
				.prompt([
					{
						name: 'employee',
						type: 'list',
						message: 'Which employee would you like to update?',
						choices: empArray,
					},
					{
						name: 'role',
						type: 'list',
						message: "What is the employee's new role?",
						choices: roleArray,
					},
				])
				.then((res) => {
					let name = res.employee.split(' ');
					let roleID = roleArray.findIndex((i) => i === res.role) + 1;
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
	);
}

function updtDeptMgr() {
	let deptArray = [];
	let empArray = [];
	connection.query(
		`SELECT employee.first_name,
		employee.last_name
		FROM trackerdb.employee`,
		(err, quer) => {
			if (err) throw err;
			quer.forEach((emp) => empArray.push(`${emp.first_name} ${emp.last_name}`));
			empArray.push(new inquirer.Separator());
			connection.query(
				`SELECT department
				FROM trackerdb.department`,
				(err, que) => {
					if (err) throw err;
					que.forEach((dept) => deptArray.push(dept.department));
					deptArray.push(new inquirer.Separator());
					inquirer
						.prompt([
							{
								name: 'department',
								type: 'list',
								message: 'Which department would you like to update?',
								choices: deptArray,
							},
							{
								name: 'manager',
								type: 'list',
								message: "Who is the department's new manager?",
								choices: empArray,
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
							employeeTrk();
						});
				}
			);
		}
	);
}
