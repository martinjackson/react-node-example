const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
        path: resolve('./server/public/'),
        filename: 'bundle.js'
    },
  resolve:{
    modules: [
    resolve('src'),
    "node_modules" ]
    },
  devServer: {

     // dont include boolean equivalent of these commandline switches, it will not work here
     // these are in the package.json where the following is executed
     //  webpack-dev-server --mode development --devtool eval-source --progress --colors

     // CLI only    --colors  --progress
     // Docs lie --hot --inline are CLI Only

     // --history-api-fallback
     historyApiFallback: true,

     host: '0.0.0.0',     // allow more than localhost
     port: 8080,
     contentBase: './server/public/',

     // allow NodeJS to run side-by-side with webpack-dev-server
     proxy: {  '/api/*': 'http://localhost:8081/' }   // <- backend
  },
  module: {
    rules: [
          {
            test: /^(?!.*\.{test,min}\.js$).*\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                      presets: ['es2015', 'react']
                   },
          },

          {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
          },

          // "file" loader for svg
          {
             test: /\.svg|\.png|\.gif|\.jpg$/,
             loader: 'file-loader',
             query: {
               name: 'static/media/[name].[hash:8].[ext]'
             }
          },

          {
            test: /\.html$/,
            loader: 'raw-loader'
          }
    ]
  }
}
