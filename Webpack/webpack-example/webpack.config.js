module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },{
      	test:/\.js$/,
      	exclude: /node_modules/,
      	loader:'babel-loader',
      	query: {
      		presets:['es2015','react']
      	}
      },{
        test:/\.css$/,
        exclude:/node_modules/,
        loader:'style-loader!css-loader?modules'
      },{
        test:/\.scss$/,
        exclude:/node_modules/,
        loader:'style-loader!css-loader!sass-loader?modules'      
      }
    ]
  },

  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
}
