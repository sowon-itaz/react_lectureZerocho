import React, { useCallback, memo } from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TictactoeHooks";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log("td rendered");

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    //이미 클릭한 칸은 클릭못하게 막기
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
