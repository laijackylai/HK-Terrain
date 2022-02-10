export const setMeshMaxError = (err) => ({
  type: 'SET_MESH_MAX_ERROR',
  payload: err
});

export const setTesselator = (tesselator) => ({
  type: 'SET_TESSELATOR',
  payload: tesselator
});

export const setTideIndex = (i) => ({
  type: 'SET_TIDE_INDEX',
  payload: i
});

export const setBearing = (b) => ({
  type: 'SET_BEARING',
  payload: b
});

export const resetViewport = (b) => ({
  type: 'RESET_VIEWPORT',
  payload: b
});

export const setZoom = (z) => ({
  type: 'SET_ZOOM',
  payload: z
});

export const zoomIn = () => ({
  type: 'ZOOM_IN'
});

export const zoomOut = () => ({
  type: 'ZOOM_OUT'
});
