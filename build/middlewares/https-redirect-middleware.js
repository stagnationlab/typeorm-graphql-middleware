"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function httpsRedirectMiddleware() {
    return (request, response) => {
        response.redirect(`https://${request.hostname}${request.originalUrl}`);
    };
}
exports.default = httpsRedirectMiddleware;
//# sourceMappingURL=https-redirect-middleware.js.map