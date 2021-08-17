const server = require('../server')

describe('user route success test', () => {
    let user = {
        "nickName": Date.now().toString(),
        "phone": "13002938765",
        "country": "China",
        "regTime": new Date(),
        "lastLogin": new Date()
    }
    test('create user', async () => {
        const response = await server.post('/user').send(user)
        expect(response.status).toBe(200)
        expect(response.body.code).toBe(0)
        expect(response.body.data.nickName).toEqual(user.nickName)
        expect(response.body.data.phone).toEqual(user.phone)
        expect(response.body.data.country).toEqual(user.country)
        expect(response.body.data.regTime).toEqual(user.regTime.toISOString())
        expect(response.body.data.lastLogin).toEqual(user.lastLogin.toISOString())
        user.id = response.body.data.id
    })


    test('get user', async () => {
        const response = await server.get('/user').query({ id: user.id })
        expect(response.status).toBe(200)
        expect(response.body.data.id).toEqual(user.id)
        expect(response.body.data.nickName).toEqual(user.nickName)
        expect(response.body.data.phone).toEqual(user.phone)
        expect(response.body.data.country).toEqual(user.country)
        expect(response.body.data.regTime).toEqual(user.regTime.toISOString())
        expect(response.body.data.lastLogin).toEqual(user.lastLogin.toISOString())
    })

    test('update user', async () => {
        let updateInfo = {
            nickName: 'update nickName'
        }
        const response = await server.put(`/user/${user.id}`).send(updateInfo)
        expect(response.status).toBe(204)
    })

    test('delete user', async () => {
        const response = await server.delete(`/user/${user.id}`)
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(1)
    })
})

describe('user route failure test', () => {
    let user = {
        "nickName": Date.now().toString(),
        "country": "China"
    }
    test('create user 400', async () => {
        const response = await server.post('/user').send(user)
        expect(response.status).toBe(400)
    })


    test('get user 404', async () => {
        const response = await server.get('/404')
        expect(response.status).toBe(404)
    })
})