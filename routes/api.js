const routerFactory = require('koa-router')
const { templateMsgToken } = require('../controllers/api/auth')

/*
* api endpoint
*/
const router = routerFactory({
    prefix: '/api'
})

router.get('/auth/template_msg_token', templateMsgToken)

module.exports = router
