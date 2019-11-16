import API from '../utils/api'

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
            console.log(res);
            if (Array.isArray(res) && res.length > 0) dispatch({type: 'SET_SAVED_RECORDS', payload: res});
            else dispatch({type: 'SET_SAVED_RECORDS', payload: []});
        }
    );
};

export const getMyRecords = (userId) => (dispatch) => {
    API.getUserRecords(
        userId,
        (res) => {
            console.log(res);
            if (Array.isArray(res) && res.length > 0) dispatch({type: 'SET_MY_RECORDS', payload: res});
            else dispatch({type: 'SET_MY_RECORDS', payload: []});
        }
    );
};
