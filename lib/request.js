"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const https = require('https');
class ResponseError {
    constructor(message, statusCode) {
        this.name = 'Response error';
        this.message = message;
        this.statusCode = statusCode;
    }
}
const processParam = async (name, value) => {
    return `\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`;
};
const processFile = async (name, filePath, boundary) => {
    let type = 'application/octet-stream';
    if (/\.(jpg|jpeg)$/i.test(name)) {
        type = 'image/jpeg';
    }
    else if (/\.png$/i.test(name)) {
        type = 'image/png';
    }
    else if (/\.gif$/i.test(name)) {
        type = 'image/gif';
    }
    else if (/\.mp3$/i.test(name)) {
        type = 'audio/mpeg';
    }
    else if (/\.mp4$/i.test(name)) {
        type = 'video/mp4';
    }
    const data = await fs.promises.readFile(filePath);
    return Buffer.concat([
        Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="attachment"; filename="${name}"\r\nContent-type: ${type}\r\n\r\n`),
        data,
        Buffer.from(`\r\n`)
    ]);
};
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
                resolve(returnData);
            }
        });
    });
};
exports.default = {
    get: async (options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            options = { ...options, ...{ method: 'GET' } };
            const req = https.request(options, (res) => {
                responseCallback(res).then(resolve).catch(reject);
            });
            req.end();
        });
    },
    post: async (options, postData) => {
        return new Promise(async (resolve, reject) => {
            const boundary = `------------------------${Math.random().toString(36).substring(2)}`;
            options.headers = {};
            options.headers['Content-type'] = `multipart/form-data; boundary=${boundary}`;
            options.method = 'POST';
            let data = [];
            let fileData = Buffer.from('', 'utf-8');
            for (const param in postData) {
                if (param === 'file') {
                    fileData = await processFile(postData[param].name, postData[param].filePath, boundary);
                }
                else {
                    const payload = await processParam(param, postData[param]);
                    data.push(payload);
                }
            }
            let body;
            try {
                body = Buffer.concat([
                    Buffer.from(`--${boundary}`),
                    Buffer.from(data.join(`--${boundary}`), 'utf-8'),
                    fileData,
                    Buffer.from(`--${boundary}--\r\n`, 'utf-8')
                ]);
            }
            catch (e) {
                reject(e);
                return;
            }
            options.headers['Content-length'] = body.length;
            const req = https.request(options, (res) => {
                responseCallback(res).then(resolve).catch(reject);
            });
            req.write(body);
            req.end();
        });
    }
};
//# sourceMappingURL=request.js.map