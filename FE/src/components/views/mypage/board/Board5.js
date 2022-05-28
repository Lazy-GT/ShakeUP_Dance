import React, {useState, useEffect, useContext} from 'react';
import Video from './Video';
import axios from 'axios';

function Board5({user}) {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const res = await axios.post(`/userlike/read/${user.uid}`)
    setVideos(res.data)
  }  

  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div>
      {videos.map((item, index) => {
        return (
          <>
            <Video data={item} key={index}/>
          </>
        );
      })}
    </div>
  );
}

export default Board5;