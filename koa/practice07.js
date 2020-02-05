// static resource
const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')

const staticPath = './static'

app.use(static(
    path.join(__dirname, staticPath)
))
app.use(async ctx => {
    ctx.body = 'hello world'
})
app.listen(3000, () => {
    console.log('demo server is starting at port 3000')
})