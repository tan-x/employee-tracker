DROP DATABASE IF EXISTS trackerDB;
CREATE database trackerDB;

USE trackerDB;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NULL,
    manager VARCHAR(30) NULL
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE
)

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE
)