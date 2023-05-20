const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { DefinePlugin } = require("webpack")

module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "./src/index.css",
    }),
    new DefinePlugin({
      "process.env": {
        REACT_APP_GOOGLE_API_KEY: JSON.stringify(
          process.env.REACT_APP_GOOGLE_API_KEY
        ),
        REACT_APP_ITINERARY_RETRIEVER_API: JSON.stringify(
          process.env.REACT_APP_ITINERARY_RETRIEVER_API
        ),
        REACT_APP_PHOTO_API: JSON.stringify(process.env.REACT_APP_PHOTO_API),
        REACT_APP_POI_API: JSON.stringify(process.env.REACT_APP_POI_API),
        REACT_APP_POPCITY_API: JSON.stringify(
          process.env.REACT_APP_POPCITY_API
        ),
        REACT_APP_INFO_API: JSON.stringify(process.env.REACT_APP_INFO_API),
        REACT_APP_SERVID: JSON.stringify(process.env.REACT_APP_SERVID),
        REACT_APP_CALLBACK_URL: JSON.stringify(
          process.env.REACT_APP_CALLBACK_URL
        ),
        REACT_APP_ENVIRONMENT: JSON.stringify(
          process.env.REACT_APP_ENVIRONMENT
        ),
        REACT_APP_COGNITO_CLIENT_ID: JSON.stringify(
          process.env.REACT_APP_COGNITO_CLIENT_ID
        ),
      },
    }),
  ],
}
