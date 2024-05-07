import React from "react";
import {createStore} from 'redux'

const reducerFn = (state = {counter : 0, h: "helloooo! - "}, action) => {
    if (action.type === "inc"){
        return {
            counter: state.counter + 1
        }
    }

    if (action.type === "dec"){
        return {
            counter: state.counter - 1
        }
    }

    if (action.type === "ab"){
        return {
            counter: state.counter + action.payload
        }
    }
    if (action.type === "sb"){
        return {
            counter: state.counter - action.payload
        }
    }
    return state
}

const store = createStore(reducerFn)

export default store;
