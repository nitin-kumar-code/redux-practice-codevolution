import {applyMiddleware, legacy_createStore as createStore} from 'redux'
import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import pkg from 'redux-logger';
const { logger } = pkg;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    };
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    };
}

function orderIcecream(){
    return {
        type: ICECREAM_ORDERED,
        payload: 1,
    };   
}

function restockIcecream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    };
}

const cakeInitialState = {
    numOfCakes: 10,   
}

const icecreamInitialState = {
    numOfIcecreams: 20
}

const cakeReducer = (state= cakeInitialState, action) => {
    switch(action.type){
        case CAKE_ORDERED: return {
            numOfCakes: state.numOfCakes -1,
        }
        case CAKE_RESTOCKED: return {
            numOfCakes: state.numOfCakes + action.payload,
        }
        default: return state;
    }
}

const icecreamReducer = (state= icecreamInitialState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED: return {
            numOfIcecreams: state.numOfIcecreams -1,
        }
        case ICECREAM_RESTOCKED: return {
            numOfIcecreams: state.numOfIcecreams + action.payload,
        }
        case CAKE_ORDERED: return {
            ...state,
            numOfIcecreams: state.numOfIcecreams -1,
        }
        default: return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer,
})
          
const store = configureStore({
    reducer: rootReducer,
});
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() =>
console.log('Updated State', store.getState()));

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));
store.dispatch(orderIcecream());
store.dispatch(restockIcecream(5));

unsubscribe();
