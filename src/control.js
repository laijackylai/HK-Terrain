import {Slider} from '@material-ui/core';
import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMeshMaxError,
  setTesselator
  // setTideIndex
} from './redux/action';
// import useInterval from 'react-useinterval';

const TesselatorDropdown = () => {
  const dispatch = useDispatch();

  const onSelect = (tesselator) => {
    dispatch(setTesselator(tesselator));
  };

  return (
    <Dropdown onSelect={onSelect} style={{marginBottom: 20}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Tesselator
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="auto">
          <div style={textStyle}>Auto</div>
        </Dropdown.Item>
        <Dropdown.Item eventKey="martini">
          <div style={textStyle}>Martini</div>
        </Dropdown.Item>
        <Dropdown.Item eventKey="delatin">
          <div style={textStyle}>Delatin</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const MeshMaxErrorSlider = () => {
  const dispatch = useDispatch();
  const meshMaxError = useSelector((state) => state.meshMaxError);

  const [displayMaxError, setDisplayMaxError] = useState(meshMaxError);

  const onChange = (val) => {
    dispatch(setMeshMaxError(val));
  };

  return (
    <div>
      <div style={meshTextStyle}>Max Mesh Error</div>
      <Slider
        value={displayMaxError}
        min={0}
        max={50}
        step={1}
        valueLabelDisplay="on"
        onChange={(event, value) => setDisplayMaxError(value)}
        onChangeCommitted={(event, value) => onChange(value)}
      />
    </div>
  );
};

const Controls = () => {
  // const dispatch = useDispatch();
  // const tideIndex = useSelector((state) => state.tideIndex);

  // const increment = () => {
  //   const oldIndex = tideIndex;
  //   if (tideIndex < 7) {
  //     dispatch(setTideIndex(oldIndex + 1));
  //   } else {
  //     dispatch(setTideIndex(0));
  //   }
  // };

  // useInterval(increment, 1000);

  return (
    <div style={controlStyles}>
      <TesselatorDropdown />
      <MeshMaxErrorSlider />
    </div>
  );
};

const controlStyles = {
  position: 'absolute',
  top: '10vh',
  right: '10vw',
  flexDirection: 'column'
};

const textStyle = {
  color: 'white'
};

const meshTextStyle = {
  color: 'white',
  marginBottom: '5vh'
};

export default Controls;
