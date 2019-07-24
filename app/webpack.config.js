const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }])
  ]
};
