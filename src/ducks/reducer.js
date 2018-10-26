const USER = 'USER';
const UPDATE_FRIEND_NAME = "UPDATE_FRIEND_NAME"

const initialState = {
    user: {},
    friendName: ""
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

export default function reducer(state=initialState, action){
   switch(action.type){
       case USER:
       return Object.assign({}, state, {user: action.payload});

       case UPDATE_FRIEND_NAME:
       return Object.assign({}, state, {friendName: action.payload})

       default: 
       return state;
   }
}