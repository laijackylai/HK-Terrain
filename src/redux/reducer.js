import { combineReducers } from "redux";

const meshMaxErrorReducer = (state = 2.5, action) => {
    switch (action.type) {
        case "SET_MESH_MAX_ERROR":
            state = action.payload
            return state
        default:
            return state
    }
}

const tesselectorReducer = (state = 'martini', action) => {
    switch (action.type) {
        case "SET_TESSELECTOR":
            state = action.payload
            return state
        default:
            return state
    }
}

const rootReducer = combineReducers({
    meshMaxError: meshMaxErrorReducer,
    tesselector: tesselectorReducer
})

export default rootReducer