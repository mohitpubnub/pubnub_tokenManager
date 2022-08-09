const {
  getTokenController
} = require('../controllers/getToken')

const getTokenOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          token: {type: 'string'},
        }
      },
      404: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    },
  },
  handler: getTokenController,
}

function tokenRoutes(fastify, options, done) {
  
  fastify.get('/getToken/:tokenId', getTokenOptions)
  done()
}

module.exports = tokenRoutes