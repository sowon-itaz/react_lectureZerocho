const React = require("react");
const { Component } = React;

class WordRelay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "리액트",
            value: "",
            result: "",
        };
    };

  onSubmitForm = e => {
    e.preventDefault();
      if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
          this.setState({
              result: "딩동댕",
              word: value,
              value: "",
          });
      this.input.focus();
    } else {
          this.setState({
            result: "땡",
            word: "",
            value: "",
          });
          this.input.focus();
    }
  };

  onChangeInput = e => {
      this.setState({
          value: e.target.value,
    })
  };

    inputEl = c => {
        this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputEl}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
};

module.exports = WordRelay;
