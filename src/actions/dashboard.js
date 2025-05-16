import axios from 'axios';
import {DASHBOARD_SUCCESS, ORG_CREATED, ORG_SUCCESS, ORG_FAIL} from "./types";
import {setAlert} from "./alerts";

export const getOrganizations = () => async (dispatch) => {
    try {
        const {data} = await axios.get('/organizations');
        dispatch({
            type: DASHBOARD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOrganization = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`/organizations/${id}`);
        dispatch({
            type: ORG_SUCCESS,
            payload: data,
        })
        return data;
    } catch (error) {
        const {message} = error.response.data;
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: ORG_FAIL,
            payload: message,
        });
    }
}

export const createOrganization = (orgData) => async (dispatch) => {
    try {
        const {data} = await axios.post('/organizations', orgData)
        dispatch({
            type: ORG_CREATED,
            payload: data,
        });
        dispatch(setAlert('createOrgSuccess', 'success'));
    } catch (error) {
        const {message} = error.response.data;
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: ORG_FAIL,
            payload: message,
        });
    }
}

export const getMembers = (orgId) => async (dispatch) => {
    try {
        const {data} = await axios.get(`/organizations/${orgId}/members`);
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
    }
}

export const getKey = (orgId) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/organizations/${orgId}/key`);
        return data;
    } catch (error) {
        const {message} = error.response.data;
        console.log(message);
    }
}

export const sendRequest = (key) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/organizations/request`, {key});
        dispatch(setAlert('reqSendSuccess', 'success'));
        return data;
    } catch (error) {
        const {message} = error.response.data;
        dispatch(setAlert(message, 'danger'));
        console.log(message);
    }
}

export const handleRequest = (orgId, requestId, isApproved) => async (dispatch) => {
    try {
        if (isApproved) {
            return (await axios.post(`/organizations/${orgId}/requests/${requestId}/approve`)).data
        }
        return (await axios.post(`/organizations/${orgId}/requests/${requestId}/reject`)).data
    } catch (error) {
        const message = error?.response?.data?.message || error.message;
        console.error(message);
    }

}

