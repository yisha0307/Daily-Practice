const request = require('request')
const Datastore = require('nedb')

const db = new Datastore()

module.exports.get = (url, opt = {}) => {
    return new Promise((resolve, reject) => {
        request.get(url, opt, (err, res, body) => {
            if (err) {
                reject(err)
                return
            }
            resolve(body)
        })
    })
}

module.exports.post = (url, opt = {}) => {
    return new Promise((resolve, reject) => {
        request.post(url, opt, (err, res, body) => {
            if (err) {
                reject(err)
                return
            }
            resolve(body)
        })
    })
}