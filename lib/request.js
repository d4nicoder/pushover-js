"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
class ResponseError {
    constructor(message, statusCode) {
        this.name = 'Response error';
        this.message = message;
        this.statusCode = statusCode;
    }
}
const responseCallback = (res) => {
    return new Promise((resolve, reject) => {
        let responseData = '';
        res.on('data', (data) => {
            responseData += data.toString();
        });
        res.on('end', () => {
            if (res.statusCode && res.statusCode !== 200) {
                const error = new ResponseError(responseData, res.statusCode);
                reject(error);
            }
            else {
                const returnData = {
                    headers: res.headers,
                    data: responseData,
                    statusCode: typeof res.statusCode === 'number' ? res.statusCode : 500
                };
            }
        });
    });
};
exports.default = {
    get: (options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            options = { ...options, ...{ method: 'GET' } };
            const req = https.request(options, (res) => {
                responseCallback(res).then(resolve).catch(reject);
            });
            req.end();
        });
    },
    post: (options, postData) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            options = { ...options, ...{ method: 'POST' } };
            const req = https.request(options, (res) => {
                responseCallback(res).then(resolve).catch(reject);
            });
            let body = '';
            try {
                body = postData.toString();
            }
            catch (e) {
                console.error(e);
            }
            req.end(body);
        });
    }
};
//# sourceMappingURL=request.js.map