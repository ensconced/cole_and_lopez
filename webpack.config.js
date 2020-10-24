const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    devtool: argv.mode === 'development' ? 'source-map' : 'none',
    entry: {
      index: './src/js/index.js',
      gallery: './src/js/gallery.js',
      404: './src/js/404.js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: '**/*.(html|ico)', context: 'src' }],
      }),
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'built'),
    },
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(jpe?g|png|webp)$/i,
          use: {
            loader: 'responsive-loader',
            options: {
              sizes: [600, 1024, 2048, 4096],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
              },
            },
          ],
        },
        {
          test: /jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        },
      ],
    },
  };
};
