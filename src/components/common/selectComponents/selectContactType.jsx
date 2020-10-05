import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import BasicLabelInput from '../inputs/basicLabelInput';
import { selectCustomStyles } from './selectDays';

const ContactTypeValue = ({
    contact,
    setContact,
    removeFromRow,
    isLoading
}) => {
const [isEmailField,setIsEmailField] = useState(null);
const {contactId,contactType,contactValue} = contact;

useEffect(() => {
    setIsEmailField(contactType?.toUpperCase() == 'EMAIL');
},[contactType]);

return <Contact>
        <span>
            <label>Contact</label>
            <Select 
                defaultValue = {contactOptions.find(co => co.label.toUpperCase() == contactType.toUpperCase())}
                styles = {selectCustomStyles}
                onChange = {(value) => setContact({value:value.label,path:['contactType']})}
                options = {contactOptions}
            />
        </span>
        <BasicLabelInput
            value = {contactValue}
            placeholder = {(isEmailField ? 'Email':'Phone Number') +'...'}
            type = {contactType}
            width = '90%'
            BGcolor = '#0a2835'
            errorTxt = {`Invalid contact ${isEmailField ? 'email' : 'number'}`}
            formKey = {contactType}
            onChange = {(data) => setContact({value:data.value,path:['contactValue']})}
        />
        <div className='delete' onClick={() => removeFromRow(contact)}>
            x
        </div>
</Contact>
}
const Contact = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    padding: 2%;
    margin: auto;
    &-MenuList{
        width:2000px;
    }
    span{
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        color: #fff;
        >*{
            margin: 0;
        }
        label{
            margin: 0.5rem;
        }

    }
`;
const contactOptions = [
    { value: 'Email', label: 'Email' },
    { value: 'Whatsapp', label: 'Whatsapp' },
    { value: 'Message', label: 'Message' }
];
export default ContactTypeValue;