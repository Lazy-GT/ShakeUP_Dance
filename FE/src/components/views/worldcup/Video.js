import React, { useState } from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border:'1px solid black',
    padding:'5px'
  },
  video: {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: -1
  },
  title: {
  },
  subtitle: {
  },
  icon : {
    marginTop: '3px',
    zIndex: 1
  }
}))

function Video({data, propFunction, key, index}) {
  const [dialog, setDialog] = useState(false)
  const {vid, uid, title, likecnt, views, url, score} = data
  // const userId = localStorage.getItem('userId')
  const userId = 1
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <div className={classes.video} >
        <video src={url} />
      </div>
      <div className={classes.title}>
        <span>{title}</span>
      </div>
      <div className={classes.subtitle}>
        <span>{vid}</span>
        <span>조회수 {views}</span>
        <span>좋아요 {likecnt}</span>
        <span>성공동작 {score}</span>
      </div>        
    </div>
  );
}

export default Video;