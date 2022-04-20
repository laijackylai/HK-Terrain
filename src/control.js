import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider
} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMeshMaxError,
  setRadarVisibility,
  setTerrainVisibility,
  setTesselator,
  setTidalHeightMultiplier,
  setTidesVisibility
} from './redux/action';
import useWindowDimensions from './windowDimensions';

const Tesselator = () => {
  const dispatch = useDispatch();
  const tesselator = useSelector((state) => state.tesselator);

  return (
    <FormControl
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '7px',
        paddingBottom: '5px'
      }}
    >
      <FormLabel id="demo-radio-buttons-group-label">Tesselator</FormLabel>
      <RadioGroup
        // aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="auto"
        name="radio-buttons-group"
        value={tesselator}
        onChange={(e, val) => dispatch(setTesselator(val))}
      >
        <FormControlLabel
          value="auto"
          control={<Radio size="small" color="primary" />}
          label={<div>Auto</div>}
        />
        <FormControlLabel
          value="martini"
          control={<Radio size="small" color="primary" />}
          label={<div>Martini</div>}
        />
        <FormControlLabel
          value="delatin"
          control={<Radio size="small" color="primary" />}
          label={<div>Delatin</div>}
        />
      </RadioGroup>
    </FormControl>
  );
};

const MeshMaxErrorSlider = () => {
  const dispatch = useDispatch();
  const meshMaxError = useSelector((state) => state.meshMaxError);

  // const [displayMaxError, setDisplayMaxError] = useState(meshMaxError);

  return (
    <div
      style={{
        fontFamily: 'Ubuntu',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '7px',
        paddingBottom: '7px',
        color: '#292929'
      }}
    >
      <div>Max Mesh Error</div>
      <Slider
        value={meshMaxError}
        min={0}
        max={50}
        step={1}
        // valueLabelDisplay="on"
        // onChange={(event, value) => setDisplayMaxError(value)}
        onChangeCommitted={(event, value) => {
          dispatch(setMeshMaxError(value));
        }}
      />
      <div>± {meshMaxError} m</div>
    </div>
  );
};

const TidalHeightSlider = () => {
  const dispatch = useDispatch();
  const tidalHeightMultiplier = useSelector((state) => state.tidalHeightMultiplier);

  return (
    <div
      style={{
        fontFamily: 'Ubuntu',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '7px',
        paddingBottom: '7px',
        color: '#292929'
      }}
    >
      <div>Tidal Height Multiplier</div>
      <Slider
        value={tidalHeightMultiplier}
        min={1}
        max={100}
        step={null}
        marks={[{value: 1}, {value: 20}, {value: 40}, {value: 60}, {value: 80}, {value: 100}]}
        onChangeCommitted={(event, value) => {
          dispatch(setTidalHeightMultiplier(value));
        }}
      />
      <div>{tidalHeightMultiplier}x</div>
    </div>
  );
};

const TerrainVisibility = () => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const terrainVisibility = useSelector((state) => state.terrainVisibility);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <FormControlLabel
        style={{paddingLeft: 0.01 * width}}
        control={
          <Checkbox
            onChange={(e, i) => dispatch(setTerrainVisibility(i))}
            color="primary"
            checked={terrainVisibility}
          />
        }
        label="Terrain"
      />
    </div>
  );
};

const TidesVisibility = () => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const tidesVisibility = useSelector((state) => state.tidesVisibility);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <FormControlLabel
        style={{paddingLeft: 0.01 * width}}
        control={
          <Checkbox
            onChange={(e, i) => dispatch(setTidesVisibility(i))}
            color="primary"
            checked={tidesVisibility}
          />
        }
        label="Tides"
      />
    </div>
  );
};

const RadarVisibility = () => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const radarVisibility = useSelector((state) => state.radarVisibility);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <FormControlLabel
        style={{paddingLeft: 0.01 * width}}
        control={
          <Checkbox
            onChange={(e, i) => dispatch(setRadarVisibility(i))}
            color="primary"
            checked={radarVisibility}
          />
        }
        label="Radar"
      />
    </div>
  );
};

const Controls = () => {
  return (
    <div style={controlStyles}>
      <TerrainVisibility />
      <RadarVisibility />
      <TidesVisibility />
      <TidalHeightSlider />
      <Tesselator />
      <MeshMaxErrorSlider />
    </div>
  );
};

const controlStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: '10px'
};

export default Controls;
