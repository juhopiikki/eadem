import API from '../utils/api'
import { getUserKey } from '../index'

export const setCurrentTrackId = (trackId) => (dispatch) => {
    console.log("TARCK: ", trackId)
    dispatch({type: 'SET_CURRENT_TRACK_ID', payload: trackId});
};

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

/*export const getRandomRecord = () => (dispatch) => {
    API.getSavedRecords(
        (res) => {
            console.log('API response for saved records', res);
            if (Array.isArray(res) && res.length > 0) dispatch({type: '***********', payload: res});
            else dispatch({type: '************', payload: []});
        }
    );
};*/

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
        dispatch({type: 'SET_USER_NAME', payload: userName});
};

export async function sendUserNameToAPI (userName) {
    const userId = await getUserKey();
    API.updateUserName({
            "usersid": userId,
            "username": userName
        },
        (res) => console.log('sendUserName', res)
    )
}

export const setUserDescription = (description) => async(dispatch) => {
        dispatch({type: 'SET_USER_DESCRIPTION', payload: description});
};

export async function sendUserDescriptionToAPI (description) {
    const userId = await getUserKey();
    API.updateUserDescription({
            "usersid": userId,
            "description": description
        },
        (res) => console.log(res)
    );
}

