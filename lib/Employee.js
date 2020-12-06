// TODO: Write code to define and export the Employee class
const employee = (member) => {

    // Create switch case based on question answers
    switch (member.role) {
        case 'engineer': 
            Engineer()
            break;
        case 'intern':
            Intern();
            break;
    }
}

module.exports = employee