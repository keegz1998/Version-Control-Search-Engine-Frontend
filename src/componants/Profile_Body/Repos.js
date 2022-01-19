import React from "react";
import RepoCommits from "./RepoCommits";
import "./Repos.css";

export default function Repos(props) {
  // Deconstruct the prop passed down
  const { repos } = props;

  //  Map through the array of repositories and create a section for each repository
  let repo = repos.map((item, index) => {
    return (
      <div key={index}>
        <div className="repo-block">
          {/* Repo details */}
          <div className="repo-heading">
            {/* Display the repository description and if there is no description available display message */}
            <p>
              {item.repoName} <br></br>{" "}
              <span className="repo-desc">
                {item.repoDesc === undefined ? "No Description" : item.repoDesc}
              </span>
            </p>
            <div className="date-created-div">
              <p>Created - {item.createdOn}</p>
            </div>
          </div>
          {/* Commits */}
          <div className="repo-commit-heading">
            <p>Commit History</p>
          </div>
          {/* Commit messages */}
          <div className="repo-commits">
            <RepoCommits commitMsg={item.commitMsg} />
          </div>
        </div>
      </div>
    );
  });

  return <div>{repo}</div>;
}
