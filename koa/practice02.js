const Koa = require('koa')
const app = new Koa()
// logger
app.use(async(ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`X-Response-Time ${ms}ms`)
})

// response
app.use(async ctx => {
    ctx.body = 'hello world'
    // ctx.request: a Koa Request
    // ctx.response: a Koa response
    console.log('app.context', ctx.request, ctx.response)
    // ctx.req: Node's request
    // ctx.res: Node's response
    console.log('app.context', ctx.req, ctx.res)
})

// error handling
app.on('error', err => {
    log.error('server error', err)
})

app.listen(3000)