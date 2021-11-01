/* eslint-disable react/prop-types */
// import { TerrainLoader } from '@loaders.gl/terrain';
import { AmbientLight, LightingEffect, _SunLight as SunLight } from '@deck.gl/core';
import { DeckGL } from 'deck.gl';
import moment from 'moment';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { StaticMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import TerrainLayer from '../terrain-layer/terrain-layer';
import './App.css';
import { TileLayer } from '@deck.gl/geo-layers';
import { PathLayer } from '@deck.gl/layers';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibGFpamFja3lsYWkiLCJhIjoiY2tjZWZucjAzMDd1eDJzcGJvN2tiZHduOSJ9.vWThniHwg9V1wEO3O6xn_g';
const HK_INITIAL_VIEW_STATE = {
  altitude: 1.5,
  bearing: 0,
  height: 945,
  latitude: 22.409226206938843,
  longitude: 114.01401415218648,
  zoom: 15
};

function App() {
  const meshMaxError = useSelector((state) => state.meshMaxError);
  const tesselator = useSelector((state) => state.tesselator);

  const sunlight = new SunLight({
    timestamp: moment().valueOf(),
    color: [255, 255, 255],
    intensity: 1.75
  });

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 0.05
  });

  const lightingEffect = new LightingEffect({
    sunlight,
    ambientLight
  });

  const Terrain = new TerrainLayer({
    elevationDecoder: {
      rScaler: 100,
      gScaler: 0,
      bScaler: 0,
      offset: 0
    },
    material: {
      ambient: 0.5,
      diffuse: 0.5,
      shininess: 100
    },

    // // Digital elevation model from https://www.usgs.gov/
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

    // test all terrain
    // elevationData: 'https://raw.githubusercontent.com/laijackylai/hkterrain/main/map/all.png',
    // bounds: [113.842, 22.147, 114.280, 22.712],

    elevationData: 'https://raw.githubusercontent.com/laijackylai/hkterrain/main/map/2NE19A(e827n843_e827n844).png',
    bounds: [114.250, 22.383, 114.253, 22.389],

    tesselator: tesselator,
    meshMaxError: meshMaxError,
    updateTriggers: {
      meshMaxError,
      tesselator
    }
  });

  const Tiles = new TileLayer({
    // tileSize: 512,

    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north }
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

  return (
    <DeckGL
      controller
      initialViewState={HK_INITIAL_VIEW_STATE}
      layers={[Terrain, Tiles]}
      effects={[lightingEffect]}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
      />
    </DeckGL>
  );
}

export default hot(App);
