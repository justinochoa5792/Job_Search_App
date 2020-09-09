import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    userSearch: "",
    jobs: [],
  };

  handleChange(e) {
    this.setState({
      userSearch: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?search=${this.state.userSearch}`
    ).then((response) => {
      console.log(response);
      this.setState({ jobs: response.data });
    }, this.renderJobs);
  }
  renderJobs() {
    return this.state.jobs.map((job) => {
      return (
        <ul>
          <h4>Company Name</h4> <li>{job.company}</li>
          <h4>Company Website</h4>
          <a href={job.company_url}>{job.company_url}</a>
          <h4>Job Title</h4> <li>{job.title}</li>
          <li>{job.type}</li>
          <h4>Company Location</h4>
          <li>{job.location}</li>
        </ul>
      );
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Search For Jobs</h1>
        <form
          onSubmit={(e) => {
            this.onSubmit(e);
          }}
        >
          <input type="text" onChange={(e) => this.handleChange(e)} />
        </form>
        {this.renderJobs()}
      </div>
    );
  }
}

export default App;
