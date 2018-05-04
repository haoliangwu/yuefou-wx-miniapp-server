const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('yuefou-wx-miniapp-server')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// wx wafer2
const weappRouter = require('./routes/weapp')
app.use(weappRouter.routes())

// graphql
const graphqlRouter = require('./routes/graphql')
app.use(graphqlRouter.routes())

// api
const apiRouter = require('./routes/api')
app.use(apiRouter.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
