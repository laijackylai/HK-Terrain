/* eslint-disable react/prop-types */
import {AmbientLight, LightingEffect, _SunLight as SunLight} from '@deck.gl/core';
import {DeckGL} from 'deck.gl';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {StaticMap} from 'react-map-gl';
import {useSelector} from 'react-redux';
import TerrainLayer from '../terrain-layer/terrain-layer';
import './App.css';
import {TileLayer} from '@deck.gl/geo-layers';
import {PathLayer} from '@deck.gl/layers';
import {fromArrayBuffer} from 'geotiff';
import axios from 'axios';
import {registerLoaders} from '@loaders.gl/core';
import {TerrainLoader} from '@loaders.gl/terrain';

registerLoaders([TerrainLoader]);

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibGFpamFja3lsYWkiLCJhIjoiY2tjZWZucjAzMDd1eDJzcGJvN2tiZHduOSJ9.vWThniHwg9V1wEO3O6xn_g';
const HK_INITIAL_VIEW_STATE = {
  altitude: 1.5,
  bearing: 0,
  height: 945,
  latitude: 22.409226206938843,
  longitude: 114.01401415218648,
  zoom: 8
};

const tide_names = [
  'ww3_hs_20210803000000.png',
  'ww3_hs_20210803030000.png',
  'ww3_hs_20210803060000.png',
  'ww3_hs_20210803090000.png',
  'ww3_hs_20210803120000.png',
  'ww3_hs_20210803150000.png',
  'ww3_hs_20210803180000.png',
  'ww3_hs_20210803210000.png'
];

function App() {
  const meshMaxError = useSelector((state) => state.meshMaxError);
  const tesselator = useSelector((state) => state.tesselator);
  const tidesNum = useSelector((state) => state.tideIndex);

  const [viewState, setViewState] = useState();

  useEffect(() => {
    // console.log('terrain data: ', getTiff(filenames[1]))
    // const data = loadGeoTiff(`http://0.0.0.0:8080/tif/${filenames[0]}.tif`)
  }, [viewState]);

  // * get geotiff bounding box
  const getTiffBbox = async (fname) => {
    const res = await axios.get(`http://0.0.0.0:8080/tif/${fname}.tif`, {
      responseType: 'arraybuffer'
    });
    const tiff = await fromArrayBuffer(res.data);
    const image = await tiff.getImage();
    // const data = await image.readRasters();
    const bbox = await image.getBoundingBox();
    const correct_bbox = [bbox[1], bbox[0], bbox[3], bbox[2]];
    return correct_bbox;
  };

  // * get geotiff data
  // const getTiff = async (fname) => {
  //   const res = await axios.get(`http://0.0.0.0:8080/tif/${fname}.tif`, {
  //     responseType: 'arraybuffer'
  //   });
  //   return res.data;
  //   // const data = await load(`http://0.0.0.0:8080/tif/${fname}.tif`)
  //   // return data
  // };

  // * sunlight of current time
  const sunlight = new SunLight({
    timestamp: moment().valueOf(),
    // timestamp: 1554927200000,
    color: [255, 255, 255],
    intensity: 2
  });

  // * ambient light
  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    // intensity: 0.05
    intensity: 0.5
  });

  // * construct lighting effect from sunlight and ambient light
  const lightingEffect = new LightingEffect({
    sunlight,
    ambientLight
  });

  const filenames = [
    '10NE10A(e828n822%3Ae829n822)',
    '10NE10B(e829n822%3Ae830n822)',
    '10NE10C(e828n821%3Ae829n822)'
  ];
  const Terrain0 = new TerrainLayer({
    id: 'T0',
    // elevationDecoder: {
    //   rScaler: 1,
    //   gScaler: 0,
    //   bScaler: 0,
    //   offset: 0
    // },

    // * terrarium decoder
    elevationDecoder: {
      rScaler: 256,
      gScaler: 1,
      bScaler: 1 / 256,
      offset: -32768
    },

    material: {
      ambient: 0.5,
      diffuse: 0.5,
      shininess: 100
    },

    // ! continue here
    // TODO: the terrain is now rotated by -90 degrees
    // elevationData: parseGeoTiff(),
    // elevationData: `http://0.0.0.0:8080/fixed/${filenames[0]}.png`,
    // elevationData: `http://0.0.0.0:8080/test/terrarium.png`,
    elevationData: `http://0.0.0.0:8080/test/test.png`,
    bounds: getTiffBbox(filenames[0]),

    tesselator: tesselator,
    meshMaxError: meshMaxError,
    updateTriggers: {
      meshMaxError,
      tesselator
    }
  });
  const Terrain1 = new TerrainLayer({
    id: 'T1',
    elevationDecoder: {
      rScaler: 1,
      gScaler: 0,
      bScaler: 0,
      offset: 0
    },
    material: {
      ambient: 0.5,
      diffuse: 0.5,
      shininess: 100
    },

    // elevationData: getTiff(filenames[1]),
    elevationData: `http://0.0.0.0:8080/fixed/${filenames[1]}.png`,
    bounds: getTiffBbox(filenames[1]),

    tesselator: tesselator,
    meshMaxError: meshMaxError,
    updateTriggers: {
      meshMaxError,
      tesselator
    }
  });
  const Terrain2 = new TerrainLayer({
    id: 'T2',
    elevationDecoder: {
      rScaler: 1,
      gScaler: 0,
      bScaler: 0,
      offset: 0
    },
    material: {
      ambient: 0.5,
      diffuse: 0.5,
      shininess: 100
    },

    // elevationData: parseGeoTiff(),
    elevationData: `http://0.0.0.0:8080/fixed/${filenames[2]}.png`,
    bounds: getTiffBbox(filenames[2]),

    tesselator: tesselator,
    meshMaxError: meshMaxError,
    updateTriggers: {
      meshMaxError,
      tesselator
    }
  });

  // * tides layer
  const Tides = new TerrainLayer({
    elevationDecoder: {
      rScaler: 50,
      gScaler: 0,
      bScaler: 0,
      offset: 0
    },
    material: {
      ambient: 0.5,
      diffuse: 0.5,
      shininess: 100
    },

    // Digital elevation model from https://www.usgs.gov/
    // elevationData:
    //   'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png',
    // texture: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png',
    // bounds: [-122.5233, 37.6493, -122.3566, 37.8159],

    // hk terrain
    // elevationData:
    //   'https://raw.githubusercontent.com/laijackylai/loadersgl-tesselector/main/img/hk_terrain_resized_bigger.png',
    // bounds: [113.825288215, 22.137987659, 114.444071614, 22.57161074],

    // test dsm
    // elevationData:
    //   'https://raw.githubusercontent.com/laijackylai/hkterrain/main/map/6NW24C(e819n830%2Ce820n830).png',
    // bounds: [114.01401415218648, 22.409226206938843, 114.02130436516617, 22.41465152964679],

    // test tides
    elevationData: `https://raw.githubusercontent.com/laijackylai/hkterrain/main/tides/${tide_names[tidesNum]}`,
    // texture: 'https://raw.githubusercontent.com/laijackylai/hkterrain/main/map/mask.png',
    bounds: [113, 21, 115, 23],

    tesselator: tesselator,
    meshMaxError: meshMaxError,
    updateTriggers: {
      meshMaxError,
      tesselator
    }
  });

  // * tile path layer
  const Tiles = new TileLayer({
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        bbox: {west, south, east, north}
      } = props.tile;

      return new PathLayer({
        id: `${props.id}-border`,
        visible: props.visible,
        data: [
          [
            [west, north],
            [west, south],
            [east, south],
            [east, north],
            [west, north]
          ]
        ],
        getPath: (d) => d,
        getColor: [255, 0, 0],
        widthMinPixels: 4
      });
    }
  });

  const onViewStateChange = useCallback(({viewState}) => {
    setViewState(viewState);
  });

  return (
    <DeckGL
      controller
      initialViewState={HK_INITIAL_VIEW_STATE}
      layers={[Tides, Tiles, Terrain0, Terrain1, Terrain2]}
      effects={[lightingEffect]}
      onViewStateChange={onViewStateChange}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
      />
    </DeckGL>
  );
}

export default hot(App);
