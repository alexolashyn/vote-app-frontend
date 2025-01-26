import {
    DASHBOARD_SUCCESS,
    POLL_CREATED,
    POLL_FAIL,
} from '../actions/types';

const initialState = {
    polls: [],
    loading: true,
    error: null,
};

export default function dashboardReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case DASHBOARD_SUCCESS:
            return {
                ...state,
                polls: payload,
                loading: false,
            };

        case POLL_CREATED:
            return {
                ...state,
                polls: [...state.polls, payload],
            };

        case POLL_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        default:
            return state;
    }
}
