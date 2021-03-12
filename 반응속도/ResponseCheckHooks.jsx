import React, { useRef, useState } from "react";

const ResponseCheckClass = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  //값이 바뀌어도 랜더링하고 싶지않은 값들은 useRef 넣어서 사용한다. -> 성능 최적화.
  //값이 바뀌기는 하지만 화면에 영향을 미치지않을때 useRef 사용
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 보이면 바로 클릭하세요");
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //랜덤으로 2 ~ 3초 후에 화면을 초록색으로 변화시킴
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("너무 급해요! 초록색일때 클릭하세요");
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult(prevResult => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          {" "}
          평균시간 : {result.reduce((a, c) => a + c) / result.length} ms{" "}
        </div>
        <button onClick={onReset}>다시시작</button>
      </>
    );
  };

  const onReset = () => {
    setResult([]);
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
}; //end of const ResponseCheckClass

export default ResponseCheckClass;
