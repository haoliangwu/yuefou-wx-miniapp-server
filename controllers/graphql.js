// controllers
const { ApolloClient } = require('apollo-client')
const { ApolloLink, from } = require('apollo-link')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const gql = require('graphql-tag')
const fetch = require('node-fetch')
// const debug = require('debug')('graphql-route')

const GRAPHQL_ENDPOINT = 'http://yuefou_dev.littlelyon.com/graphql'
// const GRAPHQL_ENDPOINT = 'http://58.87.91.173:3000'

const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    fetch: fetch
})

const safeHeadersLink = new ApolloLink((operation, next) => {
    operation.setContext(({ headers }) => {
        for (let prop in headers) {
            if (headers.hasOwnProperty(prop) && !headers[prop]) {
                delete headers[prop]
            }
        }

        return {
            headers
        }
    })

    return next(operation)
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([safeHeadersLink, link]),
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all'
        },
        mutate: {
            errorPolicy: 'all'
        }
    }
})

async function baseQuery (ctx, next) {
    const { body, headers } = ctx.request

    const options = {
        context: {
            headers: {
                authorization: headers.authorization
            }
        }
    }

    if (body.query) {
        options.query = gql`${body.query}`
    }

    options.variables = body.variables || {}

    const result = await client.query(options)

    if (result.errors) {
        ctx.throw(400, { errors: result.errors })
    } else {
        ctx.state.data = result.data
    }
}

async function baseMutation (ctx, next) {
    const { body, headers } = ctx.request

    const options = {
        context: {
            headers: {
                authorization: headers.authorization
            }
        }
    }

    if (body.mutation) {
        options.mutation = gql`${body.mutation}`
    }

    options.variables = body.variables || {}

    const result = await client.mutate(options)

    if (result.errors) {
        ctx.throw(400, { errors: result.errors })
    } else {
        ctx.state.data = result.data
    }
}

module.exports = {
    baseQuery,
    baseMutation
}
