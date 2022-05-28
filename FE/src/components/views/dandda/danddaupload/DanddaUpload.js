/**
 * 채널에 따라하기 영상 업로드
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-02-02
 * 
 **/


import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import axios from 'axios';
import { getFile } from "../../firebase/db";
import { getDatabase, ref, onValue } from "firebase/database";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function DanddaUpload(props) {

  const navigate = useNavigate();
  const classes = useStyles();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [videoURL, setVideoURL] = useState(null);
  const [state, setState] = React.useState({
    is_comments: false,
    is_score: false,
    is_show: false,
  });

  const location = useLocation();
  const uid = localStorage.getItem('UserId')
  const original_vid = location.state.original_vid
  const score = location.state.score

  const downloadFirebaseVideo = () => {
    const database = getDatabase();

    // 영상 url 가져오기
    const message = ref(database, "message");
    onValue(message, async (snapshot) => {
      const data = snapshot.val();
      // console.log("videoUrl 전 : " + videoUrl);
      const videoUrl = await getFile(data);
      // console.log("videoUrl 후 : " + videoUrl);
      setVideoURL(videoUrl);
    });
  }


    useEffect(() => {
      downloadFirebaseVideo();  
    }, [])


  const titleChange = (event) => {
    setTitle(event.target.value)
  }
  const contentChange = (event) => {
    setContent(event.target.value)
  }

  function onSubmit(event) {
    event.preventDefault();

    const credentials = {
      category: 0,
      iscomment: state.is_comments,
      content: content,
      score: score, 
      tag: [
        {
          tname: tags
        }
      ],
      isshow: state.is_show,
      isscore: state.is_score,
      thumbnail: "",
      title: title,
      uid: uid,
      url: videoURL,    
      original_vid: original_vid
    }

    axios.post(`/video/create`, credentials)
    .then(res => {
      console.log(res.data)
      navigate('./complete')
    }) 
    .catch(err => {
      console.log('영상 생성 실패')
    });

  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const [tags, setTags] = React.useState(["댄따"])
  function addTags(newTags){
    setTags(newTags)
  }


// 폼그룹 => textfield, 해쉬태그, 스위치 일괄 submit
  return (
    <form onSubmit={onSubmit}
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' 
    , width: '100%', height: '88vh'}}>
    <FormGroup role="form">
      <TextField id="outlined-basic" variant="outlined"
      onChange={titleChange} label="영상제목"/>
      <TextField id="outlined-basic" variant="outlined"
      onChange={contentChange} label="상세설명"/>
      <br/>
      <ReactTagInput 
      tags={tags} 
      onChange={addTags}
      placeholder='태그를 입력해주세요'
      />
      <br/>   
      <FormControlLabel
        control={
          <Switch
            checked={state.checked}
            onChange={handleChange}
            name="is_comments"
            color="primary"
          />
        }
        label="댓글 허용"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checked}
            onChange={handleChange}
            name="is_score"
            color="primary"
          />
        }
        label="점수 표시"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checked}
            onChange={handleChange}
            name="is_show"
            color="primary"
          />
        }
        label="영상 비공개"
      />
      <br/>
      <br/> 
      <Button variant="contained" type="submit">제출</Button>
    </FormGroup>
    </form>
  );
}

export default DanddaUpload;