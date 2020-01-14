## 值得阅读的文章
[正向代理与反向代理的区别](https://www.jianshu.com/p/208c02c9dd1d)

[大公司里怎样开发和部署前端代码](https://github.com/fouber/blog/issues/6)

[看完跳槽少说涨 5 K，前端面试从准备到谈薪完全指南（近万字精华）](https://juejin.im/post/5dfef50751882512444027eb)

[图片懒加载原理及实现](https://www.jianshu.com/p/8e2a73638153)

[一文看尽前端过去一年的精华沉淀](https://juejin.im/post/5dafa3d35188257b1549bad1#heading-11)

[看看这些被同事喷的JS代码风格你写过多少](https://mp.weixin.qq.com/s/f6DHgoTGcCIaN3Orlq45LA)

[重学this](https://juejin.im/post/5d6e5f77f265da03e05b2fd9)
- JS（ES5）里面有三种函数调用形式：
```javascript
func(p1, p2) 
obj.child.method(p1, p2)
func.call(context, p1, p2)
```
- 第一种和第二种都是语法糖，可以等价的变为call形式。 func(p1, p2)等价于 func.call(undefined, p1, p2); obj.child.method(p1, p2)等价于obj.child.method.call(obj.child, p1, p2);

[JS开发常用工具函数](https://segmentfault.com/a/1190000019601333)

[别再说虚拟 DOM 快了，要被打脸的](https://mp.weixin.qq.com/s/XR3-3MNCYY2pg6yVwVQohQ)

[Service Worker详解](https://www.jianshu.com/p/768be2733872)

[从 SPA 到 PWA：Web App的下一站在哪？](https://mp.weixin.qq.com/s/oZhZm6azOishzbRh2WsIpg)

[微信小程序和PWA对比分析](https://blog.csdn.net/baidu_browser/article/details/64440238)

[浏览器缓存机制](http://www.imooc.com/article/272542?mc_marking=57f1ecf96218fd14080e07535eb69916&mc_channel=weibo)

[SPA路由机制详解](https://www.cnblogs.com/liangyin/p/9686696.html)

[谈谈StorageEvent](https://mp.weixin.qq.com/s/FLgv7za3ICwvHFR8AHXnBA)
- storage event: `window.addEventListener('storage', callback)` 可以用来同步多tab的状态

[解决'script error'的另类思路](https://cloud.tencent.com/developer/article/1367170)

## 自己的整理

[javascript pratice](./Module/practice01.js)

[utils.js函数整理](./Module/utils.js)