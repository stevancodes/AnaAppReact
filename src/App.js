import React from "react";
import HomePage from "./pages/homepage";
import SinglePage from "./pages/singlepage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.konstanta = 0;
    this.state = {
      counter: 0,
      onHomePage: true,
    };
  }

  increaseCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  povecajKonstantu() {
    this.konstanta = this.konstanta + 1;
    console.log(this.konstanta);
    console.log(this);
  }

  changePage() {
    this.setState({
      onHomePage: !this.state.onHomePage,
    });
  }
  render() {
    return (
      <div>
        <h1>Helloo From React</h1>
        <div>{this.state.counter}</div>
        <button onClick={() => this.increaseCounter()}>Povecaj counter</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2>{this.konstanta}</h2>
        <button onClick={this.povecajKonstantu.bind(this)}>POVECAJ</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={this.changePage.bind(this)}>Promijeni stranicu</button>
        {this.state.onHomePage ? <HomePage /> : <SinglePage />}
      </div>
    );
  }
}

export default App;
