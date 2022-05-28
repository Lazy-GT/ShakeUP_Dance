/**
 *
 * @author 최성석
 * @version 1.0.0
 * 작성일 2022-01-24
**/

import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { loginUser} from '../../../_actions/user_action';
import { UserContext } from "../../../App";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    div : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '88vh',
        marginTop: '-10vh'
    }
  }));

function Login(props) {
    const {auth, setAuth} = useContext(UserContext)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Id, setId] = useState("")
    const [IdError, setIdError] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordError, setPasswordError] = useState("")


    const onIdHandler = (event) => {
        setIdError("")
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPasswordError("")
        setPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) => {
        
        //페이지 리프레쉬 방지
        event.preventDefault();

        if (Id === "") {
            setIdError("이메일을 입력해야 합니다.")
        }
        else if (Password === "") {
            setPasswordError("비밀번호를 입력해야 합니다.")
        }
        else {
            // 서버에 보내기
            let body = {
                id : Id,      //데이터에 맞게 수정
                // username : Id,      //데이터에 맞게 수정
                password: Password
                
            }
            dispatch(loginUser(body))
      		// 로그인되면 /(index페이지)로 이동
                .then(response => {
                    // console.log(response)
                //토큰 값이 들어간 payload값이 존재하면 로그인 성공
                    if (response.payload) {
                    //로컬 스토리지에 토큰값 저장
                        console.log("로컬 저장 전 : ",localStorage.getItem('IsLogin'));
                        console.log(response);
                        localStorage.setItem('AccessToken', response.payload.token);   //백엔드용
                        // localStorage.setItem('AccessToken', response.payload.accessToken);   //MECALL API용
                        localStorage.setItem('UserId', response.payload.user.uid);
                        localStorage.setItem('UserName', response.payload.user.name);
                        localStorage.setItem('UserEmail', response.payload.user.email);
                        localStorage.setItem('IsLogin', true);
                        setAuth({
                            id: response.payload.user.uid,
                            name: response.payload.user.name,
                            email: response.payload.user.email
                        })
                        console.log('response.payload.user.uid', response.payload.user.uid)
                        console.log("로컬 저장 후 : ", localStorage.getItem('IsLogin'));
                        navigate('/');
                        alert('성공');

                //아니면 로그인 실패
                } else {
                    console.log(response)
                    alert('실패')
                }
            })
        }
    }
    const onClick = () => {
        navigate('/signup')
    }
    

    
    const classes = useStyles();

    return (
        <div className={classes.div}>
            
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler} className={classes.root} autoComplete='off'
            >
                <h1>로그인</h1> 
                <TextField id="standard-basic-id" label="Id" onChange={onIdHandler} helperText={IdError} autoCapitalize='off' />
                <TextField id="standard-basic-password" type='password' label="Password" onChange={onPasswordHandler} helperText={PasswordError} />
                <br />
                {/* <Link to="/404" style={{ textDecoration: 'none', color:'inherit' }}> */}
                <Button style={{  width: '100%' }} variant="contained" color="primary" type="submit" disabled={Id === "" || Password === ""  ? true : false}>
                    로그인
                </Button>
                {/* </Link> */}
                <Button onClick={onClick} style={{  width: '100%' }} variant="contained" color="primary" type="button">
                    회원가입
                </Button>
            </form>
            {/* 소셜계정 로그인 */}
        </div>
    );
}

export default Login;