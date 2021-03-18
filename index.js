const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startMenu();
});
function startMenu() {
    inquirer.prompt([{
            type: "list",
            name: "startmenu",
            message: "Choose one of the following options of what you would like to do.",
            choices: ["View Employees","View Departments","View Roles","Update Employee","Add Department","Add Role","Add Employee", "Exit"]

            // decided against giving each set of questions a function name then calling it ie : .prompt(startquestions)
    }]).then((response) => {
            switch (response.startmenu) {
                    case "View Employees":
                            viewEmployees();
                                break;
                    case "View Departments":
                            viewDepartments();
                                break;
                    case "View Roles":
                            viewRoles();
                                break;
                    case "Update Employee":
                            updateEmployee();
                                break;
                    case "Add Department":
                            addDepartment();
                                break;
                    case "Add Role":
                            addRole();
                                break;
                    case "Add Employee":
                            addEmployee();
                                break;
                    case "Exit":
                            console.log("Please press 'control' and 'C' to exit, See you next time!")
                                break;
                    default: "Please choose an option."
            }
            // end of switch
    });
}
function viewEmployees() {
    
}
function viewDepartments() {
    
}
function viewRoles() {
    
}
function addDepartment() {
    
}
function updateEmployee() {
    
}
function addRole() {
    
}
function addEmployee() {
    
}


