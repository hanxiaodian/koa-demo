const app = require('../src/app')
const { sequelize } = require('../src/lib/database')

const mockListen = jest.fn()
app.listen = mockListen

describe('server test', () => {
    afterEach(() => {
        mockListen.mockReset()
    })
    
    test('Server works', async () => {
        require('../src/server')
        expect(mockListen.mock.calls.length).toBe(1)
        expect(mockListen.mock.calls[0][0]).toBe(process.env.PORT || 3000)
    })
})

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    try {
        await sequelize.close();
    } catch (err) {
        console.error(err)
    }
})