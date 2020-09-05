import React, { useState, useEffect } from 'react';
import {GitHub} from 'react-feather';

export async function getStaticProps() {

    const clientId = process.env.GITHUB_CLIENT_ID;
    const scopes = 'user repo';
    let authURL = 'https://github.com/login/oauth/authorize';
    authURL+=`?client_id=${clientId}&scope=${encodeURIComponent(scopes)}`;

    return {
        props: {
            authURL
        }
    }
}

const Home = ({ authURL }) => {

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            setToken(accessToken);
        }
        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <div className="columns">
            <div className={`column ${!token ? 'has-text-centered' : ''}`}>

                {!token && (
                    <a href={authURL} className="button is-link">
                        <GitHub/>
                        <span className="ml-3">Login</span>
                    </a>
                )}

            </div>
        </div>
    );
};

export default Home;
