//클래스

import React, { PureComponent } from "react";

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

//훅스 => PureComponent와 shouldComponentUpdate가 없다. 그대신 memo를 사용함
/*
import React, { memo } from "react";
 
 //구조분해
const Try = memo(({ tryInfo }) => { 
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});
*/

export default Try;
