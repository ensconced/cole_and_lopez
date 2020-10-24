const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const plugins = [
    new CopyPlugin({
      patterns: [{ from: '**/*.(html|ico)', context: 'src' }, { from: 'admin' }],
    }),
  ];

  if (argv.mode === 'production') {
    plugins.unshift(new CleanWebpackPlugin());
  } else {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    mode: argv.mode,
    devtool: argv.mode === 'development' ? 'source-map' : 'none',
    entry: {
      index: './src/js/index.js',
      404: './src/js/404.js',
    },
    plugins,
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
          test: /\.json$/,
          // prevent normal json loader from running...
          type: 'javascript/auto',

          use: [
            {
              loader: path.resolve(__dirname, './gallery-json-loader.js'),
            },
            {
              loader: 'json-loader',
            },
          ],
        },
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
              adapter: require('responsive-loader/sharp'),
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
