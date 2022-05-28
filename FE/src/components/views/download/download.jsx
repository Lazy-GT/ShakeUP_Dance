import React from 'react';
import './download.css'

function download() {
  const onclick = () => {
    window.location.href = 'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/app-debug.apk?alt=media&token=3f0ea939-6109-4201-940b-f29a226b9534'
  }
  return (
    <div className='body'>
      <div className='bar'></div>
      <span className="down">click 👇</span>
      <div className="wrapper">
        <h1 className='h1' data-heading="Shake Up" onClick={onclick}>Shake Up</h1>
      </div>
    </div>
  );
}

export default download;