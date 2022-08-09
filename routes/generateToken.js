const {
  generateTokenController
} = require('../controllers/generateToken')

const generateTokenOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          token: {type: 'string'},
        }
      },
      400: {
        type: 'object',
        properties: {
          error: { type: 'array' }
        }
      }
    },
  },
  handler: generateTokenController,
}

function tokenRoutes(fastify, options, done) {
  
  fastify.post('/generatetoken/:tokenId', generateTokenOptions)
  done()
}

module.exports = tokenRoutes