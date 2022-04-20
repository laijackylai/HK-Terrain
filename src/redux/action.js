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

export const setTexture = (t) => ({
  type: 'SET_TEXTURE',
  payload: t
});

export const setMouseEvent = (e) => ({
  type: 'SET_MOUSE_EVENT',
  payload: e
});

export const setTerrainVisibility = (b) => ({
  type: 'SET_TERRAIN_VISIBILITY',
  payload: b
});

export const setTidesVisibility = (b) => ({
  type: 'SET_TIDES_VISIBILITY',
  payload: b
});

export const setRadarVisibility = (b) => ({
  type: 'SET_RADAR_VISIBILITY',
  payload: b
});

export const setRadarData = (str) => ({
  type: 'SET_RADAR_DATA',
  payload: str
});

export const setTidalHeightMultiplier = (m) => ({
  type: 'SET_TIDAL_HEIGHT_MULTIPLIER',
  payload: m
});
