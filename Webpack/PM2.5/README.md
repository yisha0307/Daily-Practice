Based on Webpack + REACT + sass + ajax + json.    

##总结：   
####1、CSS Module:   
实现较简单：
```
loaders: [
	          'style-loader',
	          'css-loader?module&localIdentName=[hash:base64:5]&-url',
	        ]
 ```
 如果要用sass，只要在最后面加"sass-loader"就ok   
 
 在js模块内：   
```
import style from './heading.scss'; //直接引用
<div className = {style.haha}> //scss文件里对应的就是.haha这个class名，css-loader会把它变成一个哈希值，这样就能保证在不同模块内不重名
```

