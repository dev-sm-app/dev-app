const USER = 'USER';
const UPDATE_FRIEND_NAME = "UPDATE_FRIEND_NAME"
const UPDATE_CURRENTLY_MESSAGING = "UPDATE_CURRENTLY_MESSAGING"

const initialState = {
    user: {},
    friendName: "",
    currentlyMessaging: {}
}

export function userData(user) {
    return {
        type: USER,
        payload: user
    }
}

export function updateFriendName(name) {
    return {
        type: UPDATE_FRIEND_NAME,
        payload: name
    }
}

export function updateCurrentlyMessaging(friend) {
    return {
        type: UPDATE_CURRENTLY_MESSAGING,
        payload: friend
    }
}

export default function reducer(state=initialState, action){
   switch(action.type){
       case USER:
       return Object.assign({}, state, {user: action.payload})

       case UPDATE_FRIEND_NAME:
       return Object.assign({}, state, {friendName: action.payload})

       case UPDATE_CURRENTLY_MESSAGING:
       return Object.assign({}, state, {currentlyMessaging: action.payload})

       default: 
       return state;
   }
}