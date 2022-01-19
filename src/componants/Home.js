import React, { Component } from "react";

import Results from "./Results";
import Loading from "../media/loadingHourGlass.gif";
import "./Home.css";
import Profile from "./Profile_Body/Profile";

// Create main component to handle all functionality of version control search engine
export default class Home extends Component {
  // Constuctor for states of component
  constructor() {
    super();
    // Create state variables to store the searched username, the different accounts, the different vcs chosen, if the fetch is still loading, and if the fetch has loaded
    this.state = {
      searchedName: "",
      accounts: null,
      vcsChosen: null,
      loadingRes: false,
      isLoaded: false,
    };
    // Bind functions so that they can be passed to other components
    this.getResults = this.getResults.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.setVcs = this.setVcs.bind(this);
  }
  // Function to set which version control website we are using in our states
  setVcs(val) {
    this.setState({
      vcsChosen: parseInt(val),
    });
  }

  // Function to set all states to default and call another function to search across all three version control websites to retrieve the results
  eventHandler(e) {
    e.preventDefault();
    this.setState({
      loadingRes: true,
      accounts: null,
      isLoaded: false,
      vcsChosen: null,
    });
    // Once all states are set to default we will call the function to use an API request to retrieve information of user
    this.getResults();
  }
  // Function to use fetch on an API request to retrieve a json object of the searched user across three version control platforms
  getResults() {
    fetch("/get-user/" + this.state.searchedName)
      .then((res) => res.json())
      .then((response) => {
        // We store the json object and then set the states variables with the corresponding values
        this.setState({
          accounts: response,
          isLoaded: true,
          loadingRes: true,
        });
      })
      // If there are any errors, catch block will log it to the console
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    // Use conditional rendering to display default search bar with instructions if page has not loaded
    if (this.state.isLoaded === false) {
      return (
        <div className="home">
          {/*Search bar that assigns searched user name on btn click */}
          <div className="search-div">
            <form
              className="search-form"
              onSubmit={(e) => this.eventHandler(e)}
            >
              <input
                onChange={(e) =>
                  this.setState({ searchedName: e.target.value })
                }
                required
                type="text"
                placeholder="Search username..."
                name="search"
              />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          {/*Check if the page is still loading the results from API and display a loading icon if it still loading */}
          <div>
            {this.state.loadingRes === true ? (
              <img alt="loading-gif" className="loadingGif" src={Loading}></img>
            ) : null}
          </div>
          {/* Shows the instructions page at this point*/}
          <Profile
            userName={this.state.searchedName}
            accounts={this.state.accounts}
            vcsChosen={this.state.vcsChosen}
          />
        </div>
      );
    } else {
      return (
        <div className="home">
          {/* Search bar at the top */}
          <div className="search-div">
            <form
              className="search-form"
              onSubmit={(e) => this.eventHandler(e)}
            >
              <input
                onChange={(e) =>
                  this.setState({ searchedName: e.target.value })
                }
                required
                type="text"
                placeholder="Search username..."
                name="search"
              />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          {/* Shows the search results*/}
          <Results
            setVcsFunction={this.setVcs}
            loadingRes={this.state.loadingRes}
            accounts={this.state.accounts}
            vcsChosen={this.state.vcsChosen}
          />
          {/* Shows the users profile (only if the user has clicked on a provider from the results) */}
          <Profile
            userName={this.state.searchedName}
            accounts={this.state.accounts}
            vcsChosen={this.state.vcsChosen}
          />
        </div>
      );
    }
  }
}
