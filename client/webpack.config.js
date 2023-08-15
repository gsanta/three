/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const Dotenv = require('dotenv-webpack');

const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pagesPath = path.resolve(__dirname, 'src/pages');

const entryPoints = glob.sync(path.join(pagesPath, '*.ts')).reduce((entries, file) => {
  const { name, dir } = path.parse(file);
  const entry = path.join(path.relative(pagesPath, dir), name);
  entries[entry] = file;
  console.log(entry);
  return entries;
}, {});

module.exports = (env, argv) => {

  return {
    entry: entryPoints,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: [/node_modules/, /src\/server/],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.ttf$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({}),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        DEBUG: env === 'debug' ? true : false,
      }),
      // new BundleAnalyzerPlugin({
      //     analyzerPort: 8887
      // }),
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 1,
      // }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        inject: 'body',
        hash: 'contenthash',
        scriptLoading: 'blocking',
      }),
      new WebpackAssetsManifest({
        entrypoints: true,
        writeToDisk: false,
        output: 'manifest.json',
        entrypointsUseAssets: true,
      }),
      process.env.NODE_ENV === 'production' ?
        new webpack.EnvironmentPlugin(['RENDER_EXTERNAL_URL', 'GOOGLE_OAUTH_CLIENT_ID']) :
        new Dotenv({ path: '../backend/.env'})
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', 'scss', '.css'],
      // alias: getResolvedAbsolutePaths(),
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    // output: {
    //   filename: '[name].js',
    // },
    output: {
      filename: 'js/[name]-[contenthash].js',
      // chunkFilename: 'js/[name]-[contenthash].chunk.js',
      path: path.resolve(__dirname, 'public'),
      // publicPath: 'auto',
    },
    devtool: 'eval-source-map',
    mode: 'development',
    optimization: {
      usedExports: true,
    },
    context: __dirname,
    devServer: {
      static: ['../editor/emscripten/build'],
      port: 3012,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
  };
};
