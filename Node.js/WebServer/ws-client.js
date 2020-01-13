// 仅支持webSocket的浏览器
var socket = new WebSocket("ws://localhost:8080/guest")
socket.onopen = function (openEvent) {
    // 连接成功之后的回调
    console.log("WebSocket conntected.")
}
socket.onmessage = function(messageEvent) {
    // 接受信息之后的回调
    var data = messageEvent.data,
        dataObject = JSON.parse(data)
    console.log('Guest at ' + dataObject.time + ": "+ dataObject.guest)
}

socket.onerror = function (err) {
    console.log('some error:'+err)
}

socket.onclose = function () {
    console.log('websocket closed.')
}