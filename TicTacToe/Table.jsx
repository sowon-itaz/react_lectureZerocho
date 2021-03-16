import React from "react";
import Tr from "./Tr";

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((
            tr,
            i //i가 몇번째줄인지 나타냄
          ) => (
            <Tr
              key={i}
              dispatch={dispatch} // TictactoeHooks 컴포넌트의 dispatch를 Tr 컴포넌트로 넘겨줌
              rowIndex={i}
              rowData={tableData[i]}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
