/* eslint-disable react/prop-types */
import {
  DeckGL,
  FlyToInterpolator,
  GeoJsonLayer,
  TileLayer
  // WebMercatorViewport
} from 'deck.gl';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import {hot} from 'react-hot-loader/root';
import {StaticMap} from 'react-map-gl';
import {useDispatch, useSelector} from 'react-redux';
import TerrainLayer from '../terrain-layer/terrain-layer';
import './App.css';
import coast from '../data/Hong_Kong_18_Districts.geojson';
// import sea from '../img/sea.png';

// import { TileLayer } from '@deck.gl/geo-layers';
// import { PathLayer } from '@deck.gl/layers';
// import { fromArrayBuffer } from 'geotiff';
// import axios from 'axios';
import {lightingEffect} from './lighting';
import {setBearing, resetViewport, setZoom, setMouseEvent} from './redux/action';

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
  const tidesVisibility = useSelector((state) => state.tidesVisibility);

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

  // const [viewBbox, setViewBbox] = useState([
  //   114.34215895072448, 22.339327508096225, 114.40085838106592, 22.385849342519002
  // ]);

  // const [bboxData, setBboxData] = useState();
  // const [imgList, setImgList] = useState([]);
  // const [addList, setAddList] = useState([]);
  // const [removeList, setRemoveList] = useState([]);
  // const [terrainLayers, setTerrainLayers] = useState([]);

  useEffect(() => {
    // getBboxData();
  }, []);

  // useEffect(() => {
  //   if (zoom < 13) return
  //   if (bboxData && viewBbox && zoom) {
  //     // if (meshMaxError != 20) dispatch(setMeshMaxError(100))

  //     const newImgList = bboxData.filter((b) => {
  //       if (b.name) {
  //         if (
  //           b.maxLon > viewBbox[0] &&
  //           b.minLon < viewBbox[2] &&
  //           b.maxLat > viewBbox[1] &&
  //           b.minLat < viewBbox[3]
  //         ) {
  //           return b.name;
  //         }
  //       }
  //     });

  //     let newTerrainLayers = []
  //     for (let i = 0; i < newImgList.length; i++) {
  //       const ds = newImgList[i];
  //       const name = ds.name.replace(':', '%3A').replace('.tif', '');
  //       const layer = new TerrainLayer({
  //         id: name,

  //         // * terrarium decoder
  //         elevationDecoder: {
  //           rScaler: 256,
  //           gScaler: 1,
  //           bScaler: 1 / 256,
  //           offset: -32768
  //         },

  //         material: {
  //           ambient: 0.5,
  //           diffuse: 0.5,
  //           shininess: 100
  //         },

  //         elevationData: `http://0.0.0.0:8080/rgb/${name}.png`,
  //         bounds: [ds.minLon, ds.minLat, ds.maxLon, ds.maxLat],

  //         tesselator: tesselator,
  //         meshMaxError: meshMaxError,
  //         updateTriggers: {
  //           meshMaxError,
  //           tesselator
  //         }
  //       });
  //       newTerrainLayers = [...newTerrainLayers, layer]
  //     }
  //     setTerrainLayers(newTerrainLayers)

  //     // ! might have mixed up addList and removeList
  //     // const addList = newImgList.filter((x) => !imgList.includes(x));
  //     // const removeList = imgList.filter((x) => !newImgList.includes(x));
  //     // setAddList(addList);
  //     // setRemoveList(removeList);
  //     // setImgList(newImgList);
  //   }
  // }, [viewBbox, zoom, meshMaxError]);

  // useEffect(() => {
  //   let addLayer = [];
  //   // let removeLayer = [];

  //   const addLength = addList.length;
  //   const removeLength = removeList.length;

  //   if (addLength > 0) {
  //     for (let i = 0; i < addLength; i++) {
  //       const ds = addList[i];
  //       const name = ds.name.replace(':', '%3A').replace('.tif', '');
  //       const layer = new TerrainLayer({
  //         id: name,

  //         // * terrarium decoder
  //         elevationDecoder: {
  //           rScaler: 256,
  //           gScaler: 1,
  //           bScaler: 1 / 256,
  //           offset: -32768
  //         },

  //         material: {
  //           ambient: 0.5,
  //           diffuse: 0.5,
  //           shininess: 100
  //         },

  //         elevationData: `http://0.0.0.0:8080/rgb/${name}.png`,
  //         bounds: [ds.minLon, ds.minLat, ds.maxLon, ds.maxLat],

  //         tesselator: tesselator,
  //         meshMaxError: meshMaxError,
  //         updateTriggers: {
  //           meshMaxError,
  //           tesselator
  //         }
  //       });
  //       addLayer = [...addLayer, layer];
  //     }
  //     // setTerrainLayers([...terrainLayers, ...addLayer])
  //   }

  //   if (removeLength > 0) {
  //     let tmpTerrainLayers = [...terrainLayers, ...addLayer];
  //     for (let i = 0; i < removeLength; i++) {
  //       const ds = removeList[i];
  //       const name = ds.name.replace(':', '%3A').replace('.tif', '');
  //       const removeIndex = terrainLayers.findIndex((tr) => tr.id == name);
  //       if (removeIndex > -1) {
  //         tmpTerrainLayers.splice(removeIndex, 1);
  //       }
  //     }
  //     setTerrainLayers(tmpTerrainLayers)
  //   }

  // }, [addList, removeList]);

  // useEffect(() => {
  //   if (imgList) {
  //     const length = imgList.length
  //     for (let i = 0; i < length; i++) {
  //       const ds = imgList[i]
  //       const name = ds.name.replace(":", "%3A").replace('.tif', '')

  //       const layer = new TerrainLayer({
  //         id: name,

  //         // * terrarium decoder
  //         elevationDecoder: {
  //           rScaler: 256,
  //           gScaler: 1,
  //           bScaler: 1 / 256,
  //           offset: -32768
  //         },

  //         material: {
  //           ambient: 0.5,
  //           diffuse: 0.5,
  //           shininess: 100
  //         },

  //         elevationData: `http://0.0.0.0:8080/rgb/${name}.png`,
  //         bounds: [ds.minLon, ds.minLat, ds.maxLon, ds.maxLat],

  //         tesselator: tesselator,
  //         meshMaxError: meshMaxError,
  //         updateTriggers: {
  //           meshMaxError,
  //           tesselator
  //         }
  //       })
  //       // setTerrainLayers(old => [...old, layer])
  //     }
  //   }
  // }, [imgList])

  // const getBboxData = async () => {
  //   const response = await fetch(`http://0.0.0.0:8080/bbox.csv`);
  //   const reader = response.body.getReader();
  //   const result = await reader.read(); // raw array
  //   const decoder = new TextDecoder('utf-8');
  //   const csv = decoder.decode(result.value); // the csv text
  //   const results = Papa.parse(csv, {
  //     header: true,
  //     dynamicTyping: true
  //   }); // object with { data, errors, meta }
  //   const rows = results.data;

  //   // init image list
  //   const initImgList = rows.filter((b) => {
  //     if (b.name) {
  //       if (
  //         b.minLon > viewBbox[0] &&
  //         b.maxLon < viewBbox[2] &&
  //         b.minLat > viewBbox[1] &&
  //         b.maxLat < viewBbox[3]
  //       ) {
  //         return b.name;
  //       }
  //     }
  //   });

  //   // init terrain mesh
  //   const length = initImgList.length;
  //   let initLayers = [];
  //   for (let i = 0; i < length; i++) {
  //     const ds = initImgList[i];
  //     const name = ds.name.replace(':', '%3A').replace('.tif', '');

  //     const layer = new TerrainLayer({
  //       id: name,

  //       // * terrarium decoder
  //       elevationDecoder: {
  //         rScaler: 256,
  //         gScaler: 1,
  //         bScaler: 1 / 256,
  //         offset: -32768
  //       },

  //       material: {
  //         ambient: 0.5,
  //         diffuse: 0.5,
  //         shininess: 100
  //       },

  //       elevationData: `http://0.0.0.0:8080/rgb/${name}.png`,
  //       bounds: [ds.minLon, ds.minLat, ds.maxLon, ds.maxLat],

  //       tesselator: tesselator,
  //       meshMaxError: meshMaxError,
  //       updateTriggers: {
  //         meshMaxError,
  //         tesselator
  //       }
  //     });
  //     initLayers = [...initLayers, layer];
  //   }

  //   setTerrainLayers(initLayers);
  //   // setImgList(initImgList);
  //   setBboxData(rows);
  // };

  // * get geotiff bounding box
  // const getTiffBbox = useCallback(async (fname) => {
  //   const res = await axios.get(`http://0.0.0.0:8080/tif/${fname}.tif`, {
  //     responseType: 'arraybuffer'
  //   });
  //   const tiff = await fromArrayBuffer(res.data);
  //   const image = await tiff.getImage();
  //   // const data = await image.readRasters();
  //   const bbox = await image.getBoundingBox();
  //   const correct_bbox = [bbox[1], bbox[0], bbox[3], bbox[2]];
  //   return correct_bbox;
  // }, [])

  // const filenames = [
  //   '10NE10A(e828n822%3Ae829n822)',
  //   '10NE10B(e829n822%3Ae830n822)',
  //   '10NE10C(e828n821%3Ae829n822)'
  // ];

  // const Terrain0 = new TerrainLayer({
  //   id: 'T0',

  //   // * terrarium decoder
  //   elevationDecoder: {
  //     rScaler: 256,
  //     gScaler: 1,
  //     bScaler: 1 / 256,
  //     offset: -32768
  //   },

  //   material: {
  //     ambient: 0.5,
  //     diffuse: 0.5,
  //     shininess: 100
  //   },

  //   elevationData: `http://0.0.0.0:8080/rgb/${filenames[0]}.png`,
  //   bounds: getTiffBbox(filenames[0]),

  //   tesselator: tesselator,
  //   meshMaxError: meshMaxError,
  //   updateTriggers: {
  //     meshMaxError,
  //     tesselator
  //   }
  // });

  // const Terrain1 = new TerrainLayer({
  //   id: 'T1',

  //   elevationDecoder: {
  //     rScaler: 256,
  //     gScaler: 1,
  //     bScaler: 1 / 256,
  //     offset: -32768
  //   },
  //   material: {
  //     ambient: 0.5,
  //     diffuse: 0.5,
  //     shininess: 100
  //   },

  //   // elevationData: getTiff(filenames[1]),
  //   elevationData: `http://0.0.0.0:8080/rgb/${filenames[1]}.png`,
  //   bounds: getTiffBbox(filenames[1]),

  //   tesselator: tesselator,
  //   meshMaxError: meshMaxError,
  //   updateTriggers: {
  //     meshMaxError,
  //     tesselator
  //   }
  // });

  // const Terrain2 = new TerrainLayer({
  //   id: 'T2',
  //   elevationDecoder: {
  //     rScaler: 256,
  //     gScaler: 1,
  //     bScaler: 1 / 256,
  //     offset: -32768
  //   },

  //   material: {
  //     ambient: 0.5,
  //     diffuse: 0.5,
  //     shininess: 100
  //   },

  //   // elevationData: parseGeoTiff(),
  //   elevationData: `http://0.0.0.0:8080/rgb/${filenames[2]}.png`,
  //   bounds: getTiffBbox(filenames[2]),

  //   tesselator: tesselator,
  //   meshMaxError: meshMaxError,
  //   updateTriggers: {
  //     meshMaxError,
  //     tesselator
  //   }
  // });

  // * tides layer
  const Tides = new TerrainLayer({
    visible: tidesVisibility,
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
      tidesVisibility
    }
  });

  // // * tile path layer
  // const Tiles = new TileLayer({
  //   tileSize: 256,

  //   renderSubLayers: (props) => {
  //     const {
  //       bbox: { west, south, east, north }
  //     } = props.tile;

  //     return new PathLayer({
  //       id: `${props.id}-border`,
  //       visible: props.visible,
  //       data: [
  //         [
  //           [west, north],
  //           [west, south],
  //           [east, south],
  //           [east, north],
  //           [west, north]
  //         ]
  //       ],
  //       getPath: (d) => d,
  //       getColor: [255, 0, 0],
  //       widthMinPixels: 4
  //     });
  //   }
  // });

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
      return `http://127.0.0.1:8080/tiles/png/${props.tile.z}/${props.tile.x}-${props.tile.y}-${props.tile.z}.png`;
  };

  const tiles = new TileLayer({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    // data: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', // ! for testing
    // data: 'http://0.0.0.0:8080/tiles/{x}-{y}-{z}.png',

    minZoom: 10,
    maxZoom: 15,
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        bbox: {west, south, east, north}
      } = props.tile;

      // return new BitmapLayer(props, {
      //   data: null,
      //   // image: `http://0.0.0.0:8080/tiles/${props.tile.x}-${props.tile.y}-${props.tile.z}.png`,
      //   image: props.data,
      //   bounds: [west, south, east, north]
      // });

      return new TerrainLayer(props, {
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

        elevationData: `http://127.0.0.1:8080/tiles/png/${props.tile.z}/${props.tile.x}-${props.tile.y}-${props.tile.z}.png`,
        bounds: [west, south, east, north],

        // * text texture switch
        texture: textureSelect(props),

        tesselator: tesselator,
        meshMaxError: meshMaxError
      });
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
      layers={[tiles, Tides, coastLine]}
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
