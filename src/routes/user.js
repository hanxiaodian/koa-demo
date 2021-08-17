const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { userController: ctrl } = require('../controller/user.js')

/**
 * @swagger
 * /user: # 接口地址
 *  get:
 *    tags: [用户模块]
 *    produces: application/json
 *    parameters: # 请求参数
 *      - name: id
 *        description: 用户ID
 *        in: query # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie"
 *        required: true
 *        type: string
 *    responses:
 *       '200':
 *         description: Ok
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *             data:
 *               type: 'object'
 *               description: 返回数据
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
router.get('/', async (ctx) => {
    ctx.body = await ctrl.queryUser(ctx.query)
})

/**
 * @swagger
 * /user:
 *  post:
 *    tags: [用户模块]
 *    produces: application/json
 *    parameters: # 请求参数
 *      - name: body
 *        description: "{ 'nickName': '用户昵称', 'phone': '用户手机号', 'country': '用户所在国家', 'regTime': '用户注册时间', 'lastLoginTime': '用户最后登陆时间' }"
 *        in: body # 参数的位置，可能的值有 "query", "header", "path", "body" 或 "cookie"
 *        required: true
 *        type: object
 *    responses:
 *       '200':
 *         description: Ok
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *             data:
 *               type: 'object'
 *               description: 返回数据
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '500':
 *         description: 服务器错误
 */
router.post('/', async (ctx) => {
    ctx.body = await ctrl.createUser(ctx.request.body)
})

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    tags: [用户模块]
 *    produces: application/json
 *    parameters: # 请求参数
 *      - name: id
 *        description: 需要修改信息的用户ID
 *        in: path # 参数的位置，可能的值有 "query", "header", "path", "body" 或 "cookie"
 *        required: true
 *        type: string
 *      - name: body
 *        description: "{ 'nickName': '用户昵称', 'phone': '用户手机号', 'country': '用户所在国家', 'regTime': '用户注册时间', 'lastLoginTime': '用户最后登陆时间' }"
 *        in: body # 参数的位置，可能的值有 "query", "header", "path", "body" 或 "cookie"
 *        required: true
 *        type: object
 *    responses:
 *       '200':
 *         description: Ok
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *             data:
 *               type: 'object'
 *               description: 返回数据
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: 找不到该用户
 *       '500':
 *         description: 服务器错误
 */
router.put('/:id', async (ctx) => {
    ctx.body = await ctrl.updateUser(ctx.params.id, ctx.request.body)
})

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    tags: [用户模块]
 *    produces: application/json
 *    parameters: # 请求参数
 *      - name: id
 *        description: 需要删除的用户ID
 *        in: path # 参数的位置，可能的值有 "query", "header", "path", "body" 或 "cookie"
 *        required: true
 *        type: string
 *    responses:
 *       '200':
 *         description: Ok
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *             data:
 *               type: 'object'
 *               description: 返回数据
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: 找不到该用户
 *       '500':
 *         description: 服务器错误
 */
router.delete('/:id', async (ctx) => {
    ctx.body = await ctrl.deleteUser(ctx.params.id, ctx.request.body)
})

module.exports = router