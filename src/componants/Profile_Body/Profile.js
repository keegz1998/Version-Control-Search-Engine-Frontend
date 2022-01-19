import React from 'react'

import GithubProfile from './GithubProfile'
import GitLabProfile from './GitLabProfile'
import BitbucketProfile from './BitbucketProfile'
import './Profile.css'


export default function Profile( props ) {
     // Deconstruct the props passed down
    const { accounts, vcsChosen} = props

 
    // Switch case used to display different templates for the 3 different VCS's
    switch (vcsChosen) {
        case 0:
            // Github template
            return (
                <div className="profile-div">
                    <GithubProfile accounts={accounts} vcsChosen={vcsChosen}/>
                </div>
            )
        case 1:
            //  Gitlab template
            return (
                <div className="profile-div">
                    <GitLabProfile accounts={accounts} vcsChosen={vcsChosen}/>
                </div>
            )
        case 2:
            // Bitbucket Templete
            return (
                <div className="profile-div">
                    <BitbucketProfile accounts={accounts} vcsChosen={vcsChosen}/>
                </div>
            )
        default:
            // Return landing page
            return (
                <div>
                    
                </div>
            )

    }
}
