const request = require('request-promise-native')

let cache = {
    templateMsgToken: null
}

async function templateMsgToken (ctx, next) {
    if (cache.templateMsgToken) {
        const token = JSON.parse(cache.templateMsgToken)
        const { expires_in, timestamp } = token
        const now = Number.parseInt(Date.now() / 1000)

        if (now < timestamp + expires_in) {
            ctx.state.data = token
            return
        }
    }

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
        ctx.throw(400, { errors: result })
    } else {
        result.timestamp = Number.parseInt(Date.now() / 1000)

        cache.templateMsgToken = JSON.stringify(result)
        ctx.state.data = result
    }
}

module.exports = {
    templateMsgToken
}
