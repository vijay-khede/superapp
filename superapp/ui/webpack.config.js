const { merge } = require('webpack-merge');
const webpack = require('webpack');
module.exports = (angularWebpackConfig, options) => {
  return merge(angularWebpackConfig, {
    resolve: {
      fallback: {
        "util": false,
        "assert": false,
        "url": require.resolve("url/")
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({DEBUG: undefined})
      })
    ]

  });

};