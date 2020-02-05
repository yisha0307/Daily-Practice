const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
    if (ctx.url === '/') {
        ctx.cookies.set(
            'MyName', 'tony', {
                domain: '127.0.0.1',
                path: '/',
                maxAge: 1000*60*60*24,
                expires: new Date('2020-6-18'),
                httpOnly: false,
                overwrite: false
            }
        )
        ctx.body = 'cookie is set'
    } else {
        if (ctx.cookies.get('MyName')) {
            ctx.body = ctx.cookies.get('MyName')
        } else {
            ctx.body = 'cookie is none'
        }
    }
})

app.listen(3000, () => {
    console.log('[demo] server is starting at 3000')
})

// http://127.0.0.1:3000