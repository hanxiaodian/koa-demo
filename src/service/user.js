const { User } = require('../model/user.js')

class UserService {
    /**
   * 根据用户Id，查询用户信息
   */
    async queryUser (id) {
        const user = await User.findOne({
            where: {
                id
            }
        })
        return user
    }

    /**
   * 创建新用户
   * @param {} body 
   * @returns 
   */
    async createUser (body) {
        body = Object.assign({
            regTime: new Date(),
            lastLogin: new Date()
        }, body)
        const user = await User.create(body)
        return user
    }

    /**
   * 更新用户信息
   * @param {*} body 
   * @param id
   * @returns 
   */
    async updateUser (id, body) {
        await User.update(body, {
            where: {
                id
            },
            returning: true
        })
    }

    /**
   * 删除用户信息
   * @param id
   * @returns 
   */
    async deleteUser (id) {
        const user = await User.destroy({
            where: {
                id
            }
        })
        return user
    }
}
let userService = new UserService()
module.exports = {
    UserService,
    userService
}
