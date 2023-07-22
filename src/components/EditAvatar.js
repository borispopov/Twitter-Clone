import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button, Slider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import './EditAvatar.css';
import { useRef } from 'react';

function EditAvatar({ setAvatarEdit, avatar, setAvatar, setFile }) {

  const [ scaling, setScaling ] = useState(1)
  const editor = useRef(null)
  let value;

  return (
      <div className="modalContainer">

        <div className="title">
          <ArrowBackIcon className='close' onClick={() => {
                                              setAvatar(sessionStorage.getItem('avatar'));
                                              setAvatarEdit(false);
                                            }}/>
          <h1>Edit Media</h1>
        </div>

        <AvatarEditor className='editor'
          image={avatar}
          width={300}
          height={300}
          border={50}
          borderRadius={300}
          scale={scaling}
          ref={editor}/>

        <div className="container">
          <div className="scale__slider">
            <ZoomOutIcon className='zoom' />
            <Slider
              value={value}
              min={1}
              max={2.5}
              step={0.01}
              onChange={(e) => {
                setScaling(e.target.value)
            }}></Slider>
            <ZoomInIcon className='zoom' />
          </div>
          <div className="footer">
            <Button
            id='submitBtn'
            onClick={() => {
              setAvatar(editor.current.getImage().toDataURL())
              editor.current.getImage().toBlob((blob) => {
                console.log(blob)
                setFile(blob);
              })
              setFile(editor.current.getImage());
              setAvatarEdit(false);
            }}>Save</Button>
          </div>
      </div>


      </div>

  )
}

export default EditAvatar