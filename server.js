const fastify = require('fastify')({logger: true})

fastify.register(require('./routes/generateToken'))
fastify.register(require('./routes/getToken'))

require('dotenv').config();

const start = async () => {
  if(!process.env.PUBLISH_KEY ||!process.env.SUBSCRIBE_KEY ||!process.env.SECRET_KEY)
    throw new Error("Please provide PubNub keyset values in .env file.")
  try {
    await fastify.listen(process.env.SERVER_PORT ?? 6000)
  } catch (error){
    fastify.log.error(error)
    process.exit(1)
  }
}

start()