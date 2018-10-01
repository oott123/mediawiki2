import Debug = require('debug')
import { createReadStream, ReadStream } from 'fs'
import { IMWEditArgs, IMWSimpleUploadArgs } from './IMWArgs'
import { IMWEditResult, IMWLoginResult } from './IMWResult'
import { MWBotBase } from './MWBotBase'
import { WikiError } from './WikiError'

const debug = Debug('mw2:mwbot')

export class MWBot extends MWBotBase {
  private lastCsrfToken: string

  public async login(
    username: string,
    password: string,
    domain?: string
  ): Promise<IMWLoginResult> {
    const lgtoken = await this.getToken('login')
    const resp = await this.request('login', {
      lgname: username,
      lgpassword: password,
      lgdomain: domain,
      lgtoken
    })
    const loginResult = resp.login as IMWLoginResult
    this.checkResult(loginResult)
    debug('login success')
    return loginResult
  }

  public async getToken(type: string = 'csrf'): Promise<string> {
    debug('get token, type = ' + type)
    const resp = await this.query({
      meta: 'tokens',
      type
    })
    const token = resp.query.tokens[type + 'token']
    debug(`token = ${token}`)
    return token
  }

  public async updateCsrfToken() {
    this.lastCsrfToken = await this.getToken('csrf')
    debug('updated edit token')
    return this.lastCsrfToken
  }

  public async getCsrfToken() {
    if (!this.lastCsrfToken) {
      await this.updateCsrfToken()
    }
    return this.lastCsrfToken
  }

  public async edit(args: IMWEditArgs): Promise<IMWEditResult> {
    // debug('edit request', data)
    const resp = await this.requestWithToken('edit', args)
    this.checkResult(resp.edit)
    return resp.edit
  }

  public async simpleUpload(args: IMWSimpleUploadArgs) {
    if (typeof args.file === 'string') {
      args.file = createReadStream(args.file)
    }
    const resp = await this.requestWithToken('upload', args)
    // console.log(resp.upload)
    this.checkResult(resp.upload)
    return resp.upload
  }

  public async requestWithToken(action: string, args: any) {
    args.token = args.token || (await this.getCsrfToken())
    return this.request(action, args)
  }

  public query(data: any) {
    return this.request('query', data)
  }

  private checkResult(data: any) {
    if (data.result !== 'Success') {
      throw new WikiError(data)
    }
  }
}
