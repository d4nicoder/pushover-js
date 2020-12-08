import Request from './request'
import { IResponse } from './request'


type Priority = -2 | -1 | 0 | 1 | 2

export interface INotificationData {
  user: string;
  token: string;
  device?: string;
  url?: string;
  url_title?: string;
  timestamp?: number;
  html?: 1;
  title: string;
  message: string;
  sound: Sound;
  priority: number;
  expire: number;
  retry: number;
  file?: {
    name: string;
    filePath: string;
  }
}

type Sound = 'pushover' |
  'bike' |
  'bugle' |
  'cashregister' |
  'classical' |
  'cosmic' |
  'falling' |
  'gamelan' |
  'incoming' |
  'intermission' |
  'magic' |
  'mechanical' |
  'pianobar' |
  'siren' |
  'spacealarm' |
  'tugboat' |
  'alien' |
  'climb' |
  'persistent' |
  'echo' |
  'updown' |
  'vibrate' |
  'none'

export class Pushover {
  private _hostname: string = 'api.pushover.net'
  private _path: string = '/1/messages.json'

  private _notification: INotificationData = {
    user: '',
    token: '',
    title: '',
    message: '',
    sound: 'pushover',
    priority: 0,
    expire: 0,
    retry: 0
  }

  constructor(user: string, token: string) {
    this._notification.user = user
    this._notification.token = token
  }

  public setDevice(device: string): Pushover {
    this._notification.device = device
    return this
  }

  public setHtml(): Pushover {
    this._notification.html = 1
    return this
  }

  public setTitle(title: string): Pushover {
    this._notification.title = title
    return this
  }

  public setMessage(message: string): Pushover {
    this._notification.message = message
    return this
  }

  public setSound(sound: Sound): Pushover {
    this._notification.sound = sound
    return this
  }

  public setAttachment(name: string, filePath: string): Pushover {
    this._notification.file = {
      name,
      filePath
    }
    return this
  }

  public setPriority(priority: Priority, expire?: number, retry?: number): Pushover {
    if (priority < -2 || priority > 2) {
      console.error('Pushover notification priority have to be from -2 to 2')
      return this
    }
    this._notification.priority = priority

    if (priority === 2) {
      this._notification.expire = typeof expire === 'number' ? expire : 10800
      this._notification.retry = typeof retry === 'number' ? retry : 3600
    }
    return this
  }

  public setUrl(url: string, title?: string): Pushover {
    this._notification.url = url
    if (title) {
      this._notification.url_title = title
    }
    return this
  }

  public setTimestamp(timestamp: number): Pushover {
    this._notification.timestamp = timestamp
    return this
  }

  public async send(title?: string, message?: string): Promise<IResponse> {
    if (title) {
      this._notification.title = title
    }

    if (message) {
      this._notification.message = message
    }

    const options = {
      port: 443,
      host: this._hostname,
      path: this._path,
    }

    return Request.post(options, this._notification)
  }
}
