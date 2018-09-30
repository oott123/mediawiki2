import { Readable } from 'stream'

interface IMWEditPartialArgs {
  section?: number
  sectiontitle?: string
  text?: string
  summary?: string
  tags?: string | string[]
  minor?: boolean
  notminor?: boolean
  bot?: boolean
  basetimestamp?: Date
  starttimestamp?: Date
  recreate?: boolean
  createonly?: boolean
  nocreate?: boolean
  watchlist?: 'watch' | 'unwatch' | 'preferences' | 'nochange'
  md5?: string
  prependtext?: string
  appendtext?: string
  undo?: number
  undoafter?: number
  redirect?: boolean
  contentformat?: string
  contentmodel?: string
  token?: string
}

export type IMWEditArgs =
  | (IMWEditPartialArgs & { title: string })
  | (IMWEditPartialArgs & { pageid: number })

export interface IMWSimpleUploadArgs {
  filename: string
  comment?: string
  tags?: string | string[]
  watchlist?: 'watch' | 'unwatch' | 'preferences' | 'nochange'
  ignorewarnings?: boolean
  file: Readable | Buffer | string
  token?: string
}
