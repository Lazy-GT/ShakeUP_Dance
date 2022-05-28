import React, { useState, useEffect, useContext } from 'react';
import Overlap from '../Signup/OverLap';
import Email from '../Signup/Email';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {UserContext} from '../../../App'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function PutCredentials(props) {
  const [user, setUser] = useState({})
  const { auth } = useContext(UserContext)

  const getUser = () => {
    axios.get(`/user/read/${auth.id}`)
    .then(res => {
      setUser(res.data)
      console.log(res, auth.id)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const onPut = () => {

  }
  const propNameFunc = () => {

  }
  const propEmailFunc = () => {

  }
  useEffect( async () => {
    getUser();
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
          type='name'
          value={user.id}
          propFunction={propNameFunc}
        >
        </Overlap>
        <Email
          email={user.email}
          propFunction={propEmailFunc}
        >
        </Email>
        <TextField
          label='비밀번호'
          type='password'
          variant='standard'
        />
        <TextField
          label='비밀번호 확인'
          type='password'
          variant='standard'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          수정하기
        </Button>
      </form>
    </div>
  );
}


export default PutCredentials;
