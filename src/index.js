"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hub = exports.createHub = exports.defaultOptions = exports.defaultIntegrations = void 0;
const integrations_1 = require("@sentry/integrations");
const node_1 = require("@sentry/node");
exports.defaultIntegrations = [
    // see: https://docs.sentry.io/platforms/node/default-integrations/
    new node_1.Integrations.InboundFilters(),
    new node_1.Integrations.FunctionToString(),
    new node_1.Integrations.LinkedErrors(),
    // see: https://docs.sentry.io/platforms/node/typescript/#2-changing-events-frames
    new integrations_1.RewriteFrames({ root: __dirname }),
];
exports.defaultOptions = {
    //   dsn: config.get("sentry.dsn"),
    //   enabled: config.get("sentry.enabled"),
    //   environment: config.get("sentry.environment"),
    integrations: exports.defaultIntegrations,
    transport: undefined,
};
function createHub(options = {}) {
    const client = new node_1.NodeClient({
        ...exports.defaultOptions,
        ...options,
    });
    return new node_1.Hub(client);
}
exports.createHub = createHub;
exports.hub = createHub({
    integrations: [
        ...exports.defaultIntegrations,
        new node_1.Integrations.OnUncaughtException(),
        new node_1.Integrations.OnUnhandledRejection(),
    ],
});
exports.hub.configureScope((scope) => { });
