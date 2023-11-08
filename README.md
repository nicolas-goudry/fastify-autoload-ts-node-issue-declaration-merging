# ts-node error with plugins using custom instance field via declaration merging

This repository is to reproduce an issue encountered when using `@fastify/autoload`, `ts-node` and declaration merging.

- the plugin `plugins/env` is declaring the `@fastify/env` with some configuration and a declaration merging to inform TS that `fastify.config` is added to the type
- the plugin `plugins/cors` is setting up CORS rules, depending on a value of `fastify.config` set by the `plugins/env` plugin

The build is working as expected: `npm run build`.

Running the project with `ts-node` (`npm start`) fails with the following error:

```
return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
plugins/cors.ts:7:23 - error TS2339: Property 'config' does not exist on type 'FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>'.

7       origin: fastify.config.NODE_ENV === "production" ? "example.com" : "*",
                        ~~~~~~

    at createTSError (/fakepath/fastify-autoload-ts-node-issue-declaration-merging/node_modules/ts-node/src/index.ts:859:12)
    at reportTSError (/fakepath/fastify-autoload-ts-node-issue-declaration-merging/node_modules/ts-node/src/index.ts:863:19)
    at getOutput (/fakepath/fastify-autoload-ts-node-issue-declaration-merging/node_modules/ts-node/src/index.ts:1077:36)
    at Object.compile (/fakepath/fastify-autoload-ts-node-issue-declaration-merging/node_modules/ts-node/src/index.ts:1433:41)
    at Module.m._compile (/fakepath/fastify-autoload-ts-node-issue-declaration-merging/node_modules/ts-node/src/index.ts:1617:30)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Object.require.extensions.<computed> [as .ts] (/fakepath/fastify-autoload-ts-node-issue-declaration-merging/node_modules/ts-node/src/index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at Function.Module._load (node:internal/modules/cjs/loader:960:12)
    at Module.require (node:internal/modules/cjs/loader:1143:19) {
  diagnosticCodes: [ 2339 ]
}
```

Running the builded code with `node` works as expected: `NODE_ENV=production node dist/index.js`.
