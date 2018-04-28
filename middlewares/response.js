const debug = require('debug')('koa-weapp-demo')

/**
 * 响应处理模块
 */
module.exports = async function (ctx, next) {
    try {
    // 调用下一个 middleware
        await next()

        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code !== undefined ? ctx.state.code : 0,
            data: ctx.state.data !== undefined ? ctx.state.data : {}
        }
    } catch (e) {
    // ctx        // catch 住全局的错误信息
        const { graphQLErrors, networkError } = e

        if (graphQLErrors && graphQLErrors.length > 0) {
            graphQLErrors.map(({ message, locations, path }) =>
                debug(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            )

            ctx.status = 200
            ctx.body = {
                message: e && e.message ? e.message : e.toString(),
                errors: graphQLErrors
            }
        } else if (networkError) {
            const errors = networkError.result.errors || []

            errors.map(({ message }) =>
                debug(`[Network error]: Message: ${message}`)
            )

            ctx.status = networkError.statusCode
            ctx.body = {
                message: e && e.message ? e.message : e.toString(),
                errors
            }
        } else {
            // 设置状态码为 200 - 服务端错误
            ctx.status = e.statusCode || 200
            // 输出详细的错误信息
            ctx.body = {
                code: -1,
                message: e && e.message ? e.message : e.toString(),
                errors: e && e.errors ? e.errors : []
            }
        }
    }
}
