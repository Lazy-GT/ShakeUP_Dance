import axios from 'axios';
import{
    LOGIN_USER, AUTH_USER
} from './types';


export function loginUser(dataTosubmit) {
    // 서버에서 받은 data를 request에 저장
    const request =
        // axios.post('api/login', dataTosubmit)
        axios.post('/user/login', dataTosubmit)
            .then(response => 
                //request에 토큰값을 넣어준다
                response.data); 
    //payload에 request값을 넣어준다.
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    // 서버에서 받은 data를 request에 저장
    const request =
        axios.get('/users/auth')
        .then(response => 
            response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}