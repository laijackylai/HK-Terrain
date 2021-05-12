export const setMeshMaxError = (err) => {
    return {
        type: "SET_MESH_MAX_ERROR",
        payload: err
    }
}

export const setTesselactor = (tesselactor) => {
    return {
        type: "SET_TESSELACTOR",
        payload: tesselactor
    }
}