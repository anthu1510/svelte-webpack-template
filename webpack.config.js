const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = process.env.mode;

const config = {
  entry: "./src/main.js",
  output: {
    path:
      mode === "development"
        ? path.join(__dirname, "dist")
        : path.join(__dirname, "build"),
    filename:
      mode === "development" ? "bundle.[hash].js" : "bundle.[hash].min.js"
  },
  devServer: {
    contentBase:
      mode === "development"
        ? path.join(__dirname, "dist")
        : path.join(__dirname, "build"),
    compress: true,
    port: 2000
  },
  module: {
    rules: [
      { test: /\.(html|svelte)$/, use: "svelte-loader" },
      {
        test: /\.css$/i,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      { test: /\.(png|jpg|gif|svg)$/i, use: "url-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Svelte App",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    }),
    new webpack.ProvidePlugin({
      join: ["lodash", "join"]
    })
  ]
};

module.exports = config;
