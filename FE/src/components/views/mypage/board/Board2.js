import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  box: {
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    padding:'20px',
    borderRadius: '20px',
    marginBottom: '20px',
    boxShadow: '0px 0px 5px gray',
    backgroundColor: '#EEEEEE',
  },
  video: {
    display: 'flex',
    borderRadius: '20px',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: '10px',
  },
  title: {

  },
  content: {
    marginLeft: '20px',
  }
}));


function Board2({id}) {
  const [videos, setVideos] = useState([]);
  const [ranks, setRanks] = useState([]);
  const uid = id

  const getVideos = () => {
    const credentials = {
      category : 1,
      uid : uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })    
  }  

  const getRanking = () => {
    axios.get(`/cup/read/${uid}`)
    .then(res => {
      setRanks(res.data)
    })
    .catch(err =>{
      console.log(err)
    })  
  }

  useEffect(() => {
    getVideos();
    getRanking();
  }, [uid]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>🏆 월드컵 🏆</h1>
      <h4 >총 참여 {videos.length}회</h4>
      <h2>최근 참여 월드컵</h2>
      {ranks.map((video) => {
        if (video.videos2.category === 1) {
        return (
          <div className={classes.box}>
            <h4 className={classes.content}>{video.cupname}</h4>
            <div className={classes.video}>
              <video src={video.videos2.url} 
                poster={video.videos2.thumbnail} 
                controls
                style={{objectFit:'fill', width:'100%', textAlign:'center'}}
              />
            </div>
            <h4 className={classes.content}>{video.videos2.title}</h4>
            <h4 className={classes.content}>승률 : {(video.videos2.clickcnt / video.videos2.exposecnt).toFixed(1) * 100}%</h4>
          </div>        
        )
      }})}
    </div>
  );
}

export default Board2;