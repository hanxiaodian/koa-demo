const { userService } = require('../../src/service/user')
const { sequelize } = require('../../src/lib/database')

describe('test user service success', () => {
    let user = {
        "nickName": Math.random().toString(),
        "phone": "13002939800",
        "country": "China",
        "regTime": new Date(),
        "lastLogin": new Date(),
    }
    test('create user service function', async () => {
        const response = await userService.createUser(user)
        expect(response.nickName).toEqual(user.nickName)
        expect(response.phone).toEqual(user.phone)
        expect(response.country).toEqual(user.country)
        expect(response.regTime).toEqual(user.regTime)
        expect(response.lastLogin).toEqual(user.lastLogin)
        user.id = response.id
    })

    test('create user service function country empty', async () => {
        let userWithoutCountry = {
            "nickName": Math.random().toString(),
            "phone": "13002939800",
            "regTime": new Date(),
            "lastLogin": new Date(),
        }
        const response = await userService.createUser(userWithoutCountry)
        expect(response.nickName).toEqual(userWithoutCountry.nickName)
        expect(response.phone).toEqual(userWithoutCountry.phone)
        expect(response.country).toEqual(userWithoutCountry.country)
        expect(response.regTime).toEqual(userWithoutCountry.regTime)
        expect(response.lastLogin).toEqual(userWithoutCountry.lastLogin)
    })

    test('get user service function', async () => {
        const response = await userService.queryUser(user.id)
        expect(response.nickName).toEqual(user.nickName)
        expect(response.phone).toEqual(user.phone)
        expect(response.country).toEqual(user.country)
        expect(response.regTime).toEqual(user.regTime)
        expect(response.lastLogin).toEqual(user.lastLogin)
    })

    test('update user service function', async () => {
        let updateInfo = {
            nickName: 'update nickName'
        }
        const response = await userService.updateUser(user.id, updateInfo)
        expect(response).toBeUndefined()
    })

    test('delete user service function', async () => {
        const response = await userService.deleteUser(user.id)
        expect(response).toEqual(1)
        expect(response).not.toBeUndefined()
    })
})

describe('test user service failed parameters error', () => {
    test('create user service function nickName empty', async () => {
        let user = {
            "phone": "13002939800",
            "country": "China"
        }
        try {
            await userService.createUser(user)
        } catch (err) {
            expect(err.toString()).toMatch('SequelizeValidationError: notNull Violation: User.nickName cannot be null')
        }
    })

    test('create user service function phone empty', async () => {
        let user = {
            "nickName": 'test phone empty',
            "country": "China"
        }
        try {
            await userService.createUser(user)
        } catch (err) {
            expect(err.toString()).toMatch('SequelizeValidationError: notNull Violation: User.phone cannot be null')
        }
    })

    test('get user service function id not found', async () => {
        try {
            await userService.queryUser()
        } catch (err) {
            expect(err.toString()).toMatch('Error: WHERE parameter \"id\" has invalid \"undefined\" value')
        }
    })

    test('update user service function', async () => {
        let updateInfo = {
            nickName: 'update nickName'
        }

        try {
            await userService.updateUser(undefined, updateInfo)
        } catch (err) {
            expect(err.toString()).toMatch('Error: WHERE parameter \"id\" has invalid \"undefined\" value')
        }
    })

    test('delete user service function', async () => {
        try {
            await userService.deleteUser(undefined)
        } catch (err) {
            expect(err.toString()).toMatch('Error: WHERE parameter \"id\" has invalid \"undefined\" value')
        }
    })
})

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    try {
        await sequelize.close()
    } catch (err) {
        console.error(err)
    }
})