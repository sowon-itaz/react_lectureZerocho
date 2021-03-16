import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1], //초기화는 없는 칸으로 설정
};

//action은 기본적으로 대문자+스네이크표기법 사용
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state, //얕은 복사. 새로운 state를 만들어서 바뀐 부분만 복사해줌
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; //객체를 얕은 복사로 불변성을 지킬 수 있음.
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결가능
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell], //최근 클릭한 셀 기억하기
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TictactoeHooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // useReducer : state갯수를 줄여주는 역할. Td 넘겨줄 데이터가 많기 때문에 useReducer를 이용하여 한번에 넘겨준다
  //   const [winner, setWinner] = useState("");
  //   const [turn, setTurn] = useState("O");
  //   const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);

  //일치하는 줄이 있는 지 확인하기
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    //가로줄 검사
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    //세로줄검사
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    //왼쪽 대각선검사
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    //오른쪽 대각선검사
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      //승리
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      //무승부검사
      let all = true; //모든 칸이 다 차있는 경우 무승부
      tableData.forEach(row => {
        row.forEach(cell => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);
  return (
    <>
      <Table
        onClick={onClickTable}
        tableData={tableData}
        dispatch={dispatch} //dispatch를 Table컴포넌트로 넘겨줌
      />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TictactoeHooks;
