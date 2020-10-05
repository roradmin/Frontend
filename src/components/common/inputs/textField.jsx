import React from 'react';
import styled from 'styled-components';


const TextField = ({value,onChange,type="text",label,name = ''}) => {
    return <StyledTextField>
    <div className="inputWrapper">
        <input
            type={type}
            className = 'form__field'
            name = {name}
            placeholder="Name"
            value={value}
            onChange={(e) => onChange(name ? e : e.target.value)}
            required
        />
        <label className="form__label">{label}</label>
    </div>
  </StyledTextField>
  }
  const StyledTextField = styled.div`
        position: relative;
        padding: 15px 0 0;
        margin-top: 10px;
        font-weight: bold;
        .inputWrapper{
            position: relative;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            .form__field {
                font-family: inherit;
                width: 100%;
                border: 0;
                border-bottom: 2px solid #041c27;
                outline: 0;
                font-size: 1.3rem;
                padding: 16px 0 8px 0;
                color: #0e3142;
                background: transparent;
                transition: border-color 0.4s;
                z-index:2;
                
                &::placeholder {
                    color: transparent;
                }   
                &:placeholder-shown ~ .form__label {
                    font-size: 1.3rem;
                    cursor: text;
                    color: black
                    top: 12px;

                }
            }
            .form__label {
                position: absolute;
                top: 0;
                display: block;
                transition: 0.4s;
                font-size: 1rem;
                user-select: none;
                color: #041c27;
                z-index:1;
            }
            
            .form__field:focus {
                ~ .form__label {
                        position: absolute;
                        top: 0;
                        display: block;
                        transition: 0.4s;
                        font-size: 1rem;
                        color: #8a1046;
                        font-weight:700;    
                }
                padding-bottom: 6px;
                border-bottom: 2px solid #8a1046;
                font-weight: 700;
                border-width: 3px;
        }
  }
    `;
  export default TextField;
