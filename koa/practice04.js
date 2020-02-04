const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

function render(page) {
    return new Promise((resolve, reject) => {
        let pageUrl = `./pages/${page}`
        fs.readFile(pageUrl, "binary", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}