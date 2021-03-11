// import React, { Component } from "react";
const React = require("react");
const { Component } = React;

function getNumbers() {
  console.log("겟넘버");
}

class NumberBaseballClass1 extends Component {
  state = {
    result: "겟넘버",
    value: "",
    // answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = e => {
    e.preventDefault();
  };
  onChangeInput = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>

        {/* <div>시도: {this.state.tries.length}</div> */}
        <ul>
          <li>반복</li>
        </ul>
      </>
    );
  }
}

// export default NumberBaseballClass1;
module.exports = NumberBaseballClass1;
