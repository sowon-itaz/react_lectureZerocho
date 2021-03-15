import React, { useEffect, useRef, useState } from "react";

const rspCoords = {
  //좌표
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RPSHooks = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  //useEffect는 componentDidMount, componentDidUpdate, componentWillUnmount에 대해 1대1대응은 아니지만 셋의 역할을 하나로 합쳤다고 할수있다.
  //componentDidMount, componentDidUpdate역할
  useEffect(() => {
    console.log("다시 실행");
    interval.current = setInterval(changeHand, 100); //0.1초
    return () => {
      //componentWillUnmount역할
      console.log("종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]); //배열에 다시 실행 할 값을 넣어줄 것 componentDidUpdate역할

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  //onClick()를 간략하게 만들기 위해 ()=> 를 매개변수 다음에 추가해준다 => 고차함수
  const onClickBtn = choice => () => {
    //점수계산
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore(prevScore => prevScore + 1);
    } else {
      setResult("졌습니다!");
      setScore(prevScore => prevScore - 1);
    }
    //setTimeout()과 clearInterval()멈추고 점수 계산한 뒤 다시 setInterval()시작
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RPSHooks;
