const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees_db"
});

connection.connect( 
    function(err) {
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
    let managerlist = getManagersNames();
    // have to call the managers here or it will only select the employees/managers as a whole.
    connection.query("SELECT * FROM employee", 
    function(err, res){
        if (err) throw (err);
      console.table(res);
    //   found out about console table, super cool
      startMenu();
      });
};
function viewDepartments() {
    connection.query("SELECT * FROM department", 
    function(err, res){
        if (err) throw (err);
      console.table(res);
      startMenu();
      });
};
function viewRoles() {
    connection.query("SELECT * FROM role", 
    function(err, res){
        if (err) throw (err);
      console.table(res);
      startMenu();
      });
};
// end of get routes
function addDepartment() {
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
      }
    ]).then((data) => {
      let query = `INSERT INTO department (name) VALUES ("${data.department}")`;
      connection.query(query, 
        function(err) {
        if(err) throw (err);
      startMenu();
    });
  });
};

function addRole() {
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Title?"
      },
      {
        name: "salary",
        type: "number",
        message: "Salary?"
      },
      {
        name: "department_id",
        type: "list",
        message: "Which department do you work for?",
        choices: getDepartmentIds()
      }
    ]).then(data => {
      let departmentId = parseInt(data.department_id);
      let query = `INSERT INTO role (title, salary, department_id) VALUES("${data.title}", "${data.salary}", "${departmentId}")`;
      connection.query(query, 
        function (err){
        if (err) throw (err);
        startMenu();
      });
    });
};
function addEmployee() {
    inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "First Name?"        
        },
        {
          name: "last_name",
          type: "input",
          message: "Last Name?"
        },
        {
          name: "role_id",
          type: "list",
          message: "Role?",
          choices: getRoleIds()
        },
        {
          name: "manager_id",
          type: "list",
          message: "Which manager is your manger?",
          choices: getEmployees()
        }
      ]).then(data => {
        let roleId = parseInt(data.role_id);
        let managerId = parseInt(data.manager_id)
        // have to parse these, they come as a str, was having issue with it running and not liking it
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${roleId}, ${managerId})`, 
        function(err, res){
          if (err) throw (err);
          startMenu();
        });
      });
};
// end of add routes
function updateEmployee() {
    inquirer.prompt([
        {
          name: "employee_name",
          type: "list",
          message: "Which employee would you like to update?",
          choices: getEmployees()
        },
        {
          name: "role_id",
          type: "list",
          message: "New role?",
          choices: getRoleIDs()
        }
      ]).then((data) => {
        let roleID = parseInt(data.role_id);
        connection.query(`UPDATE employee SET WHERE ?`, {role_id:`${roleID}`},
        function(err, res){
          if (err) throw (err);
          startMenu();
        });
      });
};
// update route
// end of original routes.


// get routes we added
// getManagersNames
// getDepartmentIds
// getRoleIds
// getEmployees


function getManagersNames(){

}

function getDepartmentIds(){

}
function getRoleIDs(){

}

function getEmployees(){

}


