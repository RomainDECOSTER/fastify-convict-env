import fastify from 'fastify'
import fastifyConvictEnv = require('.')

const app = fastify()

// default export registers as a plugin
app.register(fastifyConvictEnv, {
  schema: {
    port: { format: 'port', default: 3000, env: 'PORT' }
  }
})

// named export is also available
app.register(fastifyConvictEnv.fastifyConvictEnv, { schema: {} })

// @ts-expect-error - schema is required
app.register(fastifyConvictEnv, {})

// @ts-expect-error - schema must be Record<string, any>
app.register(fastifyConvictEnv, { schema: 'invalid' })
