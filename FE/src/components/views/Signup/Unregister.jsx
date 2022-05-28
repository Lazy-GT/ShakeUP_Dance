import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '88vh',
  },
  btn: {
    margin: '30px',
    width: '120px'
  }
}));

function Unregister() {
  const uid = localStorage.getItem('UserName')
  const navigate = useNavigate()
  const onDelete = () => {
    // axios.delete(`/user/${uid}`)
    axios.delete(`/user/12`)
      .then(res => {
        console.log(res)
        // alert(res)
        //navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <h1>정말 회원 탈퇴하시겠습니까?</h1>
      <Button 
        onClick={onDelete} 
        className={classes.btn}
        variant='contained'
      >회원탈퇴</Button>
    </div>
  );
}

export default Unregister;