export interface IMWLoginResult {
  result: string
  lguserid: string
  lgusername: number
}

export interface IMWEditResult {
  new?: boolean
  result: string
  pageid: number
  title: string
  contentmodel: string
  oldrevid: number
  newrevid?: number
  newtimestamp: string
  nochange?: boolean
}
