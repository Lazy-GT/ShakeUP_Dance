import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Emoji = (props) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
)

function JoinEnd(props) {

  return (
    <React.Fragment>
      <CssBaseline />
        <Container style={{
          display: 'flex',
          textAlign: 'center',
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center', 
          width: '100%',
          height: '95vh'
      }} maxWidth="sm">
        <div>
          <span style={{ fontSize:'3rem' }}><Emoji label="party" symbol="🎉"/></span>
          <h2>            
            축하합니다.<br/>
            아이디님!<br/>
            회원가입이 완료되었습니다.
          </h2>
        </div>
        <br/>
        <div>
          <span style={{ fontSize:'3rem' }}><Emoji label="dance" symbol="💃🏻"/></span>
          <h3 style={{ marginBottom:'0px' }}>
            댄스를 배우고 싶으신가요?<br/>
            유명 댄서의 춤을 따라하고<br/> 
            정확한지 검사받아 보세요!
          </h3>
          <br/>
          <Link to = {`/댄따주소`} style={{ textDecoration: 'none', color:'inherit'}}>
            <Button style={{margin:'0px'}} variant="contained" color="primary" type="button">
              댄스 학습하러 가기
            </Button>
          </Link>                
        </div>

        <br/>
        <br/> 

        <div>
          <span style={{ fontSize:'3rem' }}><Emoji label="fire" symbol="🔥"/></span>
          <h3 style={{ marginBottom:'0px' }}>
            <Emoji label="party" symbol=""/>
            불꽃 튀는 댄스배틀을 보고<br/>
            더 잘 춘 춤에 투표해주세요!
          </h3>
          <br/>
          <Link to = {`/월드컵주소`} style={{ textDecoration: 'none', color:'inherit'}}>
            <Button style={{margin:'0px'}} variant="contained" color="primary" type="button">
              월드컵 투표하기
            </Button>
          </Link>                
        </div>        
      </Container>
    </React.Fragment>
  );
}

export default JoinEnd;