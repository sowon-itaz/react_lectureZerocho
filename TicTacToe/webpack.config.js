const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "ttt-dev",
  mode: "development", //개발중일때는 : development 실서비스에서는 production
  devtool: "eval", // 개발중일때는: eval 실서비스: hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  //entry에 파일을 읽고 modules를 적용한 뒤 output으로 파일을 합쳐서 하나로 만든다.
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), //__dirname는 현재폴더(c://블라블라/dist)
    filename: "app.js", //entry의 app안에 파일들을 합쳐서 app.js로 만들어 주는것
    publicPath: "/dist",
  },

  devServer: {
    publicPath: "/dist",
    hot: true,
  },
};
