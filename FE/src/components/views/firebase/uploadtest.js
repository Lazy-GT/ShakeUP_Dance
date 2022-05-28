import React, { useState } from 'react';
import { uploadFile, deleteFile } from './db'

function Upload() {
  const [file, setFile] = useState('')
  const [now, setNow] = useState(Date.now())
  
  const onFileChange = (event) => {
    const nowImageUrl = URL.createObjectURL(event.target.files[0])
    console.log(nowImageUrl)
    setFile(event.target.files[0])
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      setNow(Date.now())
      await uploadFile(file, Date.now())
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <form onSubmit={onSubmit}>
      <input 
        type='file'
        name='image'
        onChange={onFileChange}
      />
      <button type='submit'>제출</button>
    </form>
  </>
  );
}

export default Upload;