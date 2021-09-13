
/**
 * this is a reducer for sample plugin
 */

import {
    GET_DATA_LOADING,
    GET_DATA_LOADED
} from "@js/actions/sample";

const sample = (state = {
    loading: false
}, action) => {
    switch (action.type) {
    case GET_DATA_LOADING: {
        return {
            ...state,
            loading: action.status
        };
    }
    case GET_DATA_LOADED: {
        return {
            ...state,
            result: action.result
        };
    }
    default: return state;
    }
};

export default sample;
