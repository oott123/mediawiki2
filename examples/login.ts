import { MWBot } from '../src'

const bot = new MWBot('https://ff14.huijiwiki.com/w/api.php')
// tslint:disable-next-line: no-floating-promises
bot
  .login(process.env.MW_USERNAME, process.env.MW_PASSWORD)
  .then(() => {
    return bot.edit({
      title: 'Project:Sandbox/test',
      text: 'The quick brown fox jumps over the lazy dog.',
      bot: true
    })
  })
  .then(() => {
    return bot.simpleUpload({
      filename: 'sandbox_yunzewanfeng.png',
      file: 'example.png',
      comment: '只是一次测试'
    })
  })
