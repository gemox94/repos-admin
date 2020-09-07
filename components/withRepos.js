import React, { useState, useEffect, useContext } from 'react';
import {useRouter} from 'next/router';

import * as axios from 'axios';
import { UserContext } from '../context/UserContextProvider';

const getRepos = (token, visibility) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.github.com/user/repos?visibility=${visibility}`;
        const headers = { 'Authorization': `token ${token}`};
        axios.get(url, { headers })
            .then(res => resolve(res.data))
            .catch(err => reject(err.toJSON ? err.toJSON() : err));
    });
};

export const withRepos = (Component, visibility) => {
    return (props) => {

        const router = useRouter();
        const [repos, setRepos] = useState([]);
        const [{ token }] = useContext(UserContext);

        if (!token) router.push('/');

        useEffect(() => {
            getRepos(token, visibility)
                .then(res => setRepos(res))
                .catch(err => console.log(err));
        }, []);

        return <Component repos={repos} {...props}/>
    };
};
