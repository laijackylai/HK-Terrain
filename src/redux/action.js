export const setMeshMaxError = (err) => {
    return {
        type: "SET_MESH_MAX_ERROR",
        payload: err
    }
}

export const setTesselector = (tesselector) => {
    return {
        type: "SET_TESSELECTOR",
        payload: tesselector
    }
}