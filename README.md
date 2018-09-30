# mediawiki2

Typescript MediaWiki API request library.

## Install

```bash
yarn install mediawiki2
```

## Usage

```javascript
import { MWBot } from 'mediawiki2'

const bot = new MWBot('https://ff14.huijiwiki.com/w/api.php')

bot.login(process.env.MW_USERNAME, process.env.MW_PASSWORD)
  .then(() => {
    return bot.edit({
      title: 'Sandbox',
      text: 'The quick brown fox jumps over the lazy dog.',
      bot: true
    })
  })
  .then(() => {
    return bot.simpleUpload({
      filename: 'filename.png',
      file: 'filename.png',
      comment: 'comment'
    })
  })
```
