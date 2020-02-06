# PWA的简单demo
## 启动项目
```
node app.js
```

## PWA的知识点:
#### 1. manifest.json
Manifest是一个JSON格式的文件，你可以把它理解为一个指定了Web App桌面图标、名称、开屏图标、运行模式等一系列资源的一个清单。
添加在public目录下

- 在safari / ios下不支持manifest.json，所以在index.html头部添加head标签来支持相应的资源和展示形式:
```html
<meta name="apple-mobile-wep-app-capable" content="yes">
<meta name="apple-mobile-wep-app-status-bar-style" content="default">
<meta name="apple-mobile-wep-app-title" content="PWA DEMO">
<link rel="apple-touch-icon" href="img/icons/book-256.png">
```

- 同样的, 在IE也有相应的问题，也需要添加head标签:
```html
<meta name="application-name" content="PWA DEMO">
<meta name="msapplication-TileColor" content="#222">
<meta name="msapplication-square70x70logo" content="img/icons/book-72.png" />
<meta name="msapplication-square150x150logo" content="img/icons/book-144.png" />
<meta name="msapplication-square310x310logo" content="img/icons/book-256.png" />
```

#### 2. 离线offline可用
* Service Worker *
> 可以把Service Worker简单理解为一个独立于前端页面，在后台运行的进程。因此，它不会阻塞浏览器脚本的运行，同时也无法直接访问浏览器相关的API（例如：DOM、localStorage等）。此外，即使在离开你的Web App，甚至是关闭浏览器后，它仍然可以运行。它就像是一个在Web应用背后默默工作的勤劳小蜜蜂，处理着缓存、推送、通知与同步等工作。所以，要学习PWA，绕不开的就是Service Worker。
Service Worker必须运行在HTTPS环境下，不过为了本地开发方便，也可以运行在localhost(127.0.0.1)域下。

![](https://user-gold-cdn.xitu.io/2018/4/8/162a560d0bdaf33b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)