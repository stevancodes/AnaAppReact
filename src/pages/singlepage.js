import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./singlepage.css"

class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClicked: false,
      search: ""
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
      <div id="singlepage">
        <Header funkcija={this.props.backToHome.bind(this)} handleQuery={this.handleQuery.bind(this)} handleFetchBtn={this.handleFetchBtn.bind(this)} handleFetchRecomend={this.handleFetchRecomend.bind(this)} movies={this.state.data3} funkcija2={this.props.funkcionalnostSinglePage} btnClicked={this.state.btnClicked} />
        <div className="container-singlepage">
          <h1>{this.props.movie.name}</h1>
          <div className="wrapper">
            <div className="left-wrapper">
              <img src={this.props?.movie.image.original} alt="slika"></img>
            </div>
            <div className="right-wrapper">
              <h2 className="seasons">Seasons ({this.props.seasons.length})</h2>
              <div className="seasonDate">{this.props.seasons.map((element, index) => <p key={index}>{`${element.premiereDate} - ${element.endDate}`}</p>)}</div>
              <h2 className="cast">Cast</h2>
              <div className="castWrapper">{this.props.cast.map((element, index) => <p key={index}>{element.person.name}</p>).filter((e, i) => i < 15)}</div>
            </div>
          </div>
          <h2>Show Details</h2>
          <div className="summary">
            <p>{(this.props.movie.summary).replaceAll(/(<([^>]+)>)/ig, "")}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SinglePage;
