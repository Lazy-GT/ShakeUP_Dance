import { Tabs, Tab, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TabPanel, a11yProps } from './TabPanel';
import Board1 from './board/Board1'
import Board2 from './board/Board2'
import Board3 from './board/Board3'
import Board4 from './board/Board4'
import Board5 from './board/Board5'
import { UserContext } from '../../../App'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),   
    },
  },
  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '15px'
  },
  Btn: {
    variant: "contained"
  },
  follow: {
    marginLeft: 'auto',
  }
}))
function MyPage() {
  const { id } = useParams()
  const [value, setValue] = useState(0)
  const [user, setUser] = useState({})
  const { auth } = useContext(UserContext)
  const [following, setFollowing] = useState(false)
  const userId = localStorage.getItem('UserId')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getUser = () => {
    axios.get(`/user/read/${id}`)
    .then(res => {
      setUser(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const isFollow = () => {
    axios.post('sub/isfollow', {
      curuid: auth.id,
      targetuid: id
    })
      .then((res) => {
        setFollowing(res.data)
      })
  }
  // 빨로우 요청 axios
  const followHandler =  () => {
    axios.post('sub/follow/', {
      curuid: auth.id,
      targetuid: id
    })
      .then(res => {
        if (res.data === '성공') {
          setFollowing(true)
        }
      })
  }
  const unfollowHandler = () => {
    axios.delete(`/sub/unfollow/${auth.id}/${id}`)
      .then(res => {
        if (res.data === '성공') {
          setFollowing(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  useEffect( async () => {
    await getUser();
    await isFollow();
  }, [id]); 
  
  const classes = useStyles();
  return (
    <div className='mypage'>
      <div className='user'>
        <img src={user.profile} />
        <div className={classes.user}>
          <Typography style={{fontWeight: 900}}>{user.name}</Typography>
          <Typography>님의 마이페이지</Typography>
        </div>
        {userId === id ?
          <></> : 
          <div className={classes.follow}>
          {following ? 
            <Button onClick={unfollowHandler} variant='contained'>팔로우 취소</Button>
            : <Button onClick={followHandler} variant='contained'>팔로우</Button>
          }
        </div>
        }
      </div>
      <div>
        <div>
          <Tabs 
            value={value} onChange={handleChange} aria-label='secondary tabs example'
            indicatorColor="secondary" textColor="inherit" variant="fullWidth"
          > 
            <Tab label='댄따' {...a11yProps(0)} />
            <Tab label="월드컵" {...a11yProps(1)} />
            <Tab label="업로드" {...a11yProps(2)} />
            <Tab label="구독" {...a11yProps(3)} />
            <Tab label="좋아요" {...a11yProps(4)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <Board1 id={id}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Board2 id={id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Board3 user= {user}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Board4 user= {user}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Board5 user= {user}/>
        </TabPanel>
      </div>
    </div>
  );
}

export default MyPage;