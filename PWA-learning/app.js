const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const koaBody = require('koa-body')
const get = require('./util').get
const app = new Koa()
const router = new Router()

router.get('/book', async ctx => {
    /**
     * @returns {object} query
     */
    const query = ctx.request.query
    const {q, fields} = query || {}
    const url = `https://api.douban.com/v2/book/search?q=${q}&fields=${fields}&count=10`;
    const result = await get(url)
    ctx.body = result
})
/** 
 * 提交subscription信息，并保存
*/
router.post('/subscription', koaBody(), async ctx => {
    let body = ctx.request.body
    await util.saveRecord(body)
    ctx.response.body = {
        status: 0
    }
})
/**
 * 消息推送API，可以在管理后台进行调用
 * 为了方便起见，直接post一个请求来查看效果
 */
router.post('/push', koaBody(), async ctx => {
    let payload = ctx.request.body
    let list = await util.findAll()
    let status = list.length ? 0 : -1
    list.map(subscription => pushMessage(subscription, JSON.stringify(payload)))
    ctx.response.body = {
        status
    }
})

/**
 * 使用webpush
 * 向push service发送请求
 * @param {ServiceWorker subscription} subscription
 * @param {Object} [data={}]
 */
function pushMessage (subscription, data = {}) {
}
app.use(router.routes())
app.use(serve(__dirname + '/public')) // 放置静态资源
app.listen(8086, () => {
    console.log('8086 port is working')
})