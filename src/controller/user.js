const { userService } = require('../service/user.js')

class UserController {
    async queryUser (query) {
        return userService.queryUser(query.id)
    }

    async createUser (body) {
        return userService.createUser(body)
    }

    async updateUser (id, body) {
        return userService.updateUser(id, body)
    }

    async deleteUser (id) {
        return userService.deleteUser(id)
    }
}
let userController = new UserController()
module.exports = {
    UserController,
    userController
}
