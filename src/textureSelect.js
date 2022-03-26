import React from 'react';
// import osm from '../img/osm.png';
import humanitarian from '../img/humanitarian.png';
import landscape from '../img/landscape.png';
import topo from '../img/opentopo.png';
import source from '../img/source.png';
import useWindowDimensions from './windowDimensions';
import {setTexture} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';

// const OSM = () => {
//   const texture = useSelector((state) => state.texture);
//   const {height} = useWindowDimensions();
//   const dispatch = useDispatch();

//   return (
//     <div style={{border: texture == 'osm' ? '3px solid rgb(255, 115, 112)' : null, ...selectStyle}}>
//       <div style={touchStyle} onClick={() => dispatch(setTexture('osm'))}>
//         <img src={osm} width={0.075 * height} height={0.07 * height} />
//         <div style={wordStyle}> OSM </div>
//       </div>
//     </div>
//   );
// };

const Humanitarian = () => {
  const texture = useSelector((state) => state.texture);
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: texture == 'humanitarian' ? '3px solid rgb(255, 115, 112)' : null,
        ...selectStyle
      }}
    >
      <div style={touchStyle} onClick={() => dispatch(setTexture('humanitarian'))}>
        <img
          src={humanitarian}
          width={0.075 * height}
          height={0.07 * height}
          style={{borderRadius: 10}}
        />
        <div style={wordStyle}> Humanitarian </div>
      </div>
    </div>
  );
};

const Landscape = () => {
  const texture = useSelector((state) => state.texture);
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: texture == 'landscape' ? '3px solid rgb(255, 115, 112)' : null,
        ...selectStyle
      }}
    >
      <div style={touchStyle} onClick={() => dispatch(setTexture('landscape'))}>
        <img
          src={landscape}
          width={0.075 * height}
          height={0.07 * height}
          style={{borderRadius: 10}}
        />
        <div style={wordStyle}> Landscape </div>
      </div>
    </div>
  );
};

const Topo = () => {
  const texture = useSelector((state) => state.texture);
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <div
      style={{border: texture == 'topo' ? '3px solid rgb(255, 115, 112)' : null, ...selectStyle}}
    >
      <div style={touchStyle} onClick={() => dispatch(setTexture('topo'))}>
        <img src={topo} width={0.075 * height} height={0.07 * height} style={{borderRadius: 10}} />
        <div style={wordStyle}> OpenTopoMap </div>
      </div>
    </div>
  );
};

const Source = () => {
  const texture = useSelector((state) => state.texture);
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <div
      style={{border: texture == 'source' ? '3px solid rgb(255, 115, 112)' : null, ...selectStyle}}
    >
      <div style={touchStyle} onClick={() => dispatch(setTexture('source'))}>
        <img
          src={source}
          width={0.075 * height}
          height={0.07 * height}
          style={{borderRadius: 10}}
        />
        <div style={wordStyle}> Source </div>
      </div>
    </div>
  );
};

const TextureSelect = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1vh',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* <OSM /> */}
        <Topo />
        <Humanitarian />
        <Landscape />
        <Source />
      </div>
    </div>
  );
};

const selectStyle = {
  backgroundColor: 'white',
  borderRadius: 10,
  height: '8vh',
  width: '8vh',
  paddingTop: '1vh',
  paddingBottom: '1vh',
  paddingLeft: '1vh',
  paddingRight: '1vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const touchStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1px'
};

const wordStyle = {
  fontFamily: 'Ubuntu',
  fontSize: 10
};

export default TextureSelect;
