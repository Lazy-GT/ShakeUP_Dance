/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-21
**/
import React, { useState } from 'react';
import {TextField, Button} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import Overlap from './OverLap'
import Email from './Email'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '88vh',
    marginTop: '-10vh'
  }
}));

function Signup() {
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')
  const [check, setCheck] = useState({
    id: false,
    email: false,
    pw: false
  })
  const [pwErrorMsg, setPwErrorMsg] = useState('')
  const [cpwErrorMsg, setCpwErrorMsg] = useState('')
  
  const navigate = useNavigate()

  // 패스워드
  const onPwdHandler = ({target: {value}}) => {
    setPassword(value)
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-=])[A-Za-z\d!@#$%^&*()-=]{8,16}$/.test(value)) {
      setPwErrorMsg('패스워드를 다시 확인해주세요')
    } else {
      setPwErrorMsg('')
    }
  }
  // 패스워드 재확인
  const onConPwdHandler = ({target: {value}}) => {
    setConfirmPassword(value)
    if (password !== value) {
      setCpwErrorMsg('비밀번호가 일치하지 않습니다')
    } else {
      setCheck({...check, pw:true})
      setCpwErrorMsg('')
    }
  }
  
  //이메일 인증
  const isEmail = (props) => {
    setEmail(props)
    if (props) {
      setCheck({...check, email:true})
    } else {
      setCheck({...check, email:false})
    }
  }
  // 아이디 중복검사
  const propOverlap = (props) => {
    setId(props)
    if (props) {
      setCheck({...check, id:true})
    } else {
      setCheck({...check, id:false})
    }
  }
  // 다음 버튼
  const onNext = () => {
    navigate('/signup/next', {
      state: {
        id,
        email,
        password
      },
    });
  }
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <form style={{ display: 'flex', flexDirection: 'column' }} autoComplete='off'
        className={classes.root}>
        <Overlap 
          type='idcheck'
          value=''
          propFunction={propOverlap}
        ></Overlap>
        <Email
          email=''
          propFunction={isEmail}
        ></Email>
        <TextField
          name='password'
          label="비밀번호"
          type='password'
          variant="standard"
          autoComplete="new-password"
          onChange={onPwdHandler}
          value={password}
          helperText={pwErrorMsg}
        />
        <TextField
          name="confirmPassword"
          label="비밀번호 확인"
          type='password'
          autoComplete="new-password"
          variant="standard"
          onChange={onConPwdHandler}
          value={confirmPassword}
          helperText={cpwErrorMsg}
        />
        <Button
          type="button" 
          variant="contained"
          color="primary"
          disabled={!(check.id && check.email && check.pw)}
          onClick={onNext}
        >다음단계
        </Button>
      </form>
    </div>

  );
 }
 
 export default Signup;