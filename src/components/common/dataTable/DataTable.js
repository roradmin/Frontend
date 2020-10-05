import React from 'react';
import {useTable, useFilters, useGlobalFilter,usePagination} from 'react-table';
import StyledTbl from './StyledTbl';
import Pagination from './Pagination';

  const DataTable = ({data,columns,onRowClicked = null}) => {
    const {
        // table props
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        // pagination props
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({columns,data},usePagination);

    return (
        <>
            <StyledTbl 
                getTableProps = {getTableProps}
                getTableBodyProps = {getTableBodyProps}
                headerGroups = {headerGroups}
                rows = {rows}
                page = {page}
                prepareRow = {prepareRow}
                onRowClicked={onRowClicked}
            />
            <Pagination
                className = "pagination"
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                setPageSize={setPageSize}
                pageIndex={pageIndex}
                pageSize={pageSize}
            />
        </>
    )
  }
  export default DataTable;