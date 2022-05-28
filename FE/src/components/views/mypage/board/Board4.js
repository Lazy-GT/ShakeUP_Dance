import React, {useState, useEffect} from 'react';
import Video from './Video';
import axios from 'axios';

// 구독
function Board4({user}) {
  const [videos, setVideos] = useState([]);
  
  const getVideos = () => {
    axios.get(`/sub/read/follow/${user.uid}`)
    .then(res => {
      const FV = res.data.map(item => item.video)
      setVideos(FV)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  useEffect(() => {
    getVideos();
  }, []);
  
  return (
    <div>
      {videos.map((item, index) => {
        return (
          <>
            <Video data={item} key={index} />
          </>
        );
      })}
    </div>
  );
}

export default Board4;