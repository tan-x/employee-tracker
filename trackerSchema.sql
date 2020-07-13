DROP DATABASE IF EXISTS trackerDB;
CREATE database trackerDB;

USE trackerDB;

CREATE TABLE department (
    deptID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department VARCHAR(30) NULL,
    manager VARCHAR(30) NULL
);

CREATE TABLE role (
    roleID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NULL,
    deptID INT,
    FOREIGN KEY (deptID) REFERENCES department(deptID)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NULL,
    roleID INT,
    managerID INT NULL,
    FOREIGN KEY (roleID) REFERENCES role(roleID)
);