import { IncomingMessage } from 'http'
import { INotificationData } from './pushover'
import * as fs from 'fs'
const https = require('https')

export interface IResponse {
  headers: any
  data: string
  statusCode: number
}

class ResponseError implements Error {
  public name: string
  public message: string
  public statusCode: number

  constructor(message: string, statusCode: number) {
    this.name = 'Response error'
    this.message = message
    this.statusCode = statusCode
  }
}

const processParam = async (name: string, value: string): Promise<string> => {
  return `\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
}

const processFile = async (name: string, filePath: string, boundary: string): Promise<Buffer> => {
  let type = 'application/octet-stream'
  if (/\.(jpg|jpeg)$/i.test(name)) {
    type = 'image/jpeg'
  } else if (/\.png$/i.test(name)) {
    type = 'image/png'
  } else if (/\.gif$/i.test(name)) {
    type = 'image/gif'
  } else if (/\.mp3$/i.test(name)) {
    type = 'audio/mpeg'
  } else if (/\.mp4$/i.test(name)) {
    type = 'video/mp4'
  }
  const data = await fs.promises.readFile(filePath)
  return Buffer.concat([
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="attachment"; filename="${name}"\r\nContent-type: ${type}\r\n\r\n`),
      data,
      Buffer.from(`\r\n`)
  ])
}

const responseCallback = (res: IncomingMessage): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    let responseData: string = ''
    res.on('data', (data) => {
      responseData += data.toString()
    })

    res.on('end', () => {
      if (res.statusCode && res.statusCode !== 200) {
        const error = new ResponseError(responseData, res.statusCode)
        reject(error)
      } else {
        const returnData: IResponse = {
          headers: res.headers,
          data: responseData,
          statusCode: typeof res.statusCode === 'number' ? res.statusCode : 500
        }
        resolve(returnData)
      }
    })
  })
}


export default {
  get: async (options?: any): Promise<IResponse> => {
    return new Promise((resolve, reject) => {
      options = options || {}
      options = { ...options, ...{ method: 'GET' } }
      const req = https.request(options, (res: IncomingMessage) => {
        responseCallback(res).then(resolve).catch(reject)
      })
      req.end()
    })
  },
  post: async (options: any, postData: INotificationData | any): Promise<IResponse> => {
    return new Promise(async (resolve, reject) => {
      const boundary = `------------------------${Math.random().toString(36).substring(2)}`
      options.headers = {}
      options.headers['Content-type'] = `multipart/form-data; boundary=${boundary}`
      options.method = 'POST'
      let data: string[] = []
      let fileData: Buffer = Buffer.from('', 'utf-8')

      for (const param in postData) {
        if (param === 'file') {
          fileData = await processFile(postData[param].name, postData[param].filePath, boundary)
        } else {
          const payload = await processParam(param, postData[param])
          data.push(payload)
        }
      }

      let body: Buffer
      try {
        body = Buffer.concat([
            Buffer.from(`--${boundary}`),
            Buffer.from(data.join(`--${boundary}`), 'utf-8'),
            fileData,
            Buffer.from(`--${boundary}--\r\n`, 'utf-8')
        ])
      } catch (e) {
        reject(e)
        return
      }

      options.headers['Content-length'] = body.length

      const req = https.request(options, (res: IncomingMessage) => {
        responseCallback(res).then(resolve).catch(reject)
      })

      req.write(body)
      req.end()
    })
  }
}
