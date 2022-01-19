import React from "react";

export default function Results(props) {
  // Deconstruct the props passed down and create an array to represent the different version control providers
  const { accounts, setVcsFunction, vcsChosen } = props;
  const resSites = ["GitHub", "GitLab", "BitBucket"];
  let counter = -1;

  // Map through the accounts array accesed from props to display the results for each VCS
  let results = accounts.map((item, index) => {
    counter++;
    // Decide whether to appply styling to a block to notify the user it is selected
    let assignedClass =
      counter === vcsChosen ? "result-block active-block" : "result-block";
    let resultItem;
    // Use if statements to display the results for each VCS
    if (resSites[counter] === "GitHub") {
      resultItem = (
        <div key={index} className={assignedClass}>
          <p className="result-title">{resSites[counter]}</p>
          {/*Check if the login variable is null or not and then display the results of the user based on its value*/
          /* Add onlick function to send the id of the VCS to inform program what VCS profile to load */}
          {item.login === undefined ? (
            <p>User not found</p>
          ) : (
            <p
              className="response-name"
              id={counter}
              onClick={(e) => setVcsFunction(e.target.id)}
            >
              {item.login}
            </p>
          )}
        </div>
      );
    } else if (resSites[counter] === "GitLab") {
      resultItem = (
        <div key={index} className={assignedClass}>
          <p className="result-title">{resSites[counter]}</p>
          {/*Check if the login variable is null or not and then display the results of the user based on its value*/
          /* Add onlick function to send the id of the VCS to inform program what VCS profile to load */}
          {item.length === 0 ? (
            <p>User not found</p>
          ) : (
            <p
              className="response-name"
              id={counter}
              onClick={(e) => setVcsFunction(e.target.id)}
            >
              {item.username}
            </p>
          )}
        </div>
      );
    } else if (resSites[counter] === "BitBucket") {
      resultItem = (
        <div key={index} className={assignedClass}>
          <p className="result-title">{resSites[counter]}</p>
          {/*Check if the login variable is null or not and then display the results of the user based on its value*/
          /* Add onlick function to send the id of the VCS to inform program what VCS profile to load */}
          {item.type === "Error" ? (
            <p>{item.reason}</p>
          ) : (
            <p
              className="response-name"
              id={counter}
              onClick={(e) => setVcsFunction(e.target.id)}
            >
              {item.nickname}
            </p>
          )}
        </div>
      );
    }
    return resultItem;
  });

  //Add eventListener to assign the block that is clicked have the active-block class
  let blocks = document.getElementsByClassName("response-name");
  for (let i = 0; i < blocks.length; i++) {
    // Add event listener to each block
    blocks[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active-block");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(
          " active-block",
          ""
        );
      }
      this.parentNode.className += " active-block";
    });
  }

  return <div id="result-row">{results}</div>;
}
