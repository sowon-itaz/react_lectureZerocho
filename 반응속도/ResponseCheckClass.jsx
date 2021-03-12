import React, { Component } from "react";

class ResponseCheckClass extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 보이면 바로 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //랜덤으로 2 ~ 3초 후에 화면을 초록색으로 변화시킴
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "성급 노노 초록색이 된 후에 클릭하세요",
      });
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          {" "}
          평균시간 : {result.reduce((a, c) => a + c) / result.length} ms{" "}
        </div>
        <button onClick={this.onReset}>다시시작</button>
      </>
    );
  };

    onReset = () => {
        this.setState({
            result:[],
        })
     }

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {/* 삼항연산자 */}
        {/* {this.state.result.length === 0 ? null : (
          <div>
            {" "}
            평균시간 :{" "}
            {this.state.result.reduce((a, c) => a + c) /
              this.state.result.length}{" "}
            ms
          </div>
        )} */}
        {/* 보호연산자 */}
        {/* {this.state.result.length !== 0 && (
          <div>
            평균시간 :
            {this.state.result.reduce((a, c) => a + c) /
              this.state.result.length}
            ms
          </div>
        )} */}
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheckClass;
