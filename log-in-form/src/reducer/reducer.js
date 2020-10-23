import {
    FETCHING_START, FETCHING_ERROR, 
    GET_PLANTS_SUCCESS, GET_PLANT_SUCCESS, GET_USERS_PLANTS_SUCCESS,
    GET_USERS_SUCCESS,
    POST_REG_SUCCESS, POST_LOG_SUCCESS, POST_PLANT_SUCCESS,
    PUT_USER_SUCCESS, PUT_PLANT_SUCCESS, 
    DELETE_PLANT_SUCCESS, USER_CRED
} from '../actions/actions'




const initialState = {
    isLoading: false,
    error: '',
    plants: [],
    plant: {},
    users: []
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_START:
            return {
                ...state, 
                isLoading: true
            }

            case GET_PLANTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                plants: [...state.plants, action.payload]
            }

        case FETCHING_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }


        case GET_PLANT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: '',
                plant: action.payload
            }
    
        case POST_PLANT_SUCCESS: 
        return { 
            ...state,
            isLoading: false,
            error: '',
            plants: [...state.plants, action.payload]
        }

        case PUT_PLANT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: '',
                plants: [...state.plants.map(plant => {
                    if (plant.id === action.payload.id) {
                        return action.payload;
                    };
                    return plant;
                })]
            };
        };

        case DELETE_PLANT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: '',
                plant: [...state.plants.filter(plant => plant.id !== action.payload)]
            }
        }
        
        case POST_REG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                // users: [...state.users, action.payload]
            }

        case USER_CRED:
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                users: [action.payload]
            }

        case POST_LOG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
            }
        
        case PUT_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: '',
                users: [...state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    };
                    return user;
                })]
            };
        };
        default: return state
    }
}