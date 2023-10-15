import { combineReducers } from 'redux'
// import {initialState} from "../initialState";
import {
    SET_THEME,
    SET_MENU,
    SET_PROJECT_DATA,
    SET_LOADING,
    SET_LOGIN,
    PROJECT_CATEGORY,
    SET_CATEGORY_BUTTON,
    SET_PROJECT_DATA_DEFAULT,
    SET_LOGIN_USER,
    SET_USER_DATA,
    SET_FORK_DATA,
    SET_NETWORK_DATA,
    SET_CATEGORY_BTN,
    SET_WHITELIST_DATA
} from "../actionTypes";

import {
    DATE_WISE_DATA_REQUEST,
    DATE_WISE_DATA_SUCCESS,
    DATE_WISE_DATA_FAIL,
} from '../Constants'

export function setTheme(state = localStorage.getItem('mode') ? JSON.parse(localStorage.getItem('mode')) : 'darkness', action) {
    switch (action.type) {
        case SET_THEME:
            return action.payload
        default:
            return state
    }
}

export function setMenu(state = 'fullmenu', action) {
    switch (action.type) {
        case SET_MENU:
            return action.payload
        default:
            return state
    }
}

export function setProjectData(state = [], action) {
    switch (action.type) {
        case SET_PROJECT_DATA:
            return [...action.payload]
        default:
            return state
    }
}


export const dateWiseData = (state = [], action) => {
    switch (action.type) {
        case DATE_WISE_DATA_REQUEST:
            return {
                loading: true
            }

        case DATE_WISE_DATA_SUCCESS:
            return {
                loading: false,
                ...state,
                data: action.payload
            }
        case DATE_WISE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export function setLoading(state = true, action) {
    switch (action.type) {
        case SET_LOADING:
            return action.payload
        default:
            return state
    }
}

export function setLogin(state = { reconnected: false }, action) {
    switch (action.type) {
        case SET_LOGIN:
            return action.payload
        default:
            return state
    }
}

export function setCategory_list(state = 0, action) {
    switch (action.type) {
        case PROJECT_CATEGORY:
            return action.payload
        default:
            return state
    }
}

export function setCategory_btn(state = false, action) {
    switch (action.type) {
        case SET_CATEGORY_BUTTON:
            return action.payload
        default:
            return state
    }
}

export function setDefaultProjectData(state = [], action) {
    switch (action.type) {
        case SET_PROJECT_DATA_DEFAULT:
            return [...action.payload]
        default:
            return state
    }
}


export function setLoginUser(state = false, action) {
    switch (action.type) {
        case SET_LOGIN_USER:
            return action.payload
        default:
            return state
    }
}

export function setUserList(state = [], action) {
    switch (action.type) {
        case SET_USER_DATA:
            return [...action.payload]
        default:
            return state
    }
}

export function getFork(state = [], action) {
    // console.log(action)
    switch (action.type) {
        case SET_FORK_DATA:
            return [...action.payload]
        default:
            return state
    }
}

export function getNetwork(state = [], action) {
    switch (action.type) {
        case SET_NETWORK_DATA:
            return [...action.payload]
        default:
            return state
    }
}

export function getCategory(state = [], action) {
    switch (action.type) {
        case SET_CATEGORY_BTN:
            return [...action.payload]
        default:
            return state
    }
}

export function getWhitelist(state = [], action) {
    switch (action.type) {
        case SET_WHITELIST_DATA:
            return [...action.payload]
        default:
            return state
    }
}

const rootReducer = combineReducers(
    {
        setTheme, setMenu,
        setProjectData,
        setLoading,
        setLogin,
        setCategory_list,
        setCategory_btn,
        setDefaultProjectData,
        setLoginUser,
        setUserList,
        getFork,
        getNetwork,
        getCategory,
        getWhitelist,
        dateWiseData
    })

export default rootReducer;