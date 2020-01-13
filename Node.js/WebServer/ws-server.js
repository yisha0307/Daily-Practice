var request = require('request')
var dateFormat = require('dateformat')
var webSocket = require('ws'),
    webSocketServer = webSocket.Server
    wss = new webSocketServer({
        port: 8080,
        path: '/guest'
    })

// 收到客户端的连接请求后，开始给客户端推送信息
wss.on('connection', function (ws) {
    wss.on('message', function (message) {
        console.log('received: %s', message)
    })
    sendGuestInfo(ws)
})

function sendGuestInfo (ws) {
    request('http://uinames.com/api?region=china',
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonObject = JSON.parse(body),
                    guest = jsonObject.name + jsonObject.surname,
                    guestInfo = {
                        guest,
                        time: dateFormat(new Date(), 'HH:MM:ss')
                    }
                if (ws.readyState === webSocket.OPEN) {
                    ws.send(JSON.stringify(guestInfo))
                    // 不定时执行
                    setTimeout(() => {
                        sendGuestInfo(ws)
                    }, (Math.random() * 5 + 3) * 1000);
                }
            } 
        }
    )
}