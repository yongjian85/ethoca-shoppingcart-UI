import { CACHE_USER_PROFILE } from '../actions/Actions'

const ProfileReducer = (state = [], action) => {
    switch (action.type) {
    
        case CACHE_USER_PROFILE:

                return {...state, username: action.username} 

       
        default:
            return state
    }
}

export default ProfileReducer;