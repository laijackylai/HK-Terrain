/* eslint-disable react/prop-types */
import {DeckGL, FlyToInterpolator, GeoJsonLayer, TileLayer} from 'deck.gl';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import {hot} from 'react-hot-loader/root';
import {StaticMap} from 'react-map-gl';
import {useDispatch, useSelector} from 'react-redux';
import TerrainLayer from '../terrain-layer/terrain-layer';
import './App.css';
import coast from '../data/Hong_Kong_18_Districts.geojson';
import {lightingEffect} from './lighting';
import {
  setBearing,
  resetViewport,
  setZoom,
  setMouseEvent
  // setTideIndex
} from './redux/action';
import {PLYLoader} from '@loaders.gl/ply';
import {PointCloudLayer} from '@deck.gl/layers';
// import useInterval from 'react-useinterval';
// import { load } from '@loaders.gl/core';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibGFpamFja3lsYWkiLCJhIjoiY2tjZWZucjAzMDd1eDJzcGJvN2tiZHduOSJ9.vWThniHwg9V1wEO3O6xn_g';

const ZOOMED_OUT = {
  altitude: 1.5,
  bearing: 0,
  height: 821,
  latitude: 22.35993216286448,
  longitude: 114.16905971222522,
  maxPitch: 60,
  maxZoom: 20,
  minPitch: 0,
  minZoom: 0,
  pitch: 0,
  width: 1185,
  zoom: 9.803172945712367
};

// const HOME = {
//   altitude: 1.5,
//   bearing: -0.3037974683544304,
//   height: 821,
//   latitude: 22.399089273330144,
//   longitude: 114.19052539001227,
//   maxPitch: 60,
//   maxZoom: 20,
//   minPitch: 0,
//   minZoom: 0,
//   pitch: 43.398058252427184,
//   width: 1185,
//   zoom: 16.250312154415155
// };

// const LONG_KE = {
//   altitude: 1.5,
//   bearing: -25.974683544303797,
//   height: 821,
//   latitude: 22.3664032522147,
//   longitude: 114.3751405083942,
//   maxPitch: 60,
//   maxZoom: 20,
//   minPitch: 0,
//   minZoom: 0,
//   pitch: 55.7745449331147,
//   width: 1185,
//   zoom: 15.575652626612417
// };

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
  const dispatch = useDispatch();
  const meshMaxError = useSelector((state) => state.meshMaxError);
  const tesselator = useSelector((state) => state.tesselator);
  const tidesNum = useSelector((state) => state.tideIndex);
  const resetViewportFlag = useSelector((state) => state.resetViewportFlag);
  const zoom = useSelector((state) => state.zoom);
  const texture = useSelector((state) => state.texture);
  const terrainVisibility = useSelector((state) => state.terrainVisibility);
  const tidesVisibility = useSelector((state) => state.tidesVisibility);
  const radarVisibility = useSelector((state) => state.radarVisibility);
  const radarData = useSelector((state) => state.radarData);
  const tidalHeightMultiplier = useSelector((state) => state.tidalHeightMultiplier);

  const [initialViewState, setInitialViewState] = useState(ZOOMED_OUT);
  const [viewState, setViewState] = useState(initialViewState);

  const deckRef = useRef(null);

  // ! just to play around
  // setTimeout(() => {
  //   setInitialViewState({
  //     ...LONG_KE, transitionInterpolator: new FlyToInterpolator({ curve: 1 }), transitionDuration: 2000
  //   })
  // }, 3000);
  // ! end playing

  // * tidal animation
  // const ti = useSelector(state => state.tideIndex)
  // useInterval(() => {
  //   if (ti == 8) dispatch(setTideIndex(0))
  //   else dispatch(setTideIndex(ti + 1))
  // }, 1000)

  useEffect(() => {
    if (zoom != viewState.zoom) {
      setInitialViewState({
        ...viewState,
        zoom: zoom,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 100
      });
    }
  }, [zoom]);

  useEffect(() => {
    if (resetViewportFlag) {
      setInitialViewState({
        ...viewState,
        bearing: 0,
        pitch: 0,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500
      });
      dispatch(resetViewport(false));
    }
  }, [resetViewportFlag]);

  // * tides layer
  const Tides =
    tidesVisibility &&
    new TerrainLayer({
      // visible: tidesVisibility,
      elevationDecoder: {
        rScaler: tidalHeightMultiplier,
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

      elevationData: `https://raw.githubusercontent.com/laijackylai/hkterrain/main/tides/${tide_names[tidesNum]}`,
      texture: 'https://raw.githubusercontent.com/laijackylai/hkterrain/main/img/sea_texture.png', // ! test texture
      // texture: 'https://raw.githubusercontent.com/laijackylai/hkterrain/main/map/mask.png',
      // texture: 'https://raw.githubusercontent.com/laijackylai/hkterrain/main/img/wave.jpg',
      bounds: [113, 21, 115, 23],

      tesselator: tesselator,
      meshMaxError: meshMaxError,
      updateTriggers: {
        meshMaxError,
        tesselator,
        tidalHeightMultiplier
        // tidesVisibility
      }
    });

  const textureSelect = (props) => {
    const osmUrl = `https://a.tile.openstreetmap.org/${props.tile.z}/${props.tile.x}/${props.tile.y}.png`;
    const humanitarianUrl = `http://a.tile.openstreetmap.fr/hot/${props.tile.z}/${props.tile.x}/${props.tile.y}.png`;
    const landscapeUrl = `https://tile.thunderforest.com/landscape/${props.tile.z}/${props.tile.x}/${props.tile.y}.png?apikey=ba0c792961e74548ac6dc23f329d9820`;
    const topoUrl = `https://a.tile.opentopomap.org/${props.tile.z}/${props.tile.x}/${props.tile.y}.png`;

    // * referencing Google Map's approach
    // * to speed up texture change, query all textures first so that they will be in cache when need
    // * but maybe too much textures to query, that may hinder performance as well
    // axios.all([osmUrl, humanitarianUrl, landscapeUrl, topoUrl]).catch(() => null)

    if (texture == 'osm') return osmUrl;
    if (texture == 'humanitarian') return humanitarianUrl;
    if (texture == 'landscape') return landscapeUrl;
    if (texture == 'topo') return topoUrl;
    if (texture == 'source')
      return `http://127.0.0.1:3001/tiles/png/${props.tile.z}/${props.tile.x}-${props.tile.y}-${props.tile.z}.png`;
  };

  // useEffect(() => {
  //   loadData()
  // }, [])

  // const loadData = async () => {
  //   const url = `https://localhost:3001/test/data.ply`
  //   const res = await load(url, PLYLoader)
  //   console.log(res)
  // }

  const pc =
    radarVisibility &&
    radarData &&
    new PointCloudLayer({
      id: 'pc',
      data: radarData,
      sizeUnits: 'common',
      pointSize: 0.001,
      // sizeUnits: 'pixels',
      // pointSize: 2,
      loaders: [PLYLoader],
      updateTriggers: {
        radarData
      }
    });

  const tiles =
    terrainVisibility &&
    new TileLayer({
      // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
      // data: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', // ! for testing
      // data: 'http://0.0.0.0:8080/tiles/{x}-{y}-{z}.png',

      // minZoom: 10,
      maxZoom: 15,
      tileSize: 256,
      // extent: [113.8349922853287239, 22.1537640910980613, 114.4420072690531640, 22.5620254686685620],

      renderSubLayers: (props) => {
        const {
          bbox: {west, south, east, north}
        } = props.tile;

        const terrainLayerHK = new TerrainLayer(props, {
          id: `hkterrain-${props.tile.z}-${props.tile.x}-${props.tile.y}`,

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

          elevationData: `https://127.0.0.1:3001/tiles/${props.tile.z}-${props.tile.x}-${props.tile.y}.png`,
          bounds: [west, south, east, north],

          // * text texture switch
          texture: textureSelect(props),

          tesselator: tesselator,
          meshMaxError: meshMaxError
        });

        const terrainLayerOutsideHK = new TerrainLayer(props, {
          id: `terrainOutsideHK-${props.tile.z}-${props.tile.x}-${props.tile.y}`,

          // * mapbox decoder
          elevationDecoder: {
            rScaler: 256 * 256 * 0.1,
            gScaler: 256 * 0.1,
            bScaler: 0.1,
            offset: -10000
          },

          material: {
            ambient: 0.5,
            diffuse: 0.5,
            shininess: 100
          },

          elevationData: `https://127.0.0.1:3001/tiles/${props.tile.z}-${props.tile.x}-${props.tile.y}.png`,
          bounds: [west, south, east, north],

          // * text texture switch
          texture: textureSelect(props),

          tesselator: tesselator,
          meshMaxError: meshMaxError
        });

        // ! test OSM buildings layer
        // * https://osmbuildings.org/documentation/data/
        // const buildingsLayer =
        //   props.tile.z == 15 &&
        //   new GeoJsonLayer(props, {
        //     id: '3d-buildings',
        //     data: `https://a.data.osmbuildings.org/0.2/anonymous/tile/15/${props.tile.x}/${props.tile.y}.json`, // ! wrong format
        //     filled: false,
        //     // extruded: true,
        //     // wireframe: true,
        //     getLineWidth: 1,
        //     lineWidthScale: 5,
        //     lineWidthMinPixels: 1,
        //     getLineColor: [219, 26, 32],
        //     parameters: {
        //       depthTest: false
        //     }
        //   });
        // console.log(buildingsLayer)
        // ! end test

        return [
          terrainLayerOutsideHK,
          terrainLayerHK
          // buildingsLayer
        ];
      },

      updateTriggers: {
        meshMaxError,
        tesselator,
        texture
      }
    });

  // TODO: can try to use kyle barron's library to snap vector features to the terrain (https://github.com/kylebarron/snap-to-tin)
  // * now the coastline are snapped to the seafloor, i.e. 0m
  const coastLine = new GeoJsonLayer({
    id: 'coast-line',
    data: coast,
    // pickable: false,
    // stroked: false,
    filled: false,
    // extruded: true,
    // wireframe: true,
    getLineWidth: 1,
    lineWidthScale: 5,
    lineWidthMinPixels: 1,
    getLineColor: [219, 26, 32],
    // lineCapRounded: true,
    // getElevation: 30,
    // getPolygonOffset: () => [0, -10000], // * temp solution
    parameters: {
      // * turn off depth test to get rid of z-fighting for this layer
      depthTest: false
    }
  });

  const onViewStateChange = useCallback(({viewState}) => {
    setViewState(viewState);
    dispatch(setBearing(viewState.bearing));
    dispatch(setZoom(viewState.zoom));
    // const viewport = new WebMercatorViewport(viewState);
    // const nw = viewport.unproject([0, 0]); // North West
    // const se = viewport.unproject([viewport.width, viewport.height]); // South East
    // const viewBbox = [nw[0], se[1], se[0], nw[1]];
    // setViewBbox(viewBbox);
  });

  return (
    <DeckGL
      controller
      initialViewState={initialViewState}
      layers={[tiles, Tides, coastLine, pc]}
      effects={[lightingEffect]}
      onViewStateChange={onViewStateChange}
      _pickable={false}
      ref={deckRef}
      onHover={(e) => dispatch(setMouseEvent(e))}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
      />
    </DeckGL>
  );
}

export default hot(App);
