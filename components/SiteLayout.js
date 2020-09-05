import React from 'react';
import {GitHub} from 'react-feather';

const SiteLayout = ({ children }) => {
    return(
        <>
            <nav className="level px-5 py-3 has-background-primary">

                <div className="level-left">
                    <div className="level-item">
                        <img src="/repos-admin.png" alt="Repos Admin" width="80px" height="80px"/>
                    </div>
                </div>

                <div className="left-right">
                    <div className="level-item">
                        <GitHub />
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
