'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const plugin = require('../index')

test('decorates fastify with config', async (t) => {
  process.env.PLUGIN_PORT = '3000'
  const app = Fastify()
  t.after(() => app.close())

  await app.register(plugin, {
    schema: {
      port: {
        doc: 'The port to bind',
        format: 'port',
        default: null,
        env: 'PLUGIN_PORT'
      }
    }
  })

  await app.ready()
  t.ok(app.config)
  t.equal(app.config.get('port'), 3000)
})

test('casts env var to the expected type', async (t) => {
  process.env.CAST_PORT = '8080'
  const app = Fastify()
  t.after(() => app.close())

  await app.register(plugin, {
    schema: {
      port: {
        doc: 'The port to bind',
        format: 'port',
        default: null,
        env: 'CAST_PORT'
      }
    }
  })

  await app.ready()
  t.equal(typeof app.config.get('port'), 'number')
  t.equal(app.config.get('port'), 8080)
})

test('uses default value when env var is not set', async (t) => {
  delete process.env.DEFAULT_NAME
  const app = Fastify()
  t.after(() => app.close())

  await app.register(plugin, {
    schema: {
      name: {
        doc: 'App name',
        format: String,
        default: 'my-app',
        env: 'DEFAULT_NAME'
      }
    }
  })

  await app.ready()
  t.equal(app.config.get('name'), 'my-app')
})

test('throws when env var has an invalid format', async (t) => {
  process.env.INVALID_PORT = 'not-a-port'
  const app = Fastify()
  t.after(() => app.close().catch(() => {}))

  app.register(plugin, {
    schema: {
      port: {
        doc: 'The port to bind',
        format: 'port',
        default: null,
        env: 'INVALID_PORT'
      }
    }
  })

  await t.rejects(app.ready())
})

test('supports email format from convict-format-with-validator', async (t) => {
  process.env.VALID_EMAIL = 'user@example.com'
  const app = Fastify()
  t.after(() => app.close())

  await app.register(plugin, {
    schema: {
      email: {
        doc: 'Admin email',
        format: 'email',
        default: null,
        env: 'VALID_EMAIL'
      }
    }
  })

  await app.ready()
  t.equal(app.config.get('email'), 'user@example.com')
})

test('throws when email format is invalid', async (t) => {
  process.env.INVALID_EMAIL = 'not-an-email'
  const app = Fastify()
  t.after(() => app.close().catch(() => {}))

  app.register(plugin, {
    schema: {
      email: {
        doc: 'Admin email',
        format: 'email',
        default: null,
        env: 'INVALID_EMAIL'
      }
    }
  })

  await t.rejects(app.ready())
})

test('supports url format from convict-format-with-validator', async (t) => {
  process.env.VALID_URL = 'https://example.com'
  const app = Fastify()
  t.after(() => app.close())

  await app.register(plugin, {
    schema: {
      url: {
        doc: 'App URL',
        format: 'url',
        default: null,
        env: 'VALID_URL'
      }
    }
  })

  await app.ready()
  t.equal(app.config.get('url'), 'https://example.com')
})

test('supports multiple keys in schema', async (t) => {
  process.env.MULTI_HOST = 'localhost'
  process.env.MULTI_PORT = '4000'
  const app = Fastify()
  t.after(() => app.close())

  await app.register(plugin, {
    schema: {
      host: {
        doc: 'Server host',
        format: String,
        default: null,
        env: 'MULTI_HOST'
      },
      port: {
        doc: 'Server port',
        format: 'port',
        default: null,
        env: 'MULTI_PORT'
      }
    }
  })

  await app.ready()
  t.equal(app.config.get('host'), 'localhost')
  t.equal(app.config.get('port'), 4000)
})
