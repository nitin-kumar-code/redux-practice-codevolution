import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import axios from "axios";

const initialState ={
    loading: true,
    user:[],
    error:'',
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE' 

const fetchuserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchuserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchuserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST: return {
            ...state,
            loading:true
        }
        case FETCH_USER_SUCCESS: return {
            loading:false,
            user: action.payload,
            error:''
        }
        case FETCH_USER_FAILURE: return {
            loading:false,
            user:[],
            error: action.payload
        }
        default: return state;
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchuserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            const users = response.data.map(user => user.id)
            dispatch(fetchuserSuccess(users))
        }).catch(error => {
            dispatch(fetchuserFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
const subscribe = store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(fetchUsers())