import styled from 'styled-components';

/**
 * Styles based on this post:
 * https://adrianroselli.com/2020/01/fixed-table-headers.html
 */
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
