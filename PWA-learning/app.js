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
app.use(router.routes())
app.use(serve(__dirname + '/public')) // 放置静态资源
app.listen(8086, () => {
    console.log('8086 port is working')
})