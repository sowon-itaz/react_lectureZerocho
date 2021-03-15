import React, { Component } from "react";
import Ball from "./Ball";

//로또당첨숫자 미리 뽑는 함수
function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeouts = [];

  //당첨숫자 출력하는 함수
  runTimeouts = () => {
    console.log("runTimeouts");
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]], //당첨숫자를 넣어주기 push하면 안되고 prevState사용해야함
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  //render 실행 후 실행됨, 리랜더링일땐 실행되지않음
  componentDidMount() {
    console.log("didMount");
    this.runTimeouts();
    console.log("didMount 로또 숫자를 생성합니다.");
  }

  //리랜더링 후 실행 -> setState시 항상 실행됨 따라서 조건문을 걸어서 실행시켜야함
  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    // 조건 : redo버튼을 누르면 length가 초기화되기때문에
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log("didUpdate 로또 숫자를 생성합니다.");
    }
  }

  // 컴포넌트 제거되기 직전 실행 -> didMount를 정리하는 역할
  componentWillUnmount() {
    this.timeouts.forEach(v => {
      clearTimeout(v);
    });
  }

  // 한번 더 뽑는 함수
  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default LottoClass;
