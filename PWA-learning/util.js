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

module.exports.saveRecord = obj => {
    return new Promise((resolve, reject) => {
        db.findOne(obj, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            if (res) {
                console.log('已存在')
                resolve(obj)
                return
            }
            db.insert(obj, (err, item) => {
                if (err) {
                    reject(err)
                    return
                }
                console.log('存储完毕')
                resolve(obj)
            })
        })
    })
}

module.exports.findAll = () => {
    return new Promise((resolve, reject) => {
        db.find({}, (err, list) => {
            if (err) {
                reject(err)
                return
            }
            resolve(list)
        })
    })
} 