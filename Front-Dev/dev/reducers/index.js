import types from './../constants/actions'
import {CHANGE_INFO} from './../actions'
import {SELECT_ID} from './../actions'

export function userName (state = {userName : 'N/A'}, action) {
    switch (action.type) {
        case types.LOAD_USER_NAME:
            return action.userName;
        default:
            return state
    }
}

export function error (state = {error : ''}, action) {
    switch (action.type) {
        case types.SHOW_ERROR:
            return action.error;
        default:
            return state
    }
}

export function info (state = {info : ''}, action) {
    switch (action.type) {
        case CHANGE_INFO:
            return action.info;
        default:
            return state
    }
}


