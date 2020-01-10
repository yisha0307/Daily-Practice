let i = 1
function simpleCount () {
    i++
    // worker线程中的全局对象是self, 代表子线程自身
    self.postMessage(i)
    setTimeout(simpleCount, 1000);
}
simpleCount()

self.onmessage = ev => {
    postMessage(ev.data + ' 呵呵~')
}