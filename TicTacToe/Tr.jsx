import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log("tr rendered");
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            key={i}
            dispatch={dispatch} // TictactoeHooks 컴포넌트의 dispatch를 Td 컴포넌트로 넘겨줌
            rowIndex={rowIndex} //몇번째칸인지
            cellIndex={i}
            cellData={rowData[i]}
          >
            {""}
          </Td>
        ))}
    </tr>
  );
});

export default Tr;
