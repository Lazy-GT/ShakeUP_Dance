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
          <span style={{ fontSize:'3rem' }}><Emoji label="party" symbol="π"/></span>
          <h2>            
            μΆνν©λλ€.<br/>
            μμ΄λλ!<br/>
            νμκ°μμ΄ μλ£λμμ΅λλ€.
          </h2>
        </div>
        <br/>
        <div>
          <span style={{ fontSize:'3rem' }}><Emoji label="dance" symbol="ππ»"/></span>
          <h3 style={{ marginBottom:'0px' }}>
            λμ€λ₯Ό λ°°μ°κ³  μΆμΌμ κ°μ?<br/>
            μ λͺ λμμ μΆ€μ λ°λΌνκ³ <br/> 
            μ ννμ§ κ²μ¬λ°μ λ³΄μΈμ!
          </h3>
          <br/>
          <Link to = {`/λλ°μ£Όμ`} style={{ textDecoration: 'none', color:'inherit'}}>
            <Button style={{margin:'0px'}} variant="contained" color="primary" type="button">
              λμ€ νμ΅νλ¬ κ°κΈ°
            </Button>
          </Link>                
        </div>

        <br/>
        <br/> 

        <div>
          <span style={{ fontSize:'3rem' }}><Emoji label="fire" symbol="π₯"/></span>
          <h3 style={{ marginBottom:'0px' }}>
            <Emoji label="party" symbol=""/>
            λΆκ½ νλ λμ€λ°°νμ λ³΄κ³ <br/>
            λ μ μΆ μΆ€μ ν¬νν΄μ£ΌμΈμ!
          </h3>
          <br/>
          <Link to = {`/μλμ»΅μ£Όμ`} style={{ textDecoration: 'none', color:'inherit'}}>
            <Button style={{margin:'0px'}} variant="contained" color="primary" type="button">
              μλμ»΅ ν¬ννκΈ°
            </Button>
          </Link>                
        </div>        
      </Container>
    </React.Fragment>
  );
}

export default JoinEnd;