/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useEffect, useState, useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios'
import Vaildate from './Vaildate';
import { makeStyles } from '@material-ui/core';
import { event } from 'jquery';
import { width } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  botton: {
    margin: '10px 0 0 0',
    width: '120px'
  },
}));
function Email({email, propFunction}) {
  // axios에서 받을 해쉬값
  const [hash, setHash]  = useState(Date.now())
  // 이메일 입력, 검증, 에러메시지
  const [inputEmail, setInputEmail] = useState(email) // 입력
  const [vaildPass, setValidPass] = useState(false) // 검증
  const [errorMsg, setErrorMsg] = useState('') // 에러메시지
  const [sendFlag, setSendFlag] = useState(false)
  // 인증번호 입력, 검증
  const [inputHash, setInputHash] = useState('')
  const [verify, setVerify] = useState(false)
  // 타이머
  const [timer, setTimer] = useState(300)

  // 인증메일 보내기
  const sendAuthEmail = async () => {
    // 중복검사 
    axios.get(`user/${inputEmail}`)
      .then((res) => {
        if (!res.data) {
          axios.get(`/user/emailcheck/${inputEmail}`)
            .then((res) => {
              console.log(res)
              setHash(res.data)
              setSendFlag(true)
            })
        }
      })
      
  }

  const onEmailHandler = ({target: {value}}) => {
    setInputEmail(value)
    const returnVal = Vaildate('email', value)
    setValidPass(returnVal)
    if (returnVal) {
      setErrorMsg('')
    } else {
      setErrorMsg('이메일을 다시 확인해주세요')
    }
  }

  // 입력 해쉬값이랑 비교하기
  const isHash = () => {
    if (hash === inputHash) {
      setVerify(true)
      propFunction(inputEmail)
    } else {
      setVerify(false)
      propFunction('')
    }
  }
  

  // 타이머
  useEffect(() => {
    if (sendFlag) {
      if (timer >= 0) {
        const Counter = setInterval(() => {
          setTimer(prev => prev-1)
        }, 1000);
        return () => clearInterval(Counter)
      }
    }
    if (timer < 0) {
      alert('인증시간이 만료되었습니다. 메일 인증을 다시 시도해주시기 바랍니다.')
      setSendFlag(false)
      setTimer(300)
      setHash(Date.now())
    }
  }, [sendFlag, timer])
  
  useEffect(() => {
    setValidPass(false)
    setVerify(false)
    propFunction('')
  }, [inputEmail])

  
  const classes = useStyles();

  return (
    <>
      <div>
        <TextField
          name='email'
          label="이메일"
          type='text'
          variant="standard"
          onChange={onEmailHandler}
          value={inputEmail}
          error={errorMsg !==''}
          helperText= {vaildPass ? '사용가능합니다': errorMsg}
        />
        <Button 
          onClick={sendAuthEmail} 
          variant='contained'
          color='primary'
          className={classes.botton}
        >
          {sendFlag ? '인증번호 재발송':'인증번호 발송'}
        </Button>
      </div>
      <span>이메일 주소로 전송된 </span>
      <span>인증번호를 입력해주세요.</span>
      <div>
        <TextField
          label="인증번호"
          value={inputHash}
          onChange={(event) => setInputHash(event.target.value)}
          disabled={verify}
        />
        {!sendFlag ? '':
          <p>{Math.floor(timer/60)}:{timer%60 < 10 ? '0'+ timer%60 : timer%60}</p>
        }
        <Button 
          variant='contained'
          color='primary' 
          onClick={isHash} 
          disabled={verify}
          className={classes.botton}
        >인증
        </Button>
      </div>
    </>
  );
}


export default Email;