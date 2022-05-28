/**
 * 아이디 찾기 완료 페이지
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-01-21
 * 
 **/
 import React, {Component} from 'react';
 import { Link, useLocation } from "react-router-dom";
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
 
function FindIdComplete(props) {
  const location = useLocation();

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
            <h3>            
              안녕하세요. 회원님!<br/>
              찾으시려는 아이디는<br/>
              {location.state.userId ? location.state.userId : "" } 입니다.
            </h3>
          </div>
          <br/>
          <div style={{
            flexDirection:'row',
            justifyContent: 'center',
          }}>
            <Link to = {`/find_password`} style={{ textDecoration: 'none', color:'inherit'}}>
              <Button style={{margin:'3px'}} variant="contained" color="primary" type="button">
                비밀번호 찾기
              </Button>
            </Link>           
            <Link to = {`/login`} style={{ textDecoration: 'none', color:'inherit'}}>
              <Button style={{margin:'3px'}} variant="contained" color="primary" type="button">
                로그인
              </Button>
            </Link>
          </div>                      
        </Container>
      </React.Fragment>
    );
  }

export default FindIdComplete;