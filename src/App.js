import React, { Component } from 'react';
import Fetch from './utils/Fetch';
import CommitActivityContainer from './containers/CommitActivityContainer';
import CodeFrequencyContainer from './containers/CodeFrequencyContainer';
import PunchCardContainer from './containers/PunchCardContainer';
import './App.css';

const SearchBox = props => (
  <form onSubmit={props.onSubmit} style={{marginTop:'1em'}}>
    <label>
      <span>Owner: </span>
      <input name='owner' type='text' value={props.ownerValue} onChange={props.onChange}/>
    </label>
    <label>
      <span> Repo: </span>
      <input name='repo' type='text' value={props.repoValue} onChange={props.onChange}/>
    </label>
    <button>Search</button>
  </form>
)

class App extends Component {
  state = {
    owner: 'facebook',
    repo: 'react',
    validated: true
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const owner = this.state.owner;
    const repo = this.state.repo;

    if (!(owner && repo)){
      console.log('incomplete owner or repo name')
      return;
    }

    Fetch.getUserRepo(owner, repo)
    .then(res => {
      if (res.status === 200)
        this.setState({validated : true})
    })
    .catch(err => console.log(err.message))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
      validated: false
    })
  }

  render() {
    Fetch.getUserRepo_gql('facebook', 'relay')
    .then(res => console.log(res.data));
    return (
      <div className="App">
        <div className="App-header">
          <h2>GitHub Repo Stats</h2>
        </div>
        <div className="SearchBox">
          <SearchBox
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            ownerValue={this.state.owner}
            repoValue={this.state.repo}
          />
        </div>
        {this.state.validated ?
        <div className="Charts">
          <h2>Commit Activity</h2>
          <CommitActivityContainer {...this.state} />
          <h2>Code Frequency</h2>
          <CodeFrequencyContainer {...this.state} />
          <h2>Punch Card</h2>
          <PunchCardContainer {...this.state} />
        </div> :
        null
        }
      </div>
    );
  }
}

export default App;
