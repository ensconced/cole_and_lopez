const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/js/index.js",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "**/*.(html|css|ico)", context: "src" },
        { from: "img/**/*", context: "src" },
      ],
    }),
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "built"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
