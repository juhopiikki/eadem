const initialState = {
    currentTrackId: 'idtest',
    currentTitle: 'titletest',
    currentAuthor: 'authortest',
    currentAbout: 'abouttest',
    savedAudioIds: [],
    favoriteAudioIds: [],
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


