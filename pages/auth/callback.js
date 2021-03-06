import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as axios from 'axios';
import {UserContext} from '../../context/UserContextProvider';

export async function getServerSideProps({ query }) {

    let error = false;
    let access_token = null;

    try {
        const githubAuthCode =  query.code;
        const githubClientId =  process.env.GITHUB_CLIENT_ID;
        const githubClientSecret =  process.env.GITHUB_CLIENT_SECRET;

        const authURL = 'https://github.com/login/oauth/access_token';
        const headers = { 'Accept': 'application/json' };
        const data = {
            client_id: githubClientId,
            client_secret: githubClientSecret,
            code: githubAuthCode
        };

        const response = await axios.post(authURL, data, { headers });
        if (response.data && response.data.access_token) {
            access_token = response.data.access_token;
        } else {
            error = true;
        }
    } catch (e) {
        error = true;
        console.log(e.toJSON ? e.toJSON() : e);
    }

    return {
        props: {
            error,
            access_token
        }
    }
}

const Callback = ({ error, access_token }) => {

    const [state, dispatch] = useContext(UserContext);
    const [callbackError, setCallbackError] = useState(error);
    const router = useRouter();

    useEffect(() => {

        if (!callbackError && access_token) {

            const headers = { 'Authorization': `token ${access_token}` };
            axios.get('https://api.github.com/user', { headers }).then((res) => {
                const user = {
                    id: res.data.id,
                    avatar: res.data.avatar_url,
                    name: res.data.name,
                    email: res.data.email,
                    url: res.data.url
                };

                dispatch({type: 'SET_SESSION', payload: { user, token: access_token }});
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', access_token);
                setTimeout(() => router.replace('/'), 2000);
            }).catch(err => {
                setCallbackError(true);
                console.log(err);
            });
        }

    }, []);

    if (callbackError) {
        return (
            <>
                <p>Something went wrong, try again!</p>
                <Link href="/" passHref>
                    <a className="button is-link">
                        Back
                    </a>
                </Link>
            </>
        );
    }

    return (
        <div className="columns">
            <div className="column has-text-centered">
                <p>Loading...</p>
            </div>
        </div>
    )
};

export default Callback;
