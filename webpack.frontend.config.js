const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader'
        },
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.svg$/,
            loader: 'url-loader'
        }
        
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: "./src/index.css",
    })
  ],
};
