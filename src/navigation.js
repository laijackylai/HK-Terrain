import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import northLogo from '../img/cardinal-point.png';
import {resetViewport, zoomIn, zoomOut} from './redux/action';
import {Box, Button, ButtonGroup} from '@material-ui/core';

const North = () => {
  const dispatch = useDispatch();
  const bearing = useSelector((state) => state.bearing);

  const resetBearing = () => {
    dispatch(resetViewport(true));
  };

  return (
    <div
      onDoubleClick={resetBearing}
      style={{transform: `rotate(${-bearing}deg)`, background: 'white', borderRadius: 100}}
    >
      <img src={northLogo} width="50px" height="50px" />
    </div>
  );
};

const Zoom = () => {
  const dispatch = useDispatch();

  const buttons = [
    <Button key="plus" size="small" onClick={() => dispatch(zoomIn())}>
      +
    </Button>,
    <Button key="minus" size="small" onClick={() => dispatch(zoomOut())}>
      -
    </Button>
  ];

  return (
    <Box>
      <ButtonGroup orientation="vertical" variant="contained" size="small">
        {buttons}
      </ButtonGroup>
    </Box>
  );
};

const Navigation = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '3vh',
        right: '3vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <North />
      <Zoom />
    </div>
  );
};

export default Navigation;
