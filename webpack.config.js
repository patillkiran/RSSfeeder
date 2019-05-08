var config = {
   entry: {
    index:'./index',
    vendors: ['react']
  },
   output: {
    path: '/',
    filename: '[name].index.js'
  },
   devServer: {
      historyApiFallback: true,
	  hot: true,
	  inline: true,
	
	  host: 'localhost', // Defaults to `localhost`
	  port: 3000, // Defaults to 8080
	  proxy: {
		'^/api/*': {
		  target: 'http://localhost:8090/',
		  secure: false
		}
	  }
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },{
			test: /\.css$/,
			loader: 'css-loader',
			query: {
				modules: true,
				localIdentName: '[name]__[local]___[hash:base64:5]'
			}
		}
      ]
   }
}
module.exports = config;