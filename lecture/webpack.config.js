const path = require("path");

module.exports = {
  name: "wordrelay-setting",
  mode: "development", //개발중일때는 : development 실서비스에서는 production
  devtool: "eval", // 개발중일때는: eval 실서비스: hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },

  //아래 entry, output 굉장히 중요
  //entry에 파일을 읽고 modules를 적용한 뒤 output으로 파일을 합쳐서 하나로 만든다.
  entry: {
    //입력
    //app: ["./client.jsx", "./WordRelay.jsx"], //client.jsx파일에서 const WordRelay = require("./WordRelay")로 WordRelay.jsx를 불러오는 경우 client.jsx만 적어주면 웹팩이 알아서 파악한다.
    //확장자 입력은 resolve의 extensions안에서 미리 처리할 수 있다.
    app: ["./client"],
  },

  module: {
    rules: [
      {
        //.js와 .jsx파일에 rule을 적용하겠다는 정규표현식
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  output: {
    //출력
    path: path.join(__dirname, "dist"), //__dirname는 현재폴더(c://블라블라/dist)
    filename: "app.js", //entry의 app안에 파일들을 합쳐서 app.js로 만들어 주는것
  },
};
