// import React, { Component } from 'react';
const React = require("react");
const { useState, useRef } = React;

const WordRelayHooks = () => {
  const [word, setWord] = useState("리액트훅스");
  const [value, setvalue] = useState("");
  const [result, setResult] = useState("");
  const onRefInput = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setvalue("");
      onRefInput.current.focus();
    } else {
      setResult("땡");
      setvalue("");
      onRefInput.current.focus();
    }
  };

  const onChangeInput = e => {
    setvalue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={onRefInput} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

// export default WordRelayClass;
module.exports = WordRelayHooks;
