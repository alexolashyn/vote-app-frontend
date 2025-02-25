import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 } from 'uuid';

export const setAlert = (message, alertType) => (dispatch) => {
    const id = v4();
    dispatch({
        type: SET_ALERT,
        payload: { message, alertType, id },
    });

    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
    }, 5000);
};