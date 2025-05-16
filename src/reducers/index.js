import {combineReducers} from 'redux';
import alert from './alerts';
import auth from './auth';
import dashboard from './dashboard';
import wallet from './wallet';

export default combineReducers({
    alert,
    auth,
    dashboard,
    wallet
});