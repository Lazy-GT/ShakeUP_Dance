import {
    LOGIN_USER
} from '../_actions/types';
import {
    AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER :
            return { ...state, loginSuccess : action.payload}
            break;
        case AUTH_USER :
            return { ...state, userData : action.payload}
            break;
        default:
            return state;
            break;
    }
}