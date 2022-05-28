/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Vaildate from './Vaildate';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px 0 0 0',
    width: '120px'
  }
}));

function Overlap({type, value, propFunction}) {
  const [inputVal, setInputVal] = useState(value)
  // 중복검사 패스했는지, 아래 요구사항 패스 못했으면 엑시오스 안보내고 에러메시지 출력
  const [pass, setPass] = useState(false)
  // 아이디, 이메일 요구사항 패스했는지 매번 검사해주면서 헬프 텍스트 수정해줄예정
  const [vaildPass, setValidPass] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')


  const onInputHandler = ({target: {value}}) => {
    setInputVal(value)
    if (value.length > 5) {
      const returnVal = Vaildate(type, value)
      setValidPass(returnVal)
      if (returnVal) {
        setIsError(false)
        setErrorMsg('')
      } else {
        setIsError(true)
        setErrorMsg(`${type}을 다시 확인해주세요`)
      }
    }
  }

  const overlapTest = () => {
    if (vaildPass && inputVal.length > 5) {
      try {
        axios.get(`/user/${type}/${inputVal}`)
        .then((res) => {
          if (res.data === '성공') {
            // 중복검사가 완료되면 값을 내보내주고,
            propFunction(inputVal)
            // 중복검사 버튼 비활성화
            setPass(true)
          } else {
            propFunction('')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      } catch(err) {
        console.log(err)
      }
      } else {
        alert('요구사항을 다시 확인해주세요')
      }
  }
  // 만약에 인풋값을 건드리면 다시 중복검사해야함
  useEffect(() => {
    setPass(false)
    propFunction('')
  }, [inputVal])

  const classes = useStyles();

  return (
    <div>
      <TextField
        name='id'
        label="아이디"
        type='text'
        variant="standard"
        onChange={onInputHandler}
        value={inputVal}
        error={isError}
        helperText={vaildPass ? '사용하실 수 있습니다': errorMsg} // 에러아닐때도 띄어주게끔
      />
      <Button 
        color='primary' 
        variant="contained" 
        onClick={overlapTest} 
        disabled={pass}
        className={classes.button}
      >
        중복검사
      </Button>
    </div>
  )
}

export default Overlap;