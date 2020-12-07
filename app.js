const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employee = require("./lib/Employee");

const roster = []

// Manager Question sign in so it replicates an authentic admin verified system.
const managerQuestions = [
    {
        type: 'input',
        message: 'Please enter your name.',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Please enter your ID.',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Please enter your email.',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Please enter your Manager Office Number.',
        name: 'officeNumber'
    },
    {
        // Once they verify their info they can employees to their roster or they stop the program.
        type: 'list',
        message: 'Would you like to add employees?',
        choices: ['Yes', 'No'],
        name: 'continue'
    }
]

const employeeQuestions = [
    {
        type: 'input',
        message: 'Enter employee name',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Create their ID.',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: 'email'
    },
    {
        type: 'list',
        message: 'What is their role?',
        choices: ['Manager', 'Engineer', 'Intern'],
        name: 'role'
    },
    {
        // WHEN the member's role is a manager then the office number question is asked.
        when: member => {
            return member.role == 'Manager'
        },
        type: 'input',
        message: 'What is their Office Number?',
        name: 'officeNumber'
    },
    {
        // WHEN the member's role is a engineer then the office number question is asked.
        when: member => {
            return member.role == 'Engineer'
        },
        type: 'input',
        message: 'What is their GitHub username?',
        name: 'github'
    },
    {
        // WHEN the member's role is a intern then the office number question is asked.
        when: member => {
            return member.role == 'Intern'
        },
        type: 'input',
        message: 'What school do they attend?',
        name: 'school'
    },
    {
        // If the user decides that they want to continue adding employees to their roster than they can.
        type: 'list',
        message: 'Do you wish to add another member?',
        choices: ['Yes', 'No'],
        name: 'continue'
    }
]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const createTeam = () => {
    inquirer
    .prompt(employeeQuestions)
    .then((employeeInfo) => {
        if (employeeInfo.role == 'Manager') {
            let addEmployee = new Manager(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.officeNumber)
        }
        else if (employeeInfo.role == 'Engineer') {
            let addEmployee = new Engineer(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.github)
        }
        else if (employeeInfo.role == 'Intern') {
            let addEmployee = new Intern(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.school)
        }

        roster.push(addEmployee);

        if (employeeInfo.continue == 'Yes') {
            console.log('New employee added. Please fill prompt for the next.')
        } else {
            createHTML();
        }
    })
}

const createHTML = () => {

}

const init = () => {
    inquirer
    .prompt(managerQuestions)
    .then((employeeInfo) => {
        const manager = new Manager(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.officeNumber)
        roster.push(manager);
        if (employeeInfo.continue == 'Yes') {
            createTeam()
        } else {
            createHTML();
        }
    })

}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
init();