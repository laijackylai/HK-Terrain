// import { TerrainLoader } from '@loaders.gl/terrain';
import {DeckGL} from 'deck.gl';
import React from 'react';
import {hot} from 'react-hot-loader/root';
import {StaticMap} from 'react-map-gl';
import {useSelector} from 'react-redux';
import TerrainLayer from '../terrain-layer/terrain-layer';
import './App.css';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibGFpamFja3lsYWkiLCJhIjoiY2tjZWZucjAzMDd1eDJzcGJvN2tiZHduOSJ9.vWThniHwg9V1wEO3O6xn_g';
// const INITIAL_VIEW_STATE = {
//   longitude: -122.4,
//   latitude: 37.74,
//   zoom: 11,
//   bearing: 0
// };
const HK_INITIAL_VIEW_STATE = {
  altitude: 1.5,
  bearing: 0,
  height: 945,
  latitude: 22.30784362549607,
  longitude: 114.13973361634052,
  zoom: 10.138384970180818
};

function App() {
  // useEffect(() => {
  //   const run = async () => {
  //     const MAPBOX_TERRAIN_PNG_URL =
  //       'https://raw.githubusercontent.com/laijackylai/loaders.gl/master/modules/terrain/test/data/mapbox.png';
  //     const options = {
  //       terrain: {
  //         elevationDecoder: {
  //           rScaler: 65536 * 0.1,
  //           gScaler: 256 * 0.1,
  //           bScaler: 0.1,
  //           offset: -10000
  //         },
  //         meshMaxError: 5.0,
  //         bounds: [83, 329.5, 83.125, 329.625] // note: not the real tile bounds
  //       }
  //     };
  //     const data = await load(MAPBOX_TERRAIN_PNG_URL, TerrainLoader, options);
  //     // eslint-disable-next-line no-console
  //     console.log(data);
  //   };
  //   run();
  // }, []);

  const meshMaxError = useSelector((state) => state.meshMaxError);
  const tesselator = useSelector((state) => state.tesselator);

  const Terrain = new TerrainLayer({
    elevationDecoder: {
      rScaler: 4,
      gScaler: 0,
      bScaler: 0,
      offset: 0
    },
    material: {
      diffuse: 0.75
    },

    // // Digital elevation model from https://www.usgs.gov/
    // elevationData:
    //   'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png',
    // texture: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png',
    // bounds: [-122.5233, 37.6493, -122.3566, 37.8159],

    // hk terrain
    elevationData:
      'https://raw.githubusercontent.com/laijackylai/loadersgl-tesselector/main/img/hk_terrain_resized_bigger.png',
    bounds: [113.825288215, 22.137987659, 114.444071614, 22.57161074],

    tesselator: tesselator,
    meshMaxError: meshMaxError,
    updateTriggers: {
      meshMaxError,
      tesselator
    }
  });

  return (
    <DeckGL controller initialViewState={HK_INITIAL_VIEW_STATE} layers={[Terrain]}>
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        // mapStyle="mapbox://styles/mapbox/dark-v8"
      />
    </DeckGL>
  );
}

export default hot(App);
