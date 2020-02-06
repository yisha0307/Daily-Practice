(function () {
    document.getElementById('book-btn').addEventListener('click', queryBook)
    function queryBook () {
        const bookInput = document.getElementById('book-search-input')
        const query = bookInput.value
        const url = `/book?q=${query}&fields=id,title,image,author,publisher,price`
        let cacheData
        if (!query) {
            return window.alert('请输入关键字')
        }
        let remotePromise = getApiDataRemote(url)
        // 对缓存数据和fetch的数据进行一个比较
        getApiDataFromCache(url).then(data => {
            if (data && data.books) {
                bookInput.blur()
                document.getElementById('result-field').innerHTML = data.books
            }
            cacheData = data || {}
            return remotePromise
        }).then(data => {
            if (JSON.stringify(data) !== JSON.stringify(cacheData)) {
                bookInput.blur()
                document.getElementById('result-field').innerHTML = data.books || data.msg
            }
        })
    }
    /**
     *
     *
     * @param {url} url 请求的连接
     * @returns {Promise}
     */
    function getApiDataRemote (url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.timeout = 60000
            xhr.onreadystatechange = function () {
                var response = {}
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        response = JSON.parse(xhr.responseText)
                    }
                    catch (e) {
                        response = xhr.responseText
                    }
                    resolve(response)
                } else if (xhr.readyState === 4) {
                    resolve()
                }
            }
            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject
            xhr.open('GET', url, true)
            xhr.send(null)
        })
    }
    /**
     *
     * 获得cache数据
     * @param {url} url
     * @returns {Promise}
     */
    function getApiDataFromCache(url) {
        if ('caches' in window) {
            return caches.match(url).then(cache => {
                if (!cache) {
                    return
                }
                return cache.json()
            })
        } else {
            return Promise.resolve()
        }
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function() {
            console.log('Service worker注册成功')
        })
    }
})()