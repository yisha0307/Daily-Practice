var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/index.jsx',
	output:{
		path: __dirname +'/public',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: "./public",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'searchBar',	//配合html-webpack-plugin的配置
		})
	],
	module: {
		loaders: [
		{
			test: /\.scss$/,
			loaders: ['style-loader','css-loader','sass-loader'],
		},{
			test: /\.(png|jpq)$/,
			loader: 'url? limit = 40000'
		},{
			test: /\.jsx$/,
			loader:'babel-loader',
			include: APP_PATH,
		}]
	},
	resolve:{
		extensions: ['','.js', '.jsx']
	},
};