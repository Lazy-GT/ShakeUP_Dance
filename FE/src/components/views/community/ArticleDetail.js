/**
 * 커뮤니티 글 상세보기
 * 
 * @author myeongseong
 * @version 1.0.0
 * 작성일 : 2022-01-24
 * 
 **/

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
root: {
  display: 'flex',
  flexDirection:'column',
  '& > *': {
    margin: theme.spacing(1),
  },
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '25ch',
  },
},
comments : {

}
}));

function ArticleDetail(props) {
//   return (
//     <div className={classes.root}>
//       <div style={{
//         display:'flex',
//         flexDirection:'row', 
//         justifyContent:'flex-start'
//         }}>
//         <Avatar alt="Remy Sharp" src="" /> 
//         <div style={{
//           flexDirection: 'column', alignItems: 'center'}}>   
//           <span>Id</span>
//           <br/>
//           <span>글 생성 날짜</span>
//         </div>
//       </div>
//       <h1>Title</h1>
//       <hr/>
//       <p>본문</p>
//       <hr/>
//       <form noValidate autoComplete="off">
//         <div>
//           <TextField
//             id="outlined-multiline-static"
//             label="댓글 작성하기"
//             multiline
//             style={{width:'100%'}}
//             rows={4}
//             variant="outlined"
//           />
//         </div>
//         <div style={{ textAlign:'right' }}>
//           <Button 
//           style={{margin:'3px'}} 
//           size = "small"
//           variant="contained" 
//           color="primary" 
//           type="submit">
//           작성완료
//           </Button>
//         </div>
//       </form>

//       <div className={classes.comments}>
//       <ul>
//         <CommentForm state={state} dispatch={dispatch}/>
//         <CommentList state={state} dispatch={dispatch}/>
//       </ul>
//       </div>
    // </div>
  // );
}

export default ArticleDetail;