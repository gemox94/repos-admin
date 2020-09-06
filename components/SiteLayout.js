import React, { useContext } from 'react';

import { UserContext } from '../context/UserContextProvider';
import Link from 'next/link';

const SiteLayout = ({ children }) => {

    const [{ user }] = useContext(UserContext);

    return(
        <>
            <nav className="level px-5 py-3 has-background-primary">

                <div className="level-left">
                    <div className="level-item">
                        <img src="/repos-admin.png" alt="Repos Admin" width="80px" height="80px"/>
                    </div>
                    <div className="level-item">
                        <Link href="/private-repos">
                            <a className="button is-primary">Private repos</a>
                        </Link>
                    </div>
                    <div className="level-item">
                        <Link href="/public-repos">
                            <a className="button is-primary">Public repos</a>
                        </Link>
                    </div>
                </div>

                <div className="level-right">
                    <div className="level-item has-text-white">
                        <span>{(user && user.name) || ''}</span>
                    </div>
                </div>

            </nav>
            <div className="container">
                { children }
            </div>
        </>
    );
};

export default SiteLayout;
