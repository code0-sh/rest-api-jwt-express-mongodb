const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    'index': [
      path.resolve(__dirname, 'src/server.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
