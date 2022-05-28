import { combineReducers } from 'redux';
import user from './user_reducer';
// import comment from './comment_reducer';

//중간 저장소
const rootReducer = combineReducers({
    //user, comment, 
    user,
})

export default rootReducer;