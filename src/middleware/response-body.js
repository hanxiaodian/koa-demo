module.exports = function responseBody () {
    return async function (ctx, next) {
        try {
            await next()
            if (/^\/swagger/.test(ctx.request.url)) return
            if (ctx.response.status >= 400) {
                ctx.status = ctx.status || 404
                ctx.body = {
                    code: ctx.status,
                    data: ctx.body,
                    message: ''
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: ctx.body,
                    message: ''
                }
            }
        } catch (err) {
            ctx.status = err.status || 500
            ctx.body = {
                code: 500,
                data: ctx.body,
                message: err.toString()
            }
        }
    }
}