const webpack = require('webpack');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: './src/index.js',
  resolve: {
    fallback: {
      'buffer': require.resolve('buffer'),
      'crypto': require.resolve('crypto-browserify'),
      'events': require.resolve('events/'),
      'http': require.resolve('stream-http'),
      'https': require.resolve('https-browserify'),
      'os': require.resolve('os-browserify'),
      'path': require.resolve('path-browserify'),
      'stream': require.resolve('stream-browserify'),
      'process': require.resolve('process/browser')
    }
  },
  output: {
    library: 'Ceramic',
    libraryTarget: 'window',
    filename: 'ceramic.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode,
  devtool: prod ? false : 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({}),
      'process.env.NODE_ENV': JSON.stringify(mode)
    })
  ]
};
