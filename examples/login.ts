import { MWBot } from '../src'

const bot = new MWBot('https://ff14.huijiwiki.com/w/api.php')
bot.login(process.env.MW_USERNAME, process.env.MW_PASSWORD)
// .then(() => {
//   return bot.edit({
//     title: '用户:云泽宛风/沙盒/机器人编辑测试',
//     text: 'The quick brown fox jumps over the lazy dog.',
//     bot: true
//   })
// })
// .then(() => {
//   return bot.simpleUpload({
//     filename: 'sandbox_yunzewanfeng.png',
//     file: '/Users/oott123/Documents/Work/我/m-sk7cvaIWeF-DwE6UH7Y9jCJQ.png',
//     comment: '只是一次测试'
//   })
// })
