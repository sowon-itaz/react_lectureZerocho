import React, { memo } from "react";

//Hooks아니고 함수 컴포넌트이다. Hooks는 useState등을 사용하는 것을 말함
//당첨숫자마다 색깔지정
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }

  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
