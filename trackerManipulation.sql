USE trackerDB;

INSERT INTO department (department, manager) VALUES("Operations", "Tanner Griffin");
INSERT INTO department (department, manager) VALUES("Lending", "Jane Yah");
INSERT INTO department (department, manager) VALUES("Information Technology", "Mike Moser");
INSERT INTO department (department, manager) VALUES("Human Resources", "Linda Irby");

INSERT INTO role (title, deptID) VALUES("Supervisor", 1);
INSERT INTO role (title, deptID) VALUES("Teller", 1);
INSERT INTO role (title, deptID) VALUES("Customer Service Rep", 1);

INSERT INTO role (title, deptID) VALUES("Lending Assistant", 2);
INSERT INTO role (title, deptID) VALUES("Lending Officer", 2);
INSERT INTO role (title, deptID) VALUES("Credit Analyst", 2);

INSERT INTO role (title, deptID) VALUES("Database Administrator", 3);
INSERT INTO role (title, deptID) VALUES("Helpdesk Technician", 3);
INSERT INTO role (title, deptID) VALUES("Network Engineer", 3);

INSERT INTO role (title, deptID) VALUES("HR Administrator", 4);
INSERT INTO role (title, deptID) VALUES("HR Genarlist", 4);
INSERT INTO role (title, deptID) VALUES("HR Recruiter", 4);

INSERT INTO employee (first_name, last_name, salary, roleID) VALUES ("Tanner", "Griffin", 35000, 1);
INSERT INTO employee (first_name, last_name, salary, roleID) VALUES ("Hope", "Clayton", 55000, 5);
INSERT INTO employee (first_name, last_name, salary, roleID) VALUES ("Alicia", "Miranda", 34000, 3);
INSERT INTO employee (first_name, last_name, salary, roleID) VALUES ("Jay", "Doe", 65000, 7);