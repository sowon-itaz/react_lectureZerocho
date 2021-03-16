import React, { useCallback, useState, userContext } from "react";
import { TableContext } from "./Minesweeper";

const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const value = userContext(TableContext);

  const onChangeRow = useCallback(e => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback(e => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback(e => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = userCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      />
      <input
        type="number"
        placeholder="가로"
        value={row}
        onChange={onChangeCell}
      />
      <input
        type="number"
        placeholder="지뢰"
        value={row}
        onChange={onChangeMine}
      />

      <button onClick={onClickBtn}>시작</button>
    </div>
  );
};

export default Form;
