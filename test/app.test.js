const { sequelize } = require('../src/lib/database')

test('hello koa-demo', async () => {
    const response = await global.server.get('/')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe('hello, koa-demo')
})

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    try {
        await sequelize.close()
    } catch (err) {
        console.error(err)
    }
})