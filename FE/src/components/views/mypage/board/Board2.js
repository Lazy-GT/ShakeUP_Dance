import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
// import Thumbnails from '../Thumbnails'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function Board2({id}) {
  const [videos, setVideos] = useState([]);
  const [ranks, setRanks] = useState([]);
  const uid = id

  const getVideos = () => {
    // category, uid로 video 정보 가져오기
    // uid는 링크의 params 값을 main에서 props로 가져와야함.
    const credentials = {
      category : 1,
      uid : uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      // console.log(res.data)
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })    
  }  

  const getRanking = () => {
    axios.get(`/cup/read/${uid}`)
    .then(res => {
      console.log(res.data)
      setRanks(res.data)
    })
    .catch(err =>{
      console.log(err)
    })  
  }

  useEffect(() => {
    getVideos();
    getRanking();
  }, []);

  const classes = useStyles();

  return (
    <div className="flex-1" 
    style={{ flexDirection:'column'}}
    >
      <h1>월드컵 총 참여 회수</h1>
      <h3>{videos.length}회</h3>
      <hr/>
      <h1>최근 참여 월드컵</h1>
      <br/>
      {ranks.map((video) => {
        if (video.videos2.category === 1) {
        return (
        <div style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent:'center',
          }}>
          <video src={video.videos2.url} 
          poster={video.videos2.thumbnail} 
          controls
          style={{objectFit:'fill', width:'150px', height:'100px', textAlign:'center'}}/>
          {/* <img src={video.videos2.thumbnail} style={{objectFit:'fill', width:'150px', height:'100px', textAlign:'center'}}/> */}
          <h4>{video.cupname}</h4>
          <h4>{video.videos2.title}</h4>
          <h4>{(video.videos2.clickcnt / video.videos2.exposecnt).toFixed(1) * 100}%</h4>
          <hr/>
          <br/>          
        </div>        
        )
      }})}
      <br/>
    </div>
  );
}

export default Board2;