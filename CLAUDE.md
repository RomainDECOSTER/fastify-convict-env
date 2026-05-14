# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run test          # unit tests (TAP) + TypeScript type tests (TSD)
npm run test:unit     # TAP unit tests only
npm run test:typescript # TSD type definition tests only
npm run lint          # StandardJS linter with auto-fix
npm run coverage      # TAP with HTML coverage report
```

To run a single test file: `cross-env NAME=fastify-convict-env tap test/mytest.tap.js`

Pre-commit hooks automatically run `lint` and `test` on every commit (via `@fastify/pre-commit`).

## Architecture

This is a minimal Fastify 5.x plugin that bridges **dotenv**, **convict**, and **convict-format-with-validator** into a single registration step.

**`index.js`** — the entire plugin (~26 lines):
1. Calls `dotenv.config()` at load time to populate `process.env`
2. Registers convict's extended validators (email, url, etc.) globally via `convict.addFormats`
3. On plugin registration, creates a `convict(opts.schema)` instance, validates it in strict mode (`allowed: 'strict'`), and decorates the Fastify instance with `fastify.config`
4. Consumers call `fastify.config.get('KEY')` to read validated values

**`types/index.d.ts`** — TypeScript declarations for the plugin options and the `fastifyConvictEnv` export shape.

**`test/types/`** — TSD test files live here (directory must be created when adding type tests; referenced by `tsd.directory` in `package.json`).

**Linter:** StandardJS (`standard` package) — no separate ESLint config.

**Module exports:** CommonJS (`module.exports = fp(...)`) with `.default` and `.fastifyConvictEnv` named re-exports for ESM/TypeScript interop.
