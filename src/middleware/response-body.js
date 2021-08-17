module.exports = function responseBody () {
    return async function (ctx, next) {
        await next()
        try {
            if (ctx.status >= 400) {
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
            ctx.body = {
                code: 500,
                data: ctx.body,
                message: err.toString()
            }
        }
    }
}