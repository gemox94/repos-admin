import React, { useContext } from 'react';

import { UserContext } from '../context/UserContextProvider';
import Link from 'next/link';
import Content from '../styled/Content';

const SiteLayout = ({ children }) => {

    const [{ user }] = useContext(UserContext);
    const avatarUrl = user && user.avatar ? user.avatar : 'https://avatars.dicebear.com/api/bottts/github.svg';

    return(
        <>
            <div className="container py-5">

                <div className="columns">
                    <div className="column is-3 has-text-centered">
                        <img src={avatarUrl} alt="avatar" width="250px" style={{ borderRadius: '50%' }}/>
                        {user && user.name && <h4 className="title is-4">{user.name}</h4>}
                    </div>
                    <div className="column is-9">
                        <div className="tabs">
                            <ul>
                                <li className={ !user ? 'is-active' : ''}>
                                    <a>Home</a>
                                </li>
                                {user && (
                                    <>
                                        <li>
                                            <a>Private repos</a>
                                        </li>
                                        <li>
                                            <a>Public repos</a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <Content>
                            { children }
                        </Content>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SiteLayout;
