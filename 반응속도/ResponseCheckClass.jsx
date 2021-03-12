import React, { Component } from "react";

class ResponseCheckClass extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  onClickScreen = () => {
    console.log("여기");
  };

  renderAverage = () => {
    return this.state.result.length === 0 ? null : (
      <div>
        평균시간 :{" "}
        {this.state.result.reduce((a, c) => a + c) / this.state.result.length}{" "}
        ms{" "}
      </div>
    );
  };

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
