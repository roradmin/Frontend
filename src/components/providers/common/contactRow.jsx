import React,{useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ContactTypeValue from '../../common/selectComponents/selectContactType';
import { deleteProviderContact } from '../../../apiConnector/provider.api';
import { emptyContact } from './providerBase';

const ContactRow = ({
    arrayOfContacts = [],
    handleChange
}) => {
const [addedIdCounter,setAddedIdCounter] = useState(0);

React.useEffect(() => {
    if(arrayOfContacts.length > 0){
        const initilizeContacts = arrayOfContacts.map(
            (cont,idx) =>({...cont,contactUiId:idx})
        );
        setAddedIdCounter(initilizeContacts.length - 1);
        handleChange({
            name:'contacts',
            value: initilizeContacts,
        });
    }else{
        addContactToRow();
    }
},[]);


const addContactToRow = () => {
    if(arrayOfContacts?.length <= 3){
        let contCounter = addedIdCounter + 1;
        const newContacts = [...arrayOfContacts,{...emptyContact,contactUiId: contCounter}];
        setAddedIdCounter(contCounter);
        handleChange({
            name:'contacts',
            value: newContacts,
        });
    }
} 
const removeFromRow = async(contact) => {
    console.log('removeFromRow: ',contact);
    if(arrayOfContacts.length == 1){
        alert('Cannot delete the last contact');
    }else{
        if(contact.contactId){
            const currentContacts = await deleteProviderContact(contact.contactId);
            console.log(currentContacts);
            handleChange({
                name:'contacts',
                value: currentContacts,
            });
        }else if(Number.isInteger(contact.contactUiId)){
            handleChange({
                name:'contacts',
                value: arrayOfContacts.filter(cnt => cnt.contactUiId !== contact.contactUiId),
            });
        }
    }
}
  return React.useMemo(() => <Wrapper> <Row  id="basicScroller">
        {
        arrayOfContacts?.map((cont,idx) => (
            <ContactWrap
                key = {"contactWrap_" + idx}
                className = "contactWrap"
                isActive = {cont.activeContact}
            >
                <ContactTypeValue
                    contact = {cont}
                    removeFromRow = {removeFromRow}
                    setContact={({value,path}) => handleChange({
                        name: 'contacts',
                        value: value ,
                        path: path,
                        multiValuesIndex: idx
                    })}
                />
            </ContactWrap>
            ))
        }
    </Row>
    <Add onClick = {addContactToRow}>+</Add>
    </Wrapper>
  ,[arrayOfContacts]);
}
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr 1fr;
`;
const Row = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    max-width: 56vw;
    padding-left: 1%;
    overflow-y: visible;
`;
const ContactWrap = styled.div`
    background-color: ${props => props.isActive ? 'rgba(139, 195, 74, 0.57)' : 'transparent'};
    box-sizing:border-box;
    animation: .7s fadeInDown;
    max-width: 250px;
    min-width: 215px;
    margin-right: 2%;
    box-shadow: 1px 2px 1px 0px rgba(0,0,0,0.75);
`;
const Add = styled.span`
    width: 30px;
    font-size: 27pt;
    align-self: center;
    user-select: none;
    font-weight: bold;
    font-family: fantasy;
    background-color: transparent;
    height: 30px;
    display: flex;
    align-items: center;
    color: #fff;
    opacity: 0.6;
    margin: 0 auto;
    justify-content: center;
    transition: .7s all;
    cursor:pointer;
    background-color: #333;
    border-radius: 3px;
    &:hover{
        opacity: 1;
    }
`;
export default ContactRow;