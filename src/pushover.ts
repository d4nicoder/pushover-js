import Request from './request'


interface INotificationData {
  user: string
  token: string
  device?: string
  url?: string
  url_title?: string
  timestamp?: number
  title: string
  message: string
  sound: Sound
  priority: number
  expires: number
  retry: number
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

class Pushover {
  private _notification: INotificationData = {
    user: '',
    token: '',
    title: '',
    message: '',
    sound: 'pushover',
    priority: 0,
    expires: 0,
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

  public setPriority(priority: number): Pushover {
    this._notification.priority = priority
    return this
  }

  public setExpires(expires: number): Pushover {
    this._notification.expires = expires
    return this
  }

  public setRetry(retry: number): Pushover {
    this._notification.retry = retry
    return this
  }

  public setUrl(url: string, title?: string): Pushover {
    this._notification.url = url
    if (title) {
      this._notification.url_title = title
    }
    return this
  }

  public async send(title?: string, message?: string) {
    if (title) {
      this._notification.title = title
    }

    if (message) {
      this._notification.message = message
    }

    const response = await Request.post('asdasdfsadf', this._notification)
  }
}