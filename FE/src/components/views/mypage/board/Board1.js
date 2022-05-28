import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  content: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  sub: {
    margin: '0 10px'
  }
}));


function Board1({id}) {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [bestVid, setBestVid] = useState("")
  const uid = id

  const getVideos = () => {
    const credentials = {
      category : 0,
      uid : uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      console.log(res.data)
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })    
  }  

  const getBestVid = () => {
    axios.get(`/video/${uid}`)
    .then(res => {
      setBestVid(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onGoMypage = (uid) => {
    navigate(`/mypage/${uid}`)
  }

  useEffect(() => {
    getVideos();
    getBestVid();
  }, [uid]);


  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>댄스 따라하기 👯‍♀️</h1>
      <h4>총 참여 {videos.length}회</h4>
      <h2>최근 참여 댄따</h2>
      <div className={classes.box}>
        <h1 className={classes.sub}>최고점 획득 댄따 🥇</h1>
        <div className={classes.video}>
          <video style={{objectFit:'fill', width:'100%', textAlign:'center'}} src={bestVid.url} controls/>
        </div>
        <h3 className={classes.sub}>{bestVid.title}</h3>
      </div>
      {videos.map((video) => {
        return (
          <div className={classes.box} key={video.copyid}>
            <div className={classes.video}>
              <video src={video.copy.url} poster={video.copy.thumbnail} style={{objectFit:'fill', width:'100%'}} controls/>
            </div>
            <div className={classes.content}>
              <Avatar src={video.origin_profile} onClick={()=> onGoMypage(video.original.uid)}/>
              <div>
                <h4 className={classes.sub}>{video.origin_name}님의 {video.original.title}</h4>
                <h4 className={classes.sub}>{video.copy.score}점</h4>            
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Board1;