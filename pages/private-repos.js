import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as axios from 'axios';

import {UserContext} from '../context/UserContextProvider';

const getPrivateRepos = (token) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.github.com/user/repos?type=owner';
        const headers = { 'Authorization': `token ${token}`};
        axios.get(url, { headers })
            .then(res => resolve(res.data))
            .catch(err => reject(err.toJSON ? err.toJSON() : err));
    });
};

const PrivateRepos = () => {

    const router = useRouter();
    const [{ token }] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState([]);

    if (!token) router.push('/');

    useEffect(() => {
        getPrivateRepos(token)
            .then(res => setRepos(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="columns">
            <div className="column">
                {loading && <p>Loading...</p>}

                {!loading && repos.length === 0 && (
                    <h4 className="title is-4">You don't have any private repositories yet!</h4>
                )}

                {!loading && repos.length > 0 && (
                    <p>Total Private Repos: {repos.length}</p>
                )}

            </div>
        </div>
    );
};

export default PrivateRepos;
