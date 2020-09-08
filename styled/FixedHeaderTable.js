import styled from 'styled-components';

export default styled.table`
    th, td {
        vertical-align: middle;
    }
    
    th {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 2;
        border: none;
    }
`;
