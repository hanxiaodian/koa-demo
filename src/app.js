'use strict'

const Koa = require('koa')
const koaBody = require('koa-bodyparser')
const KoaBodyFile = require('koa-body')
const cors = require('koa2-cors')
const router = require('./router.js')
const { koaSwagger } = require('koa2-swagger-ui')
const swagger = require('./utils/swagger.js')
// const logger = require('./middleware/logger')
// const requestLog = require('./middleware/requestLog')

async function start () {
    let app = new Koa()
    // .use(logger({
    //   delegateConsole: true,
    //   separator: process.env.NODE_ENV === 'production' ? ' § ' : ' \t '
    // }))
        .use(cors({
            origin: '*',
            exposeHeaders: ['Content-Range']
        }))
        .use(KoaBodyFile({
            multipart: true,
            formidable: {
                maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
            }
        }))
    // .use(requestLog())
        .use(swagger.routes(), swagger.allowedMethods())
        .use(
            koaSwagger({
                routePrefix: '/swagger', // host at /swagger instead of default /docs
                swaggerOptions: {
                    url: '/swagger-api.json', // example path to json
                },
            })
        )
        .use(koaBody())
        .use(router.routes())
        .use(router.allowedMethods())

    app.listen(3000, function () {
        console.warn(`koa-demo is running port at  ${3000}~ `)
    })
}

start().catch(err => console.error('server init error:', err))

function gracefulShutDown () {
    console.warn('App exit.')
    process.exit(1)
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

process.on('SIGINT', gracefulShutDown)
