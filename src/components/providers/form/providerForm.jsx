import React,{useState,useEffect} from 'react';
import useStoreForm from '../../common/reduxForm/useStoreForm';
import {InputLabel,Switch} from '../../common/forms/inputsHandling';
import {SimpleBtn} from '../../common/forms/styledButton';
import ContactRow from '../common/contactRow';
import OrderRow from '../common/orderRow';
import styled from 'styled-components';
import { FormTooltip } from '../../common/inputs/basicLabelInput';
import SelectContact from '../../common/selectComponents/selectContact';
import ImgUploader from '../../common/imgUploader/imgUploader';
import { useSelector } from 'react-redux';
import { postProviderAvatar } from '../../../apiConnector/avatars.api';
import SelectExternal from '../../common/selectComponents/selectExternal';
import { getFilteredExternalProviders } from '../../../apiConnector/provider.api';
import _ from 'lodash';

const ProviderForm = ({currentProvider,handleCreation,updateProvider,invalidInputs}) => {
    const {values, handleChange, handleSubmit} = useStoreForm("PROVIDER_FORM", null);  
    const currencySign = useSelector(state => state?.basicConfiguration?.currency?.sign);
    const [providerExternal,setProviderExternal] = useState(null);
    const [loadingUploadAvatar,setLoadingUploadAvatar] = useState(false);

    React.useEffect(() => console.log('====> invalidInputs: ',invalidInputs),[invalidInputs]);
    React.useEffect(() => setContact(),[]);

    const setContact = (selected = null) => {
      if(selected?.value != null){       
        const newData = values.contacts.map(con => ({...con,activeContact: (con.contactUiId == selected.value)}));
        console.log('newData = ',newData);
        handleChange({name:'contacts',value: newData});
      }
    }
    const handleSelectedName = (selected) => {
      console.log(selected);
      handleChange({name:'name',value:selected.label});
      // handle external provider
      handleChange({name: 'providerExternalId',value: selected?.value?.id || null});
      setProviderExternal(selected?.value || null);
    }
    const uploadAvatar = async(img) => {
        console.log(currentProvider);
        setLoadingUploadAvatar(true);
        const uploadAvatar = await postProviderAvatar(img,currentProvider?.id,currentProvider?.providerExternalId);   
        console.log(uploadAvatar);
        setLoadingUploadAvatar(false);
    }
    return (
      <div className="providerForm">
        <div className="mergeBoxes">
            <div className="details">
            <div className="section">
              {
                currentProvider ? <InputLabel
                  type="text"
                  name="name"
                  inputStyle = {{textAlign: 'center'}}
                  label='Name'
                  value={values.name}
                  onChange={({value,name}) => handleChange({name,value})}
              /> : <SelectExternal 
                      ApiCall = {getFilteredExternalProviders}
                      placeHolder = "Insert Provider/Vendor Name"
                      onSelect = {handleSelectedName}
                  />
              }
              <InputLabel
                  type = "text"
                  name = "restaurantIdentifier"
                  label = 'Restaurant'
                  inputStyle = {{textAlign: 'center'}}
                  tooltip = 'Vendor identifier'
                  value = {values.restaurantIdentifier}
                  onChange = {({value,name}) => handleChange({name,value:value})}
              />    
              <Switch
                  name = "isActive"
                  label = 'Provider'
                  tooltip = 'a disabled provider will not take part in ongoing operations'
                  value = {values.isActive}
                  onChange = {(name, checked) => handleChange({name,value:checked})}
              />    
                <InputLabel
                        name = "discount"
                        label='Discount'
                        type = 'discount'
                        errorTxt = 'Out Of Range [0-100]'
                        symbol = '%'
                        inputStyle = {{textAlign: 'center'}}
                        value={values.discount}
                        required = {true}
                        onChange={({value,name}) => handleChange({name,value})}
                />
                
              <InputLabel
                      name = "minimumPerOrder"
                      symbol = {currencySign}
                      label = 'Minimum Per Order'
                      tooltip = "Vendor's minimum amount to apply order"
                      inputStyle = {{textAlign: 'center'}}
                      value = {values.minimumPerOrder}
                      onChange = {({value,name}) => handleChange({name,value})}
                />
              {
              values?.contacts?.find(t => t.contactUiId && t.contactValue) && <SelectContact 
                selectContact = {setContact}
                contactsList = {values.contacts.filter(t => !_.isEmpty(t?.contactValue))}
                tooltip = 'The way the order is placed'
              />
            } 
            </div>
            <Avatar> 
              <ImgUploader
                isLoading = {loadingUploadAvatar}
                editable = {currentProvider ? true : false}
                avatar = {currentProvider?.avatar || providerExternal?.avatar}
                setAvatar = {uploadAvatar}
               />
            </Avatar>     
            </div>        
            <Lists>
              <ContactRow
                  arrayOfContacts = {values.contacts}
                  handleChange = {handleChange}
              />
              <OrderRow
                arrayOfOrders = {values.schedule}
                handleChange = {handleChange}
              />
          </Lists>
          <SimpleBtn onClick = {(e) => currentProvider ? updateProvider(values): handleCreation(values)}>
            {currentProvider ? 'Update Data':'Create Provider'}
          </SimpleBtn>
          <FormTooltip />
          </div>
      </div>
    );
  }
  const Avatar = styled.div`
    width: 34%;
    display: grid;
    align-items: center;
    flex-grow: 1;
  `;
  const Lists = styled.div`
    background-color: rgb(10, 40, 53);
    display: grid;
    grid-template-rows: 50% 50%;
    height: 100%;
    position: relative;
    *{
      user-select: none;
    }
  `;


// TODO - need to add + sign to add more delivery,order days
// email should be select with options whatsapp,message,email, whatever...
export default ProviderForm;