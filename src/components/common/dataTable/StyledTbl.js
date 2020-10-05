import React from 'react';
import styled from 'styled-components';

const StyledTable = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    onRowClicked
}) => (
    <StyledTbl>
        <table {...getTableProps()}>
        <thead>
        {
        headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map(column => <th {...column.getHeaderProps()}>{column.render('Header')}</th>)
            }
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {
        rows.map((row, i) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}  onClick = {() => onRowClicked && onRowClicked(row.original)}>
                {
                    row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                }
                </tr>
            )}
        )}
        </tbody>
    </table>
  </StyledTbl>
)

const StyledTbl = styled.div`
    padding: 1rem;
    table {
        width: 100%;
        border-spacing: 0;
        border: 1px solid black;
        //border-radius: 5px;
    thead{
        font-size: 11pt;
        background-color: #0a2835;
        color: #eee;
        font-variant-caps: all-petite-caps;
        user-select: none;
    }
    tbody{
        font-size: 9pt;
        background: #fff;
    }
    tr {

        &:last-child {
            td {
                border-bottom: 0;
            }
        }
    }
    th,td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
            border-right: 0;
        }
    }
}
`

export default StyledTable;