// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require ('./Manager')

// Define Manager
class Manager extends Employee {

    constructor(name, id, email, officeId) {

        super(name, id, email)

        this.officeId = officeId
    }

    getRole() {
        return 'Manager'
    }
}

module.exports = Manager;