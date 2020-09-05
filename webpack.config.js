const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
    gallery: "./src/js/gallery.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "**/*.(html|css|ico)", context: "src" },
        { from: "img/**/*", context: "src" },
      ],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "built"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,
              // localIdentName: "[name]__[local]___[hash:base64:5]"
            },
          },
        ],
      },
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};

if (process.env.WEBPACK_WATCH === "true") {
  config.plugins.unshift(new CleanWebpackPlugin());
  config.watch = true;
}

module.exports = config;
