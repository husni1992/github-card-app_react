import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './github-card.app.css'

const Card = (props) => {
  return (
    <div className="card" style={{ width: "20rem", margin: "10px" }}>
      <img className="user-img" src={props.avatar_url} alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">
          {props.login} <br /> {props.company}
        </p>
        <a href={'https://github.com/' + props.login} target="_blank" className="btn btn-primary">View profile</a>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={card.login} {...card} />)}
    </div>
  );
};

class Form extends React.Component {
  state = { userName: '' };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({ userName: '' })
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: '0.5em' }}>
        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control"
              value={this.state.userName}
              onChange={(event) => { this.setState({ userName: event.target.value }) }}
              type="text"
              placeholder="Github username" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success" type="submit">Add card</button>
          </div>
        </div>
      </form>
    );
  };
};

class GithubCardsApp extends React.Component {

  state = {
    cards: []
  };

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  };
};

export default GithubCardsApp;
