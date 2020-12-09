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
            return member.role === 'Manager'
        },
        type: 'input',
        message: 'What is their Office Number?',
        name: 'officeNumber'
    },
    {
        // WHEN the member's role is a engineer then the office number question is asked.
        when: member => {
            return member.role === 'Engineer'
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

const createTeam = () => {
    inquirer
    .prompt(employeeQuestions)
    .then((member) => {
        // IF the member's role is a Manager...
        if (member.role == 'Manager') {
            // We WANT to 'addEmployee to the roster under the class Manager.
            let addEmployee = new Manager(member.name, member.id, member.email, member.officeNumber)
            roster.push(addEmployee);
        }
        else if (member.role == 'Engineer') {
            // We WANT to 'addEmployee to the roster under the class Engineer.
            let addEmployee = new Engineer(member.name, member.id, member.email, member.github)
            roster.push(addEmployee);
        }
        else if (member.role == 'Intern') {
            // We WANT to 'addEmployee to the roster under the class Intern.
            let addEmployee = new Intern(member.name, member.id, member.email, member.school)
            roster.push(addEmployee);
        }


        if (member.continue == 'Yes') {
            createTeam();
            console.log(' ')
        } else {
            createHTML();
            console.log('Team page was created. Please check team.html to view your page.')
        }
    })
}

const createHTML = () => {
    // This function is writing the file team.html once everything is push to the roster array.
    fs.writeFileSync(outputPath, render(roster), err => err ? console.error(err): console.log('HTML Page is written.'))
}

const init = () => {
    inquirer
    .prompt(managerQuestions)
    .then((member) => {
        const manager = new Manager(member.name, member.id, member.email, member.officeNumber)
        roster.push(manager);
        if (member.continue == 'Yes') {
            createTeam()
            console.log(' ')
        } else {
            createHTML();
            console.log('Team page was created. Please check team.html to view your page.')
        }
    })

}

init();