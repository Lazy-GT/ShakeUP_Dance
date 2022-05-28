/**
 * 임시 비밀번호 발송 완료 페이지
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-01-21
 * 
 **/
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
 
function FindPasswordComplete(props) {

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
              메일로 임시 비밀번호를 보내드렸습니다.<br/>
              해당 임시 비밀번호로 로그인해주세요.<br/>
            </h3>
            <span style={{ fontSize:'3rem' }}><Emoji label="Mail" symbol="📧"/></span>
          </div>
          <br/>
          <div style={{
            flexDirection:'row',
            justifyContent: 'center',
          }}>          
            <Link to = {`/login`} style={{ textDecoration: 'none', color:'inherit'}}>
              <Button style={{margin:'3px'}} variant="contained" color="primary" type="button">
                로그인 하러가기
              </Button>
            </Link>
          </div>                      
        </Container>
      </React.Fragment>
    );
  }
export default FindPasswordComplete;