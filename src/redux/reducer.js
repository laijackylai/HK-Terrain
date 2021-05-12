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

const tesselactorReducer = (state = 'auto', action) => {
    switch (action.type) {
        case "SET_TESSELACTOR":
            state = action.payload
            return state
        default:
            return state
    }
}

const rootReducer = combineReducers({
    meshMaxError: meshMaxErrorReducer,
    tesselactor: tesselactorReducer
})

export default rootReducer