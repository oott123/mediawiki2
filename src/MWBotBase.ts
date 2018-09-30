import Debug = require('debug')
import fetchCookie = require('fetch-cookie')
import FormData = require('form-data')
import nodeFetch from 'node-fetch'
import tough = require('tough-cookie')
import { IMWBotOptions } from './IMWBotOptions'
import { WikiError } from './WikiError'

const debug = Debug('mw2:mwbotbase')

export class MWBotBase {
  public fetch: typeof nodeFetch
  public endpoint: string

  private cookieJar: any
  private options: IMWBotOptions

  constructor(endpoint: string, options: IMWBotOptions = {}) {
    this.cookieJar = new tough.CookieJar()
    this.fetch = fetchCookie(nodeFetch, this.cookieJar)
    this.endpoint = endpoint
    this.options = { noWarns: false, ...options }
  }

  private warn(...args: any[]) {
    if (this.options.noWarns) {
      return
    }
    console.warn(...args)
  }

  public async rawRawRequest(data: FormData) {
    const resp = await this.fetch(this.endpoint, {
      method: 'POST',
      body: data as any,
      redirect: 'follow'
    })
    return resp as any
  }

  public async rawRequest(data: FormData) {
    const resp = await this.rawRawRequest(data)
    const json = await resp.json()
    if (!resp.ok) {
      throw new WikiError(json)
    }
    if (json.warnings) {
      json.warnings.forEach(warn => {
        this.warn(`WARNING: [${warn.code}] ${warn.text}`)
      })
    }
    if (json.errors) {
      throw new WikiError(json)
    }
    return json
  }

  public async request(action: string, data: any) {
    debug('request', data)
    const form = new FormData()
    form.append('action', action)
    form.append('format', 'json')
    form.append('formatversion', '2')
    form.append('errorformat', 'plaintext')
    // tslint:disable-next-line:forin
    for (const key in data) {
      let value = data[key]
      if (Array.isArray(value)) {
        value = '\u001f' + value.join('\u001f')
      }
      if (value === false || value === undefined || value === null) {
        continue
      }
      if (value instanceof Date) {
        value = value.toISOString()
      }
      if (typeof value === 'boolean') {
        value = JSON.stringify(value)
      }
      form.append(key, value)
    }
    // debug('request form', form)
    const resp = await this.rawRequest(form)
    debug('response', resp)
    return resp
  }
}
