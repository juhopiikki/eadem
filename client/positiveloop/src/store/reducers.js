const initialState = {
    currentTrackId: null,
    currentTitle: null,
    currentAuthor: null,
    currentAbout: null,
    savedRecords: [],
    myRecords: [],
    savedAudioIds: [],
    favoriteAudioIds: [],
    userName: 'Seppo',
    userId: '',
    userdescription: 'Life is supposed to be fun',
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_TRACK_ID':
            return {
                ...state,
                currentTrackId: action.payload,
            };
        case 'SET_CURRENT_TITLE':
            return {
                ...state,
                currentTitle: action.payload,
            };
        case 'SET_CURRENT_AUTHOR':
            return {
                ...state,
                currentAuthor: action.payload,
            };
        case 'SET_CURRENT_ABOUT':
            return {
                ...state,
                currentAbout: action.payload,
            };
        case 'SET_SAVED_RECORDS':
            return {
                ...state,
                savedRecords: action.payload,
            };
        case 'SET_MY_RECORDS':
            return {
                ...state,
                myRecords: action.payload,
            };
        case 'SET_USERNAME':
            return {
                ...state,
                userName: action.payload,
            };
        case 'SET_USER_DESCRIPTION':
            return {
                ...state,
                userdescription: action.payload,
            };
        case 'RESET_TRACK_DETAILS':
            return {
                ...state,
                currentAbout: null,
                currentAuthor: null,
                currentTitle: null,
            };
        default:
            return state
    }
}

export default appReducer;


