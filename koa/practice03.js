let Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        let html = `
        <h1>Koa2 request POST</h1>
        <form method="POST" action = "/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>age</p>
            <input name="age" /><br/>
            <button type="submit">submit</button>
        </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        const data = await getPostData(ctx)
        ctx.body = data
    } else {
        ctx.body = `<h1>404!</h1>`
    }
})

function getPostData (ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.on('data', data => {
                postData += data
            })
            ctx.req.addListener('end', function () {
                let parseData = parseQuery(postData)
                resolve(parseData)
            })
        } catch(error) {
            reject(error)
        }
    })
}

function parseQuery(queryStr) {
    let result = {}
    let queryStrList = queryStr.split('&')
    for(let [index, str] of queryStrList.entries()){
        let itemList = str.split('=')
        result[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return result
}

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000')
})