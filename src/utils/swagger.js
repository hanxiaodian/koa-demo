const router = require('koa-router')() //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    info: {
        title: 'koa-demo api',
        version: '1.0.0',
        description: 'API',
    },
    host: 'localhost:3000',
    basePath: '/'
}

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js', '../routes/*.js'], // 写有注解的router的存放地址，相对于程序运行地址
}

const swaggerSpec = swaggerJSDoc(options)

// 通过路由获取生成的注解文件
router.get('/swagger-api.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = process.env.NODE_ENV !== 'production' ? swaggerSpec : 'hello, world'
})

module.exports = router
//将页面暴露出去