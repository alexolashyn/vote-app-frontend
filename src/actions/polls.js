import axios from "axios";
import {setAlert} from "./alerts";
import {POLL_FAIL} from "./types";

export const getPoll = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`/polls/${id}`);
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: POLL_FAIL,
            payload: message,
        });
    }
}

export const createPoll = (pollData, organizationId) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/polls/${organizationId}`, pollData);
        dispatch(setAlert('createPollSuccess', 'success'))
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: POLL_FAIL,
            payload: message,
        });
    }

}

export const vote = (id, option) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/polls/${id}/vote`, {option});
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
        dispatch({
            type: POLL_FAIL,
            payload: message,
        });
    }
}

export const closePoll = (id) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/polls/${id}/close`);
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: POLL_FAIL,
            payload: message,
        });
    }
}

export const getPollResult = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`/polls/${id}/result`);
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: POLL_FAIL,
            payload: message,
        });
    }
}