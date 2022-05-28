import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';

function VideoDetail(props) {
  const {video} = useLocation()
  return (
    <div>
      <video src={video.url}/>
      <span>{video.title}</span>
      <span>{video.uid}</span>
      <span>{video.name}</span>
    </div>
  );
}

export default VideoDetail;