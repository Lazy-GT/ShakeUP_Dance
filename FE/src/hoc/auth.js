import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";

export default function (Componet, option, adminRoute = null) {
    //option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능
    function AuthCheck(props) {
      const dispatch = useDispatch();
      //useEffect를 사용해서 초기 검증을 실행해준다
      useEffect(() => {
        dispatch(auth()).then((res) => {
          console.log(res);
          console.log("HOC 테스트");
        });
      }, []);
  
      return <Componet />;
    }
  
    return AuthCheck;
  }