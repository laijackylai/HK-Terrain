import {combineReducers} from 'redux';

const meshMaxErrorReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_MESH_MAX_ERROR':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const tesselatorReducer = (state = 'auto', action) => {
  switch (action.type) {
    case 'SET_TESSELATOR':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const tideIndexReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_TIDE_INDEX':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const bearingReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_BEARING':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const resetViewportFlagReducer = (state = false, action) => {
  switch (action.type) {
    case 'RESET_VIEWPORT':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const zoomReducer = (state = 9.803172945712367, action) => {
  switch (action.type) {
    case 'SET_ZOOM':
      state = action.payload;
      return state;
    case 'ZOOM_IN':
      state = state + 1;
      return state;
    case 'ZOOM_OUT':
      state = state - 1;
      return state;
    default:
      return state;
  }
};

const textureReducer = (state = 'landscape', action) => {
  switch (action.type) {
    case 'SET_TEXTURE':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const mouseEventReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MOUSE_EVENT':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const tidesVisibilityReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_TIDES_VISIBILITY':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const radarVisibilityReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_RADAR_VISIBILITY':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const radarDataReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_RADAR_DATA':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  meshMaxError: meshMaxErrorReducer,
  tesselator: tesselatorReducer,
  tideIndex: tideIndexReducer,
  bearing: bearingReducer,
  resetViewportFlag: resetViewportFlagReducer,
  zoom: zoomReducer,
  texture: textureReducer,
  mouseEvent: mouseEventReducer,
  tidesVisibility: tidesVisibilityReducer,
  radarVisibility: radarVisibilityReducer,
  radarData: radarDataReducer
});

export default rootReducer;
