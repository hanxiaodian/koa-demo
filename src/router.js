const KoaRouter = require('koa-router')
const userRoute = require('./routes/user.js')

const router = new KoaRouter()

router.use('/user', userRoute.routes())

router.get('/', function (ctx) {
    ctx.body = 'hello, koa-demo'
})

module.exports = router
