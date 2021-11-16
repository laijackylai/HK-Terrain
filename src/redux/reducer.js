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

const rootReducer = combineReducers({
  meshMaxError: meshMaxErrorReducer,
  tesselator: tesselatorReducer,
  tideIndex: tideIndexReducer
});

export default rootReducer;
