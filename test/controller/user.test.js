const { userController } = require('../../src/controller/user')
const { sequelize } = require('../../src/lib/database')

describe('test user controller success', () => {
    let user = {
        "nickName": Math.random().toString(),
        "phone": "13002939800",
        "country": "China",
        "regTime": new Date(),
        "lastLogin": new Date(),
    }
    test('create user controller function', async () => {
        const response = await userController.createUser(user)
        expect(response.nickName).toEqual(user.nickName)
        expect(response.phone).toEqual(user.phone)
        expect(response.country).toEqual(user.country)
        expect(response.regTime).toEqual(user.regTime)
        expect(response.lastLogin).toEqual(user.lastLogin)
        user.id = response.id
    })

    test('create user controller function country empty', async () => {
        let userWithoutCountry = {
            "nickName": Math.random().toString(),
            "phone": "13002939800",
            "regTime": new Date(),
            "lastLogin": new Date(),
        }
        const response = await userController.createUser(userWithoutCountry)
        expect(response.nickName).toEqual(userWithoutCountry.nickName)
        expect(response.phone).toEqual(userWithoutCountry.phone)
        expect(response.country).toEqual(userWithoutCountry.country)
        expect(response.regTime).toEqual(userWithoutCountry.regTime)
        expect(response.lastLogin).toEqual(userWithoutCountry.lastLogin)
    })

    test('get user controller function', async () => {
        const response = await userController.queryUser({ id: user.id })
        expect(response.nickName).toEqual(user.nickName)
        expect(response.phone).toEqual(user.phone)
        expect(response.country).toEqual(user.country)
        expect(response.regTime).toEqual(user.regTime)
        expect(response.lastLogin).toEqual(user.lastLogin)
    })

    test('update user controller function', async () => {
        let updateInfo = {
            nickName: 'update nickName'
        }
        const response = await userController.updateUser(user.id, updateInfo)
        expect(response).toBeUndefined()
    })

    test('delete user controller function', async () => {
        const response = await userController.deleteUser(user.id)
        expect(response).toEqual(1)
        expect(response).not.toBeUndefined()
    })
})

describe('test user controller failed parameters error', () => {
    test('create user controller function nickName empty', async () => {
        let user = {
            "phone": "13002939800",
            "country": "China"
        }
        try {
            await userController.createUser(user)
        } catch (err) {
            expect(err.toString()).toMatch('BadRequestError: nickName is not allowed to be empty')
        }
    })

    test('create user controller function phone empty', async () => {
        let user = {
            "nickName": 'test phone empty',
            "country": "China"
        }
        try {
            await userController.createUser(user)
        } catch (err) {
            expect(err.toString()).toMatch('BadRequestError: phone is not allowed to be empty')
        }
    })

    test('get user controller function', async () => {
        try {
            await userController.queryUser({})
        } catch (err) {
            expect(err.toString()).toMatch('BadRequestError: id is not allowed to be empty')
        }
    })

    test('update user controller function', async () => {
        let updateInfo = {
            nickName: 'update nickName'
        }

        try {
            await userController.updateUser(undefined, updateInfo)
        } catch (err) {
            expect(err.toString()).toMatch('BadRequestError: id is not allowed to be empty')
        }
    })

    test('delete user controller function', async () => {
        try {
            await userController.deleteUser(undefined)
        } catch (err) {
            expect(err.toString()).toMatch('BadRequestError: id is not allowed to be empty')
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