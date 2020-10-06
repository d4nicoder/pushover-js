import { IncomingMessage } from 'http'
import https from 'https'

interface IResponse {
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
          statusCode: res.statusCode
        }
      }
    })
  })
}


export default {
  get: (url: string, options?: any): Promise<IResponse> => {
    return new Promise((resolve, reject) => {
      options = options || {}
      options = { ...options, ...{ method: 'GET' } }
      const req = https.request(url, options, (res: IncomingMessage) => {
        responseCallback(res).then(resolve).catch(reject)
      })
      req.end()
    })
  },
  post: (url: string, postData: any, options?: any): Promise<IResponse> => {
    return new Promise((resolve, reject) => {
      options = options || {}
      options = { ...options, ... { method: 'POST' } }

      const req = https.request(url, options, (res) => {
        responseCallback(res).then(resolve).catch(reject)
      })

      let body: string = ''
      try {
        body = postData.toString()
      } catch (e) {
        console.error(e)
      }

      req.end(body)
    })
  }
}