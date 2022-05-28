/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Button} from '@material-ui/core';
import Overlap from './OverLap'
import axios from 'axios';

function SignupNext() {
  const location = useLocation()
  const {id, email, password} = location.state  
  const [unique, setUnique] = useState(false)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const onSignUp = () => {
    const credentials = {
      email,
      id,
      name : name.replace(/\s/g, ''),
      password
    }
    console.log(credentials)
    axios.post('http://114.129.238.28/user/signup', credentials)
    .then(res => {
      console.log(res)
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
    })
  }
  const propOverlap = (props) => {
    if (props) {
      setUnique(true)
      setName(props)
    }
  }
  return (
    <div style={{
      display:'flex', flexDirection:'column',
      justifyContent:'center', alignItems:'center'
    }}>
      <form>
        <h1>채널명</h1>
        <Overlap 
          type='name'
          value={name}
          propFunction={propOverlap}
        ></Overlap>
        <Button 
          variant='contained'
          color='primary'
          onClick={onSignUp}
          disabled={!unique}
        >회원가입하기</Button>
      </form>
    </div>
  );
}

export default SignupNext;