import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import Controls from './control';
import Navigation from './navigation';
import rootReducer from './redux/reducer';

const THEME = createMuiTheme({
  typography: {
    fontFamily: ['Ubuntu']
  }
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <App />
        <Controls />
        <Navigation />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
