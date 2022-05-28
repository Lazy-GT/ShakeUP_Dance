import React, { useState, useEffect, useContext } from 'react';
import Overlap from '../Signup/OverLap';
import Email from '../Signup/Email';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: '10px 0 0 0',
    width: '120px'
  }
}));

function PutCredentials(props) {
  const uid = localStorage.getItem('UserId')
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [profile, setProfile] = useState('')
  const [idCheck, setIdCheck] = useState(true)
  const [nameCheck, setNameCheck] = useState(true)
  const navigate = useNavigate()

  const getUser = () => {
    axios.get(`/user/read/${uid}`)
    .then(res => {
      setId(res.data.id)
      setName(res.data.name)
      setProfile(res.data.profile)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const propId = (props) => {
    setId(props)
    if (props) {
      setIdCheck(true)
    } else {
      setIdCheck(false)
    }
  }
  const onNameHandler = (event) => {
    setName(event.target.value)
  }

  const onPut = () => {
    const credential = {
      id: id,
      name: name,
      profile: profile
    }
    axios.put('/user', credential)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect( async () => {
    await getUser();
  }, []); 

  const classes = useStyles();

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center' 
      , width: '100%', height: '88vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} autoComplete='off'
        className={classes.root} onSubmit={onPut}>
        <Overlap
          type='idcheck'
          value={id}
          propFunction={propId}
        >
        </Overlap>
        <TextField
          name='id'
          label="채널명"
          type='text'
          variant="standard"
          onChange={onNameHandler}
          value={name}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={onPut}
        >
          수정하기
        </Button>
      </form>
    </div>
  );
}


export default PutCredentials;
