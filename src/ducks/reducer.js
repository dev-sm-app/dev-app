const initialState = {
    user: {}
}


const USER = 'USER';


export function userData(user) {
    return {
        type: USER,
        payload: user
    }
}


export default function reducer(state=initialState, action){
   switch(action.type){
       case USER:
       return Object.assign({}, state, {user: action.payload});

       default: 
       return state;
   }
}