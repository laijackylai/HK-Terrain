import {Slider} from '@material-ui/core';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {setMeshMaxError, setTesselator} from './redux/action';

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

  const onChange = (val) => {
    dispatch(setMeshMaxError(val));
  };

  return (
    <div>
      <div style={meshTextStyle}>Max Mesh Error</div>
      <Slider
        value={meshMaxError}
        min={0}
        max={50}
        step={1}
        valueLabelDisplay="on"
        onChange={(event, value) => onChange(value)}
      />
    </div>
  );
};

const Controls = () => (
  <div style={controlStyles}>
    <TesselatorDropdown />
    <MeshMaxErrorSlider />
  </div>
);

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
