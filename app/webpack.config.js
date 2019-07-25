const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/html/index.html", to: "index.html" }])
  ],
  devServer: {
    // outputPath: path.join(__dirname + '/public/'),
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
  }
};
