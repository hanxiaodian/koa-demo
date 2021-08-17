const { userService } = require('../service/user.js')
const assert = require('http-assert')

class UserController {
    async queryUser (query) {
        assert(query.id, 400, 'id is not allowed to be empty')
        return userService.queryUser(query.id)
    }

    async createUser (body) {
        assert(body.nickName, 400, 'nickName is not allowed to be empty')
        assert(body.phone, 400, 'phone is not allowed to be empty')
        return userService.createUser(body)
    }

    async updateUser (id, body) {
        assert(id, 400, 'id is not allowed to be empty')
        assert(body, 400, 'body is not allowed to be empty')
        return userService.updateUser(id, body)
    }

    async deleteUser (id) {
        assert(id, 400, 'id is not allowed to be empty')
        return userService.deleteUser(id)
    }
}
let userController = new UserController()
module.exports = {
    UserController,
    userController
}
