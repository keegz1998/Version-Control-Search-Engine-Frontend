import React, { Component } from "react";
import Repos from "./Repos";
import Loading from "../../media/loadingHourGlass.gif";

export default class BitbucketProfile extends Component {
  // Constuctor for states of component
  constructor(props) {
    super(props);
    this.state = {
      repos: null,
      isLoaded: false,
    };
  }

  // Use fetch API to retrieve the repositories of bitbucket when the component is mounted to the document
  componentDidMount() {
    fetch(
      "/user/bitbucket/repo/" + this.props.accounts[this.props.vcsChosen].uuid
    )
      .then((res) => res.json())
      .then((response) => {
        // Change states to show that the repository json object has loaded
        this.setState({
          repos: response,
          isLoaded: true,
        });
      })
      // Catch block to log error to console
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // Deconstruct the props passed down
    const { accounts, vcsChosen } = this.props;
    // Display user profile information whilst the rest of the webpage is being loaded
    if (!this.state.isLoaded) {
      return (
        <div>
          <div className="top-container">
            <div className="row">
              {/* Profile picture*/}
              <div className="pro-pic-div col-4">
                <img
                  alt="profile-avatar"
                  className="profile-picture"
                  src={accounts[vcsChosen].links.avatar.href}
                ></img>
              </div>
              {/* Side info*/}
              <div className="side-info col-8">
                <p>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].nickname}
                </p>
                <p>
                  <i className="fa fa-address-card" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].display_name}
                </p>
                <p>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>&emsp;
                  {accounts[vcsChosen].created_on.substr(0, 10)}
                </p>
                <a href={accounts[vcsChosen].links.html.href} target="blank">
                  <button>Go to Bitbucket</button>
                </a>
              </div>
            </div>
          </div>
          <hr></hr>
          {/* Repositories */}
          <div className="loading-div">
            <h2>Loading Recent Repos...</h2>
            <img alt="loading-gif" className="loadingGif" src={Loading}></img>
          </div>
        </div>
      );
      // Display list of all repositories once loaded
    } else {
      return (
        <div>
          {/* User information  */}
          <div className="top-container">
            <div className="row">
              {/* Profile picture  */}
              <div className="pro-pic-div col-4">
                <img
                  alt="profile-avatar"
                  className="profile-picture"
                  src={accounts[vcsChosen].links.avatar.href}
                ></img>
              </div>
              {/* Side info  */}
              <div className="side-info col-8">
                <p>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].nickname}
                </p>
                <p>
                  <i className="fa fa-address-card" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].display_name}
                </p>
                <p>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>&emsp;
                  {accounts[vcsChosen].created_on.substr(0, 10)}
                </p>
                <a href={accounts[vcsChosen].links.html.href} target="blank">
                  <button>Go to Bitbucket</button>
                </a>
              </div>
            </div>
          </div>
          <hr></hr>
          {/* Repositories*/}
          <div>
            <h3>Repositories</h3>
          </div>
          <div>
            <Repos repos={this.state.repos} />
          </div>
        </div>
      );
    }
  }
}
