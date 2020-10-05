import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { selectCustomStyles } from './selectDays';

const SelectContact = ({
    selectContact,
    contactsList,
    tooltip = ''
}) => {
    const [currentContact,setCurrentContact] = React.useState(null);
    const [contactsOptions,setContactsOptions] = React.useState([]);

    React.useEffect(() => {
        const findActiveContact = contactsList?.find(ctct => ctct.activeContact);
        const contact = findActiveContact || contactsList?.[0];
        const currContact = {
            label: contact?.contactValue,
            value: contact?.contactUiId
        };
        setCurrentContact(currContact);
        selectContact(currContact);
      },[]);
      
    React.useEffect(() => {
        const options = contactsList.map(contact => ({
            label: contact.contactValue,
            value: contact.contactUiId
        }));
        setContactsOptions(options);
    },[contactsList?.length]);

    return React.useMemo(() => currentContact == null ? [] :
    <Wrapper data-tip={tooltip}>
        <label>Active Contact</label>
        <Select 
            defaultValue = {currentContact}
            value = {currentContact}
            styles = {selectCustomStyles}
            onChange = {selectContact}
            options = {contactsOptions}
        />
    </Wrapper>,[currentContact,contactsOptions]);
}
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    max-height: 70px;
    border-radius: 4px;
    background-color: #9E9E9E;
    color:#fff;
    label{
        
    }
`;

export default SelectContact;