import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SmallLoader from '../loader/smallLoader';

const defaultAvatar = require('../../../../src/images/avatar2.png');

const ImgUploader = ({
    avatar = defaultAvatar,
    editable,
    isLoading = false,
    setAvatar = null
}) => {
  const [image, setImage] = useState({preview: '', raw: ''})
  const fileRef = React.useRef(null);

  const handleChange = async (e) => {
    const imgFile = e.target?.files[0];
    if(imgFile){
      const imgPreview = URL.createObjectURL(imgFile);
      setImage({
        preview: imgPreview,
        raw: imgFile
      });
      setAvatar && setAvatar(imgFile);
    }
  }

  return <ImgWrapper
    editable = {editable}
    className='imageUploader'
    title = {editable ? 'Change Image' : null}
    onClick = {() => (editable && !isLoading) ? fileRef.current.click() : null}
  >
      {
        isLoading && <div className='loader'>
          <SmallLoader />
        </div>
      }
        <img
            src={image.preview || avatar || defaultAvatar}
            onError={(e) => e.target.src = defaultAvatar}
            alt="preview"
        />
        <input
            type="file"
            id="upload-button"
            onChange={editable ? handleChange : null}
            ref = {fileRef}
        />
  </ImgWrapper>
}

const ImgWrapper = styled.div`
  position:relative;
  width: 180px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  &:before{
    ${props => props?.title ? `content: '${props?.title}';` : ""}
      position: absolute;
      bottom: 5%;
      background-color: rgb(0,0,0,0.5);
      padding: 2pt;
      border-radius: 4px;
      color: #fff;
      font-size: 9pt;
      cursor:pointer;
  }
  img{
    user-select: none;
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
    width: 180px;
    height: 180px;
  }
  input{
      display:none;
  }
  .loader{
    position: absolute;
    left: 0;
    right:0;
    top:0;
    bottom:0;
    background-color: rgb(0,0,0,0.7);
    display: grid;
    align-items:center;
    color: #fff;
    font-weight: bold;
    z-index: 999;
  }
`;

export const Tape = styled.div`
  background-color: hsla(0,0%,100%,.2);
  box-shadow: inset 0 0 1em .5em hsla(0,0%,100%,.1);
  height: 2em;
  position: absolute;
  transform: rotate(45deg);
  width: 6em;
  display:grid;
  align-items:center;
  justify-content:center;
  &:after,
  &:before {
    background-size: .4em .4em;
    bottom: 0;
    content: '';
    position: absolute;
    top: 0;
    width: .2em;
  }
  &:after{
    background-image: linear-gradient(45deg, transparent 50%, hsla(0,0%,100%,.3) 50%),
    linear-gradient(-45deg, transparent 50%, hsla(0,0%,100%,.3) 50%);
    background-position: 0 100%;
    left: -.2em;
  }
  &:before{
    background-image: linear-gradient(135deg, transparent 50%, hsla(0,0%,100%,.3) 50%),
    linear-gradient(-135deg, transparent 50%, hsla(0,0%,100%,.3) 50%);
    background-position: 100% 100%;
    right: -.2em;
  }
  span{
    color:#fff;
    font-size:14pt;
  }
`;
export default ImgUploader;