const routerFactory = require('koa-router')
const { baseQuery, baseMutation } = require('../controllers/graphql')

/*
* graphql endpoint
*/
const router = routerFactory({
    prefix: '/graphql'
})

router.post('/query', baseQuery)
router.post('/mutation', baseMutation)

module.exports = router
