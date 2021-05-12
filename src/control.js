import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {useDispatch} from 'react-redux';
import ReactSlider from 'react-slider';
import {setMeshMaxError, setTesselactor} from './redux/action';

const TesselactorDropdown = () => {
  const dispatch = useDispatch();

  const onSelect = (tesselactor) => {
    dispatch(setTesselactor(tesselactor));
  };

  return (
    <Dropdown onSelect={onSelect} style={{marginBottom: 20}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Tesselactor
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="auto">Auto</Dropdown.Item>
        <Dropdown.Item eventKey="martini">Martini</Dropdown.Item>
        <Dropdown.Item eventKey="delatin">Delatin</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const MeshMaxErrorSlider = () => {
  const dispatch = useDispatch();

  const onChange = (val) => {
    dispatch(setMeshMaxError(val));
  };

  return (
    <ReactSlider
      min={0}
      max={5}
      step={0.1}
      defaultValue={2.5}
      onAfterChange={onChange}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
  );
};

const Controls = () => (
  <div style={controlStyles}>
    <TesselactorDropdown />
    <MeshMaxErrorSlider />
  </div>
);

const controlStyles = {
  position: 'absolute',
  top: '10vh',
  right: '10vw',
  flexDirection: 'column'
};

export default Controls;
