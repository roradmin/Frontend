import React from "react";
import styled from "styled-components";
import { StyledButton } from '../Forms/StyledButton';

const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
  className
}) => {
    const PagePlayer = () => (
        <div className={'PagePlayer ' + className}>
         <StyledButton onClick={()=> gotoPage(0)} title={'<<<'} disabled={pageIndex != 1}/>
         <StyledButton onClick={()=> previousPage()} title={'<'} disabled={!canPreviousPage}/>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
         <StyledButton onClick={()=> nextPage()} title={'>'} disabled={!canNextPage}/>
         <StyledButton onClick={()=> gotoPage(pageCount - 1)} title={'>>>'} disabled={!canNextPage}/>
        </div>
     );
return (
  <StyledPagination>
    <PagePlayer />
    <span>
      Go to page:{" "}
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        style={{ width: "100px" }}
      />
    </span>{" "}
    <select
      value={pageSize}
      onChange={e => {
        setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map(pageSize => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  </StyledPagination>
);
}

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .PagePlayer{
        display: flex;
        align-items: center;
    }
        button{
            border-radius: 50%;
            background-color: #0a2835;
            width: 40px;
            height: 40px;
            &:disabled{
                background-color:#ccc;
                cursor: no-drop;
            }
        }
`;
export default Pagination;
