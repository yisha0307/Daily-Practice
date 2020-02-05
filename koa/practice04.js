const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

function render (page) {
    return new Promise((resolve, reject) => {
        const page = `./pages/${page}`
        // 生成二进制流
        fs.readFile(page, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })  
}
async function route (url) {
    let page = '404.html'
    switch (url) {
        case '/':
            page = 'index.html'
            break
        case '/index':
            page = 'index.html'
            break
        case '/koa':
            page = 'koa.html'
            break
    }
    let html = await render(page)
    return html
}

app.use(async ctx => {
    const html = await route(ctx.request.url)
    ctx.body = html
})
app.listen(3000, () => {
    console.log('port 3000 is working')
})