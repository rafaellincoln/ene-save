const webpack = require('webpack')

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dev = (process.env.NODE_ENV === 'development')

module.exports = {
  devtool: dev ? 'source-map' : 'eval',

  entry: {
    app: [
      './polyfill.js',
      './client/src/app.js',
    ],
    globals: [
      './client/styles-dep/globals/custom.css',
      './client/styles-dep/globals/fonts.css',
      './client/styles-dep/globals/suitcss.css',
      './client/styles-dep/globals/bootstrap.css',
      // CSS globais do projeto
    ],
  },

  output: {
    path: path.join(__dirname, 'public/'),
    // diretório onde todos os arquivos do bundle serão gerados

    filename: 'js/[name].js',
    // caminho e nome do arquivo de scripts gerado

    publicPath: '/',
    // path relativo para o HTML carregar os recursos
  },

  module: {
    rules: [
      // rules for modules
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client/src'),
        ],
        loader: 'babel-loader',
        // loader que será aplicar para todos os arquivos que deem match nas regras acima
      },

      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'client/styles-dep/globals'),
        ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
            },
          ],
        }),
      },

      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'client/src'),
        ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: 'fire-[name]-[local]',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
  ],
}
