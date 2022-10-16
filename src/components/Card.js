import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {!this.props.btnClicked && (
          <div className="card" onClick={() => this.props.funkcija(this.props?.movie2?.id)}>
            <img src={this.props?.movie2?.image?.original} alt="slika"></img>
            <div>{this.props?.movie2?.name}</div>
            <p className="rating">
              {this.props.movie2?.rating?.average ? this.props.movie2?.rating?.average : "Not defined"}
            </p>
          </div>
        )}
        {this.props.btnClicked && (
          <div className="card" onClick={() => this.props.funkcija(this.props?.movie?.show?.id)}>
            <img src={this.props?.movie?.show?.image?.original} alt="slika"></img>
            <div>{this.props?.movie?.show?.name}</div>
            <p className="rating">
              {this.props?.movie?.show?.rating?.average ? this.props?.movie?.show?.rating?.average : " Not defined"}
            </p>
          </div>
        )}
      </>
    );
  }
}

export default Card;
