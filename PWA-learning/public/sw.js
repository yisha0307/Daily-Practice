const cacheName = 'bs-0-1-1'
// 缓存xhr请求的数据
const apiCacheName = 'api-0-1-1'
const cacheFiles = [
    '/',
    './index.html',
    './index.js',
    './index.css',
    './img/book.png',
    './img/loading.svg'
]
// serviceWorker 的this是self
// 监听install事件
self.addEventListener('install', function (e) {
    console.log('Service worker状态: install')
    // 安装完成后，进行文件缓存
    // caches 是一个全局变量
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles)
    })
    e.waitUntil(cacheOpenPromise)
})

self.addEventListener('fetch', function (e) {
    const cacheRequestUrls = [
        '/book?'
    ]
    console.log(`现在正在请求： ${e.request.url}`)
    var needCache = cacheRequestUrls.some(url => {
        return e.request.url.includes(url)
    })
    // 先对xhr数据缓存做相关的操作
    if (needCache) {
        // 需要缓存
        // 使用fetch请求数据，并将请求结果clone一份存到cache
        // 此部分缓存后在browser中使用全局变量caches获取
        caches.open(apiCacheName).then(cache => {
            return fetch(e.request).then(response => {
                cache.put(e.request.url, response.clone())
                return response
            })
        })
    } else {
        // 非api请求，直接查询cache
        // 如果有就直接返回，否则通过fetch请求
        e.respondWith(caches.match(e.request).then(cache => {
            console.log(e.request)
            return cache || fetch(e.request)
        }).catch(err => {
            console.log(err)
            return fetch(e.request)
        }))
    }   
})

// 监听active事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', e => {
    console.log('service worker状态: activate')
    var cachePromise = caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            // cacheName更新了之后就删除原有的cache
            if(key !== cacheName) {
                return caches.delete(key)
            }
        }))
    })
    e.waitUntil(cachePromise);
    // 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发
    return self.clients.claim();
})