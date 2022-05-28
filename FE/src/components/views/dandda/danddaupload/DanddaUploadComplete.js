/**
 * 영상 채널에 업로드 완료 페이지
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-02-02
 * 
 **/

import React from 'react';
import { Link, useNavigate, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';


function DanddaUploadComplete(props) {  
  const uid = localStorage.getItem('UserId')
  return (
    <div
    style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' 
    , width: '100%', height: '88vh'}}
    >
      <h1>영상이 내 채널에</h1>
      <h1>업로드되었습니다!</h1>
      <br/>
      {/* 이거 uid가 전달되게 해야할듯 */}
      <Link to={`/mypage/${uid}`}  style={{textDecoration: 'none'}}>
        <Button color="primary" variant="contained">영상 보러 가기</Button>
      </Link>
      <br/>
        <Button color="primary" variant="contained">다른 사람이 춘 영상 보기</Button>
    </div>
  );
}

export default DanddaUploadComplete;