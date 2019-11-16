import API from '../utils/api'
import { getUserKey, updateUserDescription } from '../index'

export const clearTrackDetails = () => (dispatch) => {
    dispatch({type: 'RESET_TRACK_DETAILS'});
};

export const setCurrentAuthor = (author) => (dispatch) => {
    dispatch({type: 'SET_CURRENT_AUTHOR', payload: author});
};

export const setCurrentTitle = (title) => (dispatch) => {
    dispatch({type: 'SET_CURRENT_TITLE', payload: title});
};

export const setCurrentAbout = (about) => (dispatch) => {
    dispatch({type: 'SET_CURRENT_ABOUT', payload: about});
};

export const getSavedRecords = (userId) => (dispatch) => {
    API.getSavedRecords(
        userId,
        (res) => {
            console.log('API response for saved records', res);
            if (Array.isArray(res) && res.length > 0) dispatch({type: 'SET_SAVED_RECORDS', payload: res});
            else dispatch({type: 'SET_SAVED_RECORDS', payload: []});
        }
    );
};

export const getMyRecords = (userId) => (dispatch) => {
    API.getUserRecords(
        userId,
        (res) => {
            console.log('API response for user records', res);
            if (Array.isArray(res) && res.length > 0) dispatch({type: 'SET_MY_RECORDS', payload: res});
            else dispatch({type: 'SET_MY_RECORDS', payload: []});
        }
    );
};

export const setUserName = (userName) => async(dispatch) => {
    try {
        const userId = await getUserKey();
        console.log("Updating username to backend, userId: " + userId)
        dispatch({type: 'SET_USER_NAME', payload: userName});
        API.updateUserName({
            "usersid": userId,
            "username": userName
        },
            (res) => console.log(res)
        );
    } catch (e) {
        console.log(e);
    }
};

export const setUserDescription = (description) => async(dispatch) => {
    try {
        const userId = await getUserKey();
        console.log("Updating user description to backend, userId: " + userId)
        dispatch({type: 'SET_USER_DESCRIPTION', payload: description});
        API.updateUserDescription({
            "usersid": userId,
            "description": description
        },
            (res) => console.log(res)
        );
    } catch (e) {
        console.log(e);
    }

};
