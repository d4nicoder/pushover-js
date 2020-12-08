"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pushover = void 0;
const request_1 = __importDefault(require("./request"));
class Pushover {
    constructor(user, token) {
        this._hostname = 'api.pushover.net';
        this._path = '/1/messages.json';
        this._notification = {
            user: '',
            token: '',
            title: '',
            message: '',
            sound: 'pushover',
            priority: 0,
            expire: 0,
            retry: 0
        };
        this._notification.user = user;
        this._notification.token = token;
    }
    setDevice(device) {
        this._notification.device = device;
        return this;
    }
    setHtml() {
        this._notification.html = 1;
        return this;
    }
    setTitle(title) {
        this._notification.title = title;
        return this;
    }
    setMessage(message) {
        this._notification.message = message;
        return this;
    }
    setSound(sound) {
        this._notification.sound = sound;
        return this;
    }
    setAttachment(name, filePath) {
        this._notification.file = {
            name,
            filePath
        };
        return this;
    }
    setPriority(priority, expire, retry) {
        if (priority < -2 || priority > 2) {
            console.error('Pushover notification priority have to be from -2 to 2');
            return this;
        }
        this._notification.priority = priority;
        if (priority === 2) {
            this._notification.expire = typeof expire === 'number' ? expire : 10800;
            this._notification.retry = typeof retry === 'number' ? retry : 3600;
        }
        return this;
    }
    setUrl(url, title) {
        this._notification.url = url;
        if (title) {
            this._notification.url_title = title;
        }
        return this;
    }
    setTimestamp(timestamp) {
        this._notification.timestamp = timestamp;
        return this;
    }
    async send(title, message) {
        if (title) {
            this._notification.title = title;
        }
        if (message) {
            this._notification.message = message;
        }
        const options = {
            port: 443,
            host: this._hostname,
            path: this._path,
        };
        return request_1.default.post(options, this._notification);
    }
}
exports.Pushover = Pushover;
//# sourceMappingURL=pushover.js.map