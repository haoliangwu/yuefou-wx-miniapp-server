const request = require('request-promise-native')

async function templateMsgToken (ctx, next) {
    const url = 'https://api.weixin.qq.com/cgi-bin/token'
    const qs = {
        grant_type: 'client_credential',
        appid: process.env.MINI_APP_ID,
        secret: process.env.MINI_APP_SECRET
    }

    const result = await request({
        url,
        qs,
        method: 'GET',
        json: true
    })

    if (result.errcode) {
        ctx.throw(400, {errors: result})
    } else {
        result.timestamp = Number.parseInt(Date.now() / 1000)

        ctx.state.data = result
    }
}

module.exports = {
    templateMsgToken
}
