# fastify-convict-env

## install

```
npm install fastify-convict-env
```

## Usage

```
const fastify = require('fastify')();
const fastifyConvictEnv = require('fastify-convict-env');

const schema = {
    PORT: {
        doc: 'Application port',
        format: Number,
        env: 'PORT'
        default: 3000
    }
}

const options = {
    scheme
}

fastify.register(fastifyConvictEnv, options).ready((err) => {
    if(err) console.error(err)

    console.log(fastify.config.get('PORT'))
    // OUTPUT: 3000
})
```

This module is a wrapper aroud [convict](https://www.npmjs.com/package/convict) (convict-format-with-validator pre-installed), it will read `.env` file (load with [dotenv](https://www.npmjs.com/package/dotenv))
