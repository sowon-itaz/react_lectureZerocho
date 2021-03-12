import React, { Component, createRef } from "react";
import Try from "./Try";
// const React = require("react");
// const { useState, useRef, Try } = React;

//this를 안쓰면 function으로 밖에 뻴 수있다. getNumbers() { } <= 안에서 쓰면 이런 느낌
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseballClass1 extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [], //배열에 값을 넣을때 불변성때문에 push를 사용하면 안된다. 리액트가 뭐가 바뀌었는지 모른다.
  };
  //getNumbers() { } <= 안에서 쓰면 이런 느낌, 
  onSubmitForm = e => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState(prevState => {
        return {
          result: "홈런!",
          tries: [...prevState.tries, { try: value, result: "홈런!" }], //기존배열을 복사한 뒤 사용하면 변경사항을 인지한다.
        };
      });
      alert("홈런! 게임을 다시 시작합니다!");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else {
      // 답 틀렸으면
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`,
        });
        alert("실패! 게임을 다시 시작합니다!");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState(prevState => {
          return {
            tries: [
              ...prevState.tries,
              { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` },
            ],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = e => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseballClass1;
// module.exports = NumberBaseballClass1;
