import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {scores: []}

  onRefresh() {
    axios.get('/api/')
      .then(response => {
        let scores = response.data.split('\n').map(team => {
          let data = team.split(' ');
          let name = data[0];
          let score = data[1];

          return {name, score};
        });

        scores = scores.slice(0, -1);
        this.setState({ scores });

      })
      .catch( error => {
        console.error(error);
      });

  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.onRefresh(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    let scores = this.state.scores
      .sort( (s1, s2) => s2.score-s1.score)
      .map( (data, key) => {
        return (
          <tr key={key}>
            <td>
              { key+1 }.
            </td>
            <td>
              { data.name }
            </td>
            <td>
              { data.score }
            </td>
          </tr>
        );
      });
    return (
      <div className="app">
        <nav className="uk-navbar-container uk-margin" data-uk-navbar>
          <div className="uk-navbar-center">
            <a className="uk-navbar-item uk-logo" href="#">Eredmények</a>
          </div>
        </nav>
        <div className="uk-container">
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Helyezés</th>
                <th>Csapat</th>
                <th>Pont</th>
              </tr>
            </thead>
            <tbody>
              {scores}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
