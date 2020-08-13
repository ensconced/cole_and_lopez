const path = require("path");

module.exports = {
  mode: "production",
  watch: process.env.WEBPACK_WATCH === "true",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
