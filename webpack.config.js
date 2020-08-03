'use strict';
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  stats: 'errors-only',
  entry: {
    npmhub: './source/npmhub',
    background: './source/background'
  },
  resolve: {
    alias: {
      url: path.resolve('./source/lib/reduced-url.js'),
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'distribution'),
    filename: '[name].js'
  },
  plugins: [
    new SizePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'source',
          globOptions: {
            ignore: [
              '**/*.js'
            ]
          }
        }
      ]
    })
  ],
  optimization: {
    // Without this, function names will be garbled and enableFeature won't work
    concatenateModules: true,

    // Automatically enabled on production; keeps it somewhat readable for AMO reviewers
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2 // eslint-disable-line camelcase
          }
        }
      })
    ]
  }
};
