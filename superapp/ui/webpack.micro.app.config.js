const webpack = require('webpack');
const { merge } = require('webpack-merge');
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack')
  .default;
// const Visualizer = require('webpack-visualizer-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');
const ImportMapWebpackPlugin = require('webpack-import-map-plugin');

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(
    angularWebpackConfig,
    options
  );

  // return singleSpaWebpackConfig;
  return merge(singleSpaWebpackConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
      ],
    },
    externals: [
      // /^single-spa$/,
      // /^single-spa-angular$/,

      // /^rxjs$/,
      // /^rxjs\/operators$/,

      // /^zone\.js$/,
      
      // // angular
      // /^@angular\/core$/,
      // /^@angular\/compiler$/,
      // /^@angular\/common$/,
      // /^@angular\/forms$/,
      // /^@angular\/router$/,
      // /^@angular\/animations$/,
      // /^@angular\/platform-browser$/,
      // /^@angular\/platform-browser-dynamic$/
    ],
    plugins: [
      // new Visualizer(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja/),
      // new ImportMapWebpackPlugin({
      //   filter: x => {
      //     return ['main.js'].includes(x.name);
      //   },
      //   transformKeys: filename => {
      //     if (filename === 'main.js') {
      //       return singleSpaWebpackConfig.output.library;
      //     }
      //   },
      //   writeToFileEmit: true,
      //   fileName: 'import-map.json',
      //   baseUrl: 'http://localhost/' + singleSpaWebpackConfig.output.library + '/'
      // })
      // new BrotliPlugin({
      //   asset: '[path].br[query]',
      //   algorithm: 'brotli',
      //   test: /\.(js|css|html|svg|png|eot|ttf|woff|woff2|jpg|webp|gif|otf|ani)$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // })
    ]
  });
};
