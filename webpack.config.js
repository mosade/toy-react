const path = require('path');
const { createECDH } = require('crypto');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'main.js'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "main.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]]
        }
      }
    },
    //  {
    //   test: /.jsx?$/,
    //   include: [
    //     path.resolve(__dirname, 'app')
    //   ],
    //   exclude: [
    //     path.resolve(__dirname, 'node_modules')
    //   ],
    //   loader: 'babel-loader',
    //   query: {
    //     presets: [
    //       ["@babel/env", {
    //         "targets": {
    //           "browsers": "last 2 chrome versions"
    //         }
    //       }]
    //     ]
    //   }
    // }
  ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, '/dist/'),
  //   inline: true,
  //   host: 'localhost',
  //   port: 8080,
  // }
};