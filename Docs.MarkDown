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
- diff有可能很耗内存

[Service Worker详解](https://www.jianshu.com/p/768be2733872)

[从 SPA 到 PWA：Web App的下一站在哪？](https://mp.weixin.qq.com/s/oZhZm6azOishzbRh2WsIpg)

[微信小程序和PWA对比分析](https://blog.csdn.net/baidu_browser/article/details/64440238)

[浏览器缓存机制](http://www.imooc.com/article/272542?mc_marking=57f1ecf96218fd14080e07535eb69916&mc_channel=weibo)
![](https://user-gold-cdn.xitu.io/2018/9/20/165f701820fafcf8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

[SPA路由机制详解](https://www.cnblogs.com/liangyin/p/9686696.html)

[谈谈StorageEvent](https://mp.weixin.qq.com/s/FLgv7za3ICwvHFR8AHXnBA)
- storage event: `window.addEventListener('storage', callback)` 可以用来同步多tab的状态

[解决'script error'的另类思路](https://cloud.tencent.com/developer/article/1367170)

[关于vuex的持久化](https://www.jianshu.com/p/7346a101332b)
- 在plugin里注册事件，在每次mutation触发的时候同步更改localStorage（使用store.subscribe方法）
- 如果localStorage里有值，就用store.replaceState更新掉

[九种跨域方式实现原理（完整版）](https://mp.weixin.qq.com/s/6l4IVdCqH4DF6zckmnDc_w)

[CSS3 Flexbox 布局完全指南](https://www.html.cn/archives/8629)

[webpack模块化原理-commonjs](https://segmentfault.com/a/1190000010349749)

[前后端常见的几种鉴权方式](https://blog.csdn.net/wang839305939/article/details/78713124/)

[Web 性能优化： 使用 Webpack 分离数据的正确方法](https://segmentfault.com/a/1190000018368885)
- ** bundle splitting **: 创建更多更小的文件，并行加载，以获得更好的缓存效果，主要作用就是使浏览器并行下载，提高下载速度。并且运用浏览器缓存，只有代码被修改，文件名中的哈希值改变了才会去再次加载。
(比如拆分成main.js和vendor.js, 把vendor.js拆分成各个npm包，把main.js根据业务场景也拆分成更小的包)
```javascript
entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    ProductList: path.resolve(__dirname, 'src/ProductList/ProductList.js'),
    ProductPage: path.resolve(__dirname, 'src/ProductPage/ProductPage.js'),
    Icon: path.resolve(__dirname, 'src/Icon/Icon.js'),
},
optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
```
- ** code splitting **：只加载用户最需要的部分，其余的代码都遵从懒加载的策略，主要的作用就是加快页面的加载速度，不加载不必要的代码。
    - 最简单就是使用`import`或者`require`导入组件
    - react里可以使用`React.lazy(() => import('/aComponent')`)

- [Vue 3 源码导读](https://juejin.im/post/5d977f47e51d4578453274b3)

## 自己的整理

[javascript pratice](./Module/practice01.js)

[utils.js函数整理](./Module/utils.js)