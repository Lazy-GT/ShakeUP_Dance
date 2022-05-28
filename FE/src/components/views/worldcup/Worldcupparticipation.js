import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import Button from '@material-ui/core/Button';
// import Video from './Video';


function Worldcupparticipation(props) {
  const userId = localStorage.getItem('UserId')
  const navigate = useNavigate();
  const [state, setState] = useState({ videos:[], checklist:[] });

  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  )
  

  const getVideos = () => {
    axios.get(`/video/read/all/${userId}`)
    .then(res => {
      console.log(res.data)
      setState({
      videos: res.data,
      checklist: new Array(res.data.length).fill(false)
      })
    })
    .catch(err =>{
      console.log(err)
    })
  }

  useEffect(() => {
    getVideos();  
  }, [])

  const onClick = video => () => { 
    if (video.category != 1){
      alert(`${video.title}가 월드컵 영상으로 참여되었습니다.`)
      let credentials = {
        category: 1,
        clickcnt: video.clickcnt,
        comment: video.comment,
        exposecnt: video.exposecnt,
        iscomment: video.iscomment,
        isscore: video.isscore,
        isshow: video.isshow,
        thumbnail: video.thumbnail,
        title: video.title,
        url: video.url,
        vid: video.vid
      }
      axios.put('/video/update/', credentials)
      .then(res => {
        console.log(res)
        const data = {
          cup_id: 1,
          cup_name: "코믹댄스 최강자, 나야나!",
          vid: [
            video.vid
          ] 
        }
        axios.post('/cup/create/', data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err =>{
        console.log(err)
      })
    } else {
     alert("이미 월드컵에 등록된 영상입니다.")
    }
  }

  const moveToVote = () => {
    navigate(`/worldcup/vote`)
  }

  
  return (
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center' }}>
      <p style={{textAlign:'center'}}>2월 3주차 월드컵: 코믹댄스 최강자, 나야나</p>  
      <p style={{textAlign:'center'}}>내 채널의 영상으로 참여하기</p>  
      <br/>
      
        <h1 style={{textAlign:'center'}}>현재 채널에 있는 영상: {state.videos.length}개</h1>
        <br/>
        <div style={{ display: 'flex', flexDirection:'row',  justifyContent:'start', flexWrap:'wrap'}}
          >
        {state.videos.map((video, index) => {
        return (
            <div style={{ display: 'flex', flexDirection:'column', marginBottom:'20px'}}>            
              {/* <img onClick={onClick(video)}
              style={{width:'70px', height:'70px',  marginRight:'40px'}} 
              src={video.thumbnail}/> */}
              <video onClick={onClick(video)} poster={video.thumbnail}
              style={{width:'70px', height:'70px',  marginRight:'40px'}} 
              src={video.url}/>
              <p>{video.title}</p>
            </div>          
        );
      })}
      </div>
      <br/>
      <div style={{display:'flex', justifyContent:'center', width:'100%' }}>
        <Button style={{ backgroundColor:'#6200EE', width: '40vw' }} color="primary" variant="contained" onClick={moveToVote}>투표하러 가기</Button>
      </div>
    </div>
  );
}

export default Worldcupparticipation;