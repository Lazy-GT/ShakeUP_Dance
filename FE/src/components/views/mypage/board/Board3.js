import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Video from './Video';


function Board3({user}) {
  const [videos, setVideos] = useState([]);
  const getVideos = () => {
    axios.get(`/video/read/all/${user.uid}`)
    .then(res => {
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  const deleteVideo = (idx) => {
    videos.splice(idx, 1)
    setVideos(videos)
  }
  useEffect(() => {
    getVideos()
  }, [])
  return (
    <div>
      {videos.map((item, index) => {
        return (
          <>
            <Video key={index} data={item} propFunction={deleteVideo} index={index}/>
          </>  
          );
      })}
  </div>
  );
}

export default Board3;