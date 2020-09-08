import React from 'react';
import { withRepos } from '../components/withRepos';
import FixedHeaderTable from '../styled/FixedHeaderTable';

const PrivateRepos = ({ repos }) => {

    console.log(repos);

    return repos && repos.length > 0 && (
        <>
            <FixedHeaderTable className="table is-fullwidth">
                <thead>
                <tr>
                    <th className="has-background-link has-text-white" style={{ width: '20%' }}>Repo Name</th>
                    <th className="has-background-link has-text-white" style={{ width: '50%' }}>Description</th>
                    <th className="has-background-link has-text-white" style={{ width: '30%' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {repos.map(repo => (
                    <tr key={repo.id}>
                        <td>{repo.name}</td>
                        <td>{repo.description || ''}</td>
                        <td className="has-text-centered">
                            <button className="button is-primary mr-5">
                                Archive
                            </button>
                            <button className="button is-danger">
                                Delete repo
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </FixedHeaderTable>
        </>
    );
};

export default withRepos(PrivateRepos, 'private');
