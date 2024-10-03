require('dotenv').config()
const fp = require('fastify-plugin')

const convict = require('convict')
const ConvictFormatWithValidator = require('convict-format-with-validator')

convict.addFormats(ConvictFormatWithValidator)

function fastifyConvictEnv (fastify, opts, done) {
  try {
    const config = convict(opts.schema)
    config.validate({ allowed: 'strict' })
    fastify.decorate('config', config)
    done()
  } catch (error) {
    done(error)
  }
}

module.exports = fp(fastifyConvictEnv, {
  fastify: '5.x',
  name: 'fastify-convict-env'
})
module.exports.default = fastifyConvictEnv
module.exports.fastifyConvictEnv = fastifyConvictEnv
