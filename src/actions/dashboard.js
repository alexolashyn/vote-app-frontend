import axios from 'axios';
import {DASHBOARD_SUCCESS, POLL_CREATED, POLL_FAIL} from "./types";

export const getPolls = () => async (dispatch) => {
    try {
        const {data} = await axios.get('/polls');
        dispatch({
            type: DASHBOARD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error);
    }
}

export const createPoll =  () => async(dispatch) => {
    try {
        const tempBody = {
            "title": "Test poll",
            "options": ["Yes", "No"]
        }
        const {data} = await axios.post('/polls', tempBody)
        dispatch({
            type: POLL_CREATED,
            payload: data,
        });
    } catch (error) {
        const { message } = error.response.data;
        console.log(message);
        dispatch({
            type: POLL_FAIL,
            payload: message,
        });
    }
}