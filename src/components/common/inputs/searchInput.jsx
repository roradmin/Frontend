import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';
import {useDebounce} from '../../customHooks/useDebounce';
import _ from 'lodash';

const SearchInput = props => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState(props.value || '');
  const debouncedSearchTerm = useDebounce(searchTerm, props.time || 500);

  useEffect(
    () => {
      if (debouncedSearchTerm || debouncedSearchTerm === '') {
        // operate api call 
        if(props.apiCall){
          setIsSearching(true);

          props.apiCall(searchTerm)
          .then(() => {
            setIsSearching(false);
          });
        }else if(props.onChange){
          props.onChange(searchTerm);
        }
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  
  return (
    <SearchComponent cstmStyle = {props.cstmStyle}>
        <input
            value = {searchTerm}
            placeholder = {props.placeholder || 'Search...'}
            onChange = {({target:{value}}) => setSearchTerm(value)}
        />
         {isSearching && <div>Searching ...</div>}
        <FaSearch />
    </SearchComponent>
  )
}
const SearchComponent = styled.div`
    width: ${props => _.get(props,['cstmStyle','width'],'200px')}
    height: ${props => _.get(props,['cstmStyle','height'],'35px')}
    font-size: 11pt;
    display: flex;
    align-items: center;
    padding: 1%;
    justify-content: space-around;
    input{
        margin-right: 2%;
        border: 0;
        padding: 2%;
        border-radius: 3pt;
        line-height: 22px;
        background: rgba(255, 255, 255, 0.6);
        font-family: 'Open Sans', sans-serif;
        &::placeholder {
            color: #000;
            font-weight: bold;
            opacity: 0.5;
            font-size: 10pt;
            letter-spacing: 2px;
        }
    }
    svg{
        font-size: 15px;
        /* background-color: bisque; */
        height: 100%;
        color: #fff;
    }
`;
export default SearchInput;