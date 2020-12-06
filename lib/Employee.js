// TODO: Write code to define and export the Employee class
class Employee {

    constructor(name, email, id) {
        this.name = name
        this.id = id
        this.email = email
    }

    getName() {
        return this.name
    }
    
    getEmail() {
        return this.email
    }

    getId() {
        return this.id
    }

    getRole() {
        return 'Employee'
    }
}

module.exports = Employee