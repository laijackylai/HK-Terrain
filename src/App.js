import { DeckGL } from "deck.gl";
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { StaticMap } from "react-map-gl";
import TerrainLayer from "../terrain-layer/terrain-layer";
import './App.css';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibGFpamFja3lsYWkiLCJhIjoiY2tjZWZucjAzMDd1eDJzcGJvN2tiZHduOSJ9.vWThniHwg9V1wEO3O6xn_g"
const INITIAL_VIEW_STATE = {
	altitude: 1.5,
	bearing: 0,
	height: 945,
	latitude: 22.30784362549607,
	longitude: 114.13973361634052,
	zoom: 10.138384970180818,
};

const HKTerrain = new TerrainLayer({
	elevationDecoder: {
		rScaler: 4,
		gScaler: 0,
		bScaler: 0,
		offset: 0
	},

	// // Digital elevation model from https://www.usgs.gov/
	// elevationData: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png',
	// bounds: [-122.5233, 37.6493, -122.3566, 37.8159],
	// meshMaxError: 4,

	// hk terrain
	elevationData: 'https://raw.githubusercontent.com/laijackylai/loadersgl-tesselector/main/img/hk_terrain.png',
	bounds: [113.825288215, 22.137987659, 114.444071614, 22.571610740],
	meshMaxError: 0.1,

	tesselector: 'delatin',
})

function App() {
	return (
		<DeckGL
			controller={true}
			initialViewState={INITIAL_VIEW_STATE}
			layers={[HKTerrain]}
		>
			<StaticMap
				mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
				mapStyle="mapbox://styles/mapbox/dark-v8"
			/>
		</DeckGL >
	)
}

export default hot(App);
