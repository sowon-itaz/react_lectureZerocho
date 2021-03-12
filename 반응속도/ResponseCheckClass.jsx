import React, { Component } from "react";

class ResponseCheckClass extends Component {
  state = {
    state: "wating",
    message: "클릭해서 시작하세요",
    result: [],
  };

  onClickScreen = () => {
    console.log("여기");
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
        {/* {this.renderAverage()} */}
      </>
    );
  }
}

export default ResponseCheckClass;
