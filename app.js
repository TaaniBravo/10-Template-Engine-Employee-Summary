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

const team = []

const questions = [
    {
        type: 'input',
        message: 'Enter employee name',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is their ID?',
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
        choices: ['Engineer', 'Intern'],
        name: 'role'
    },
    {
        when: member => {
            return member.role == 'Engineer'
        },
        type: 'input',
        message: 'What is their GitHub username?',
        name: 'github'
    },
    {
        when: member => {
            return member.role == 'Intern'
        },
        type: 'input',
        message: 'What school do they attend?',
        name: 'school'
    },
    {
        type: 'list',
        message: 'Do you wish to add another member?',
        choices: ['Yes', 'No'],
        name: 'continue'
    }
]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer
    .prompt(questions)
    .then(member => employee(member))
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
team.push()
render(team)

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
fs.writeFileSync(',/output/team.html', team, err => err ? console.error(err) : console.log('yo'))

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
