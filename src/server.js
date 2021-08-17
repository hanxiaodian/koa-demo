const app = require('./app')

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.warn(`koa-demo is running port at  ${3000}~ `)
})

function gracefulShutDown () {
    console.warn('App exit.')
    process.exit(1)
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

process.on('SIGINT', gracefulShutDown)