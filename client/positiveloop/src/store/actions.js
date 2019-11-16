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
