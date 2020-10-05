import React, { useState } from 'react';
import { FiAlertTriangle } from "react-icons/fi";
import Select from 'react-select';
import { InputLabel, Switch } from '../common/forms/inputsHandling';
import SelectExternal from '../common/selectComponents/selectExternal';
import ImgUploader from '../common/imgUploader/imgUploader';
import MainTextField from '../common/inputs/mainTextField';
import { getFilteredExternalIngredients } from '../../apiConnector/ingredient.api';
import { selectCustomStyles } from '../common/selectComponents/selectDays';
import { FormTooltip } from '../common/inputs/basicLabelInput';
import RingSlider from '../common/charts/RingSlider';
import { StyledButton } from '../common/forms/styledButton';

const IngForm = ({ ingredientData, dataOnChange, isCreation, handleForm }) => {
    const [ingredientExternal, setIngredientExternal] = useState(null);

    return <form className='ingredientForm'>
        <div className='firstRow'>
            <ImgUploader
                editable={!isCreation ? true : false}
                avatar={ingredientExternal?.avatar || ingredientData?.avatar}
                setAvatar={
                    async (img) => {
                        console.log(img);
                        //const uploadAvatar = await postProviderAvatar(img,currentProvider?.id,currentProvider?.providerExternal);   
                        //const imageLink = _.get(uploadAvatar,['data','data','avatar'],null);

                        //console.log(imageLink);
                    }
                } />
            <div className='inputs'>
                {
                    !isCreation ? <InputLabel
                        type="text"
                        name="name"
                        inputStyle={{ textAlign: 'center' }}
                        label='Name'
                        value={ingredientData?.name}
                        required={true}
                        onChange={({ value, name }) => dataOnChange(name, value)}
                    /> : <SelectExternal
                            ApiCall={getFilteredExternalIngredients}
                            placeHolder="Insert Ingredient Name"
                            onSelect={
                                ({ name, ingExternal }) => {
                                    console.log(name, ingExternal);
                                    ingExternal && dataOnChange('ingredientExternal', ingExternal?.id);
                                    ingExternal && setIngredientExternal(ingExternal);
                                }
                            }
                        />
                }
                <InputLabel
                    type="text"
                    name="identifier"
                    inputStyle={{ textAlign: 'center' }}
                    label='Identifier'
                    value={ingredientData?.identifier}
                    onChange={({ value, name }) => dataOnChange(name, value)}
                />
                <InputLabel
                    name="price"
                    //symbol = {currencySign}
                    label='Cost'
                    tooltip="Ingredient cost"
                    type='number'
                    inputStyle={{ textAlign: 'center' }}
                    ThrdComponent={() => <OrderSelect
                        setCurrentValue={({ value, parent, type }) => dataOnChange(type, value, parent)}
                        parent='cost'
                        currentValue={ingredientData?.cost?.currency}
                        type='currency'
                    />}
                    value={ingredientData?.price}
                    onChange={({ value, name }) => dataOnChange(name, value, 'cost')}
                />
                <InputLabel
                    name="amountInPackage"
                    //symbol = {currencySign}
                    ThrdComponent={() => <OrderSelect
                        setCurrentValue={({ value, parent, type }) => dataOnChange(type, value, parent)}
                        parent='amountInPackage'
                        currentValue={ingredientData?.amountInPackageScale}
                    />}
                    label='Amount In Package'
                    tooltip="Items In Package (1 if provided as single)"
                    inputStyle={{ textAlign: 'center' }}
                    value={ingredientData?.amountInPackage}
                    onChange={({ value, name }) => dataOnChange(name, value)}
                    required={true}
                />
            </div>
        </div>
        <div className='orderDetails'>
            <RingSlider
                currentVal={ingredientData?.minimumInStock}
                label='minimumInStock'
                onChange={(value) => dataOnChange('minimumInStock', value)}
                tooltip="Current Stock Amount"
                Child={() => <FiAlertTriangle size={35} color={'#FF8800'} />}
            />
            <RingSlider
                currentVal={ingredientData?.amountInStock}
                label='amountInStock'
                onChange={(value) => dataOnChange('amountInStock', value)}
                tooltip="Current Stock Amount"
                Child={() => <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli.</p>}
            />
            <RingSlider
                currentVal={ingredientData?.desiredInStock}
                label='desiredInStock'
                onChange={(value) => dataOnChange('desiredInStock ', value)}
                tooltip="Custom Stock Desired"
                Child={() => <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli.</p>}
            />
        </div>
        <FormTooltip place="bottom" bgcolor="pink" />
        <StyledButton
            className="submitIngredient"
            onClick={handleForm}
            width='170px'
            height='auto'
            position='absolute'
            title={!isCreation ? 'Update Info' : 'Create Ingredient'}
        />
    </form>
}

export const OrderSelect = ({ setCurrentValue, currentValue, parent, type = "scale" }) => {
    const scaleOptions = ['Units', 'Gram', 'Kilogram', 'Liter', 'Mililiter'];
    const currenciesOptions = ['ILS', 'USD'];
    const relevantData = type === 'currency' && currenciesOptions || scaleOptions;
    const options = relevantData.map(val => ({ value: val, label: val.toUpperCase() }));
    console.log('currentValue', currentValue);
    return <Select
        defaultValue={
            options.find(
                t => t.label === currentValue?.toUpperCase()
            )
        }
        onChange={(value) => setCurrentValue({ value: value?.label, parent, type })}
        options={options}
        styles={selectCustomStyles}
    />
}
export default IngForm;