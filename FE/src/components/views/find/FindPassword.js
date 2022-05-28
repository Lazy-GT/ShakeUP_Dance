/**
 * 비밀번호 찾기 페이지
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-01-21
 * 
 **/
import React, { useState } from 'react';
import { useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function FindPassword(props) {

  const [Id, setId] = useState("")
  const [IdError, setIdError] = useState("")
  const [Email, setEmail] = useState("")
  const [EmailError, setEmailError] = useState("")

  const onEmailHandler = (event) => {
    setEmailError("")
    setEmail(event.currentTarget.value)
    if (Email !="" && !isEmail(Email)) {
        setEmailError("이메일을 형식에 맞게 작성해주세요.")
    }
  }
  const isEmail = (Email) => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    return emailRegex.test(Email);
  };

  const onIdHandler = (event) => {
    setIdError("")
    setId(event.currentTarget.value)
  }

  const classes = useStyles();
  const navigate = useNavigate();

    //axios로 찾기
    // 이메일 일치하면 해당 이메일에 대한 id 반환
    // 틀리면 setEmailError("회원정보에 등록된 이메일이 아닙니다.")    


  const findPassword = (data) => {
    axios.post(`http://114.129.238.28/user/sendpw`, data)
    .then(res => {
      console.log(res)
      navigate('/find_password_ok')
      
    })
    .catch(err => {
      if(err.response.status === 400) {
        setEmailError('올바르지 않은 정보입니다.')
      }
    });
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Id === "") {
        setEmailError("아이디를 입력해야 합니다.")
    }
    if (Email === "") {
        setEmailError("이메일을 입력해야 합니다.")
    }
    if (isEmail(Email)) {
      let data = {
        email : Email,
        id : Id
      }
      findPassword(data)
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center' 
      , width: '100%', height:'95vh'}}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmitHandler} className={classes.root} autoComplete='off'> 
        
        <h2>비밀번호 찾기</h2>
        <TextField id="standard-basic" label="아이디를 입력해주세요" onChange={onIdHandler} variant="standard" autoCapitalize='off' />
        <TextField id="standard-basic-email" label="이메일을 입력해주세요" onChange={onEmailHandler} helperText={EmailError} autoCapitalize='off' />
        <br/>
        <Button style={{ width: '100%'}} variant="contained" color="primary" type="submit" disabled={Id ==="" || Email==="" || !isEmail(Email)  ? true : false}>
            임시 비밀번호 발송
        </Button>
      </form>      
  </div>
  );
}

export default FindPassword;