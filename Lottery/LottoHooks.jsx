import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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

const LottoHooks = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 당첨 숫자들 lottoNumbers에 저장해두면 getWinNumbers()가 7번실행되던것이 1번으로 줄어든다=>성능최적화
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null); // 보너스 공
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    //runTimeouts() 당첨숫자를 출력하는 함수
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevBalls => [...prevBalls, winNumbers[i]]); //당첨숫자를 넣어주기 push하면 안되고 prevState사용해야함
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    // return()은 componentWillUnmount역할로 컴포넌트 제거되기 직전 실행 -> didMount를 정리하는 역할
    return () => {
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  //useEffect 여러번 실행가능
  useEffect(() => {
    console.log("useEffect 여러번 실행할 수 있음");
  }, [winNumbers]);

  //componentDidMount만 수행하고 싶다면?
  useEffect(() => {
    //ajax
  }, []); //빈배열로 놔두기

  //componentDidMount말고 componentDidUpdate만 수행하고 싶다면?
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      //ajax 처리
    }
  }, []); //배열에는 바뀌는 값입력

  // 한번 더 뽑는 함수
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    console.log("useCallback사용시 winNumbers: "); //함수 자체를 기억하기때문에 winNumbers의 값이 첫실행된 값을 가지고 있다. 따라서 input에 winNumbers를 넣어주면 winNumbers 변경값을 인지할수있다.
    setWinNumbers(getWinNumbers()); // 당첨 숫자들
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }
    , [winNumbers]); //변경 state 넣기

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
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};;

export default LottoHooks;
