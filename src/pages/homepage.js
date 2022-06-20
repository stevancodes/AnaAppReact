import React, { Component } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./homepage.css";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: "",
      data2: [],
      btnClicked: false,
      data3: []
    };
  }
  fetchDataBtn() {
    fetch(` https://api.tvmaze.com/search/shows?q=${this.state.search}`)
      .then((res) => res.json())
      .then((response) =>
        this.setState(
          {
            data2: response
              .sort((a, b) => b.show.rating.average - a.show.rating.average)
              .filter((e, i) => i < 50),
          },
          () => console.log(this.state)
        )
      ).then(() => this.setState({ btnClicked: true }))
  }

  fetchDataInitial() {
    fetch(` https://api.tvmaze.com/shows`)
      .then((res) => res.json())
      .then((response) =>
        this.setState(
          {
            data: response.filter((e, i) => i < 50),
          },
          () => console.log(this.state)
        )
      );
  }
  componentDidMount() {
    // ovo nam je da pri ucitavanju Renderovanju da se vec pritom Fecuju podaci
    this.fetchDataInitial.call(this);
  }

  handleQuery(event) {
    this.setState({
      search: event.target.value,
    });

  }
  handleFetchBtn() {
    this.fetchDataBtn.call(this)
  }

  fetchDataRecomend() {
    fetch(` https://api.tvmaze.com/search/shows?q=${this.state.search}`)
      .then((res) => res.json())
      .then((response) =>
        this.setState(
          {
            data3: response
              .sort((a, b) => b.show.rating.average - a.show.rating.average)
              .filter((e, i) => i < 50),
          },
          () => console.log(this.state)
        )
      )
  }
  handleFetchRecomend() {
    this.fetchDataRecomend.call(this)
  }


  render() {
    return (
      <div id="homepage">
        <Header handleQuery={this.handleQuery.bind(this)} handleFetchBtn={this.handleFetchBtn.bind(this)} handleFetchRecomend={this.handleFetchRecomend.bind(this)} movies={this.state.data3} funkcija2={this.props.funkcionalnostSinglePage} btnClicked={this.state.btnClicked} />
        <h1 id="popular">Popular Shows</h1>
        <div className="container"><>
          {this.state.btnClicked &&
            this.state.data2.map((element, i, n) => {
              return <Card key={i} movie={element} className="card" btnClicked={this.state.btnClicked} funkcija={this.props.funkcionalnostSinglePage} />;
            })}
          {!this.state.btnClicked && this.state.data.map((element, i, n) => {
            return <Card key={i} movie2={element} className="card" btnClicked={this.state.btnClicked} funkcija={this.props.funkcionalnostSinglePage} />;
          })}
        </>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
