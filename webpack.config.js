module.exports = {
    entry: [
      './src/index.js'
    ],
    output: {
      path: __dirname + '/webContent',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './webContent'
    }
  };