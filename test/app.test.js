const server = require('./server')

describe('test default route', () => {
    test('hello koa-demo', async () => {
        const response = await server.get('/')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('hello, koa-demo')
    })
})