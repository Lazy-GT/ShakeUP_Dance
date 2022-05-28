/**
 * 아이디/비밀번호 찾기 메인 페이지 
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-01-21
 * 
 **/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom:'2rem', 
    width:'85%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
    fontWeight:'bold'
  },
  pos: {
    marginBottom: 12,
  },
});

function SimpleCard1() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h4" component="h2" style={{ marginBottom:'1rem' }}>
          ID
        </Typography>
        <Typography variant="body1" component="p">
          아이디 찾기
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        이메일 인증을 통하여<br/>
        아이디를 찾습니다.
        </Typography>
      </CardContent>
      <div style={{
          display: 'flex', flexDirection:'row-reverse', justifyContent: 'end'
       }}>
        <Link to={'/find_id'}  style={{textDecoration: 'none'}}>
          <CardActions>
            <Button size="small" style={{ marginBottom:'0.5rem' }}><ArrowForwardIosIcon/></Button>
          </CardActions>
        </Link>    
      </div>
    </Card>
  );
}
function SimpleCard2() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h4" component="h2" style={{ marginBottom:'1rem' }}>
          PW
        </Typography>
        <Typography variant="body1" component="p">
          비밀번호 찾기
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        이메일 인증을 통하여<br/>
        비밀번호를 찾습니다.
        </Typography>
      </CardContent>
      <div style={{
          display: 'flex', flexDirection:'row-reverse', justifyContent: 'end'
       }}>
        <Link to={'/find_password'}>
          <CardActions>
            <Button size="small" style={{ marginBottom:'0.5rem' }}><ArrowForwardIosIcon/></Button>
          </CardActions> 
        </Link>   
      </div>
    </Card>
  );
}

function Find(props) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center' 
      , width: '100%', height:'95vh'}}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SimpleCard1/>
      <SimpleCard2/>      
    </div>      
  </div>
  );
}

export default Find;
