import React, { Component } from "react";
import HomePage from "./pages/homepage";
import SinglePage from "./pages/singlepage";
import "./movies.css"

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onHomePage: true,
      data: [],
      search: "",
      dataSinglePage: []
    };
  }

  async changeHomeState(indeks) {
    await this.setState({ id: indeks });
    this.fetchDataID.call(this)
    this.fetchSeasons.call(this)
    this.fetchCast.call(this)
    setTimeout(() => {
      this.setState({ onHomePage: false })
    }, 100)
  }

  fetchDataID() {
    fetch(`https://api.tvmaze.com/shows/${this.state.id}`)
      .then(res => res.json())
      .then(data => this.setState({ dataSinglePage: data }))
  }

  fetchSeasons() {
    fetch(`https://api.tvmaze.com/shows/${this.state.id}/seasons`)
      .then(res => res.json())
      .then(data => this.setState({ dataSeasons: data }))
  }

  fetchCast() {
    fetch(`https://api.tvmaze.com/shows/${this.state.id}/cast`)
      .then(res => res.json())
      .then(data => this.setState({ dataCast: data }))
  }

  handlePage() {
    this.setState({ onHomePage: true })
  }

  render() {
    return (
      <div>
        {this.state.onHomePage && <HomePage movies={this.state.data} funkcionalnostSinglePage={this.changeHomeState.bind(this)} />}
        {!this.state.onHomePage && <SinglePage movie={this.state.dataSinglePage} seasons={this.state.dataSeasons} cast={this.state.dataCast} backToHome={this.handlePage.bind(this)} funkcionalnostSinglePage={this.changeHomeState.bind(this)} />}
      </div>
    );
  }
}

export default Movies;
