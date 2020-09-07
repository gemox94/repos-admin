import React from 'react';
import { withRepos } from '../components/withRepos';

const PrivateRepos = ({ repos }) => {

    return (
        <div className="columns">
            <div className="column">
                {repos && repos.length > 0 && (
                    <p>Total Private Repos: {repos.length}</p>
                )}
            </div>
        </div>
    );
};

export default withRepos(PrivateRepos, 'private');
