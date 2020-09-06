import React, {useEffect, useState, useContext} from 'react';

import '../styles/bulma-repos-admin.css'
import '../styles/globals.css'
import SiteLayout from '../components/SiteLayout';
import { UserContext, withUserContext } from '../context/UserContextProvider';

function MyApp({ Component, pageProps }) {

    const [state, dispatch] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!state || !state.user || !state.token) {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (user && token) {
                dispatch({ type: 'SET_SESSION', payload: { user: JSON.parse(user), token }});
            }
        }
        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <SiteLayout>
            <Component {...pageProps} />
        </SiteLayout>
    );
}

export default withUserContext(MyApp);
