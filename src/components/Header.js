import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleChange(e) {
    this.props.handleQuery(e);
    this.setState({ searchValue: e.target.value });
  }

  handleFetch(e) {
    this.props.handleFetchBtn.call(this);
    this.setState({ searchValue: "" });
    if (e.key === "Enter") {
      console.log("Hello");
    }
  }
  handleInput(e) {
    this.props.handleQuery(e);
    this.props.handleFetchRecomend.call(this);
    this.setState({ searchValue: e.target.value }, () => console.log(this.state));
    // this.forceUpdate.call(this)
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  keyHandler(e) {
    if (e.key === "Enter") {
      console.log("Hello");
      this.props.handleFetchBtn.call(this);
      this.setState({ searchValue: "" });
    }
  }

  render() {
    return (
      <div id="header">
        <h2 onClick={this.props.funkcija}>BitShow</h2>
        <div className="inner-wrapper">
          <input
            type="text"
            onInput={this.handleInput.bind(this)}
            value={this.state.searchValue}
            onKeyUp={this.keyHandler.bind(this)}
            placeholder="Search shows..."
          ></input>
          <button onClick={this.handleFetch.bind(this)} className="search-button">
            Get Data
          </button>
          <div className="containerRecomend">
            {this.props.movies &&
              this.state.searchValue.length > 0 &&
              this.props.movies.map((element, index) => (
                <p key={index} onClick={() => this.props.funkcija2(element.show.id)}>
                  {element.show.name}
                </p>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
