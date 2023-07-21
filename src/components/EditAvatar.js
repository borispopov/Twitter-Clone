import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button, Slider } from '@mui/material';
import './EditAvatar.css';
import { useRef } from 'react';

function EditAvatar({ setAvatarEdit, avatar, setAvatar, setFile }) {

  const [ scaling, setScaling ] = useState(1)
  const editor = useRef(null)
  let value;

  return (
    <div className="edit__background">

      <AvatarEditor
        image={avatar}
        width={300}
        height={300}
        border={50}
        borderRadius={300}
        scale={scaling}
        ref={editor}/>

        <div className="scale__slider">
          <Slider
            value={value}
            min={1}
            max={2.5}
            step={0.01}
            onChange={(e) => {
              setScaling(e.target.value)
            }}></Slider>
        </div>

        <Button
          className="save__button"
          onClick={() => {
            setAvatarEdit(false);
            setAvatar(editor.current.getImage().toDataURL())
            editor.current.getImage().toBlob((blob) => {
              console.log(blob)
              setFile(blob);
            })
            setFile(editor.current.getImage())
          }}>Save</Button>

    </div>
  )
}

export default EditAvatar