export class WikiError extends Error {
  public data: any
  constructor(data: any) {
    super('API Request Error')
    if (data && data.errors) {
      this.message += '\n' + data.errors.map(e => e.text).join('\n')
    }
    if (data && data.docref) {
      this.message += '\n' + data.docref
    }
    if (data && data.reason) {
      if (data.reason.text) {
        this.message = data.reason.text
      }
    }
    this.data = data
  }
}
