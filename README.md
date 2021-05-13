# loadersgl-tesselator

Create a new tesselator option for deck.gl terrain layer and loaders.gl terrain loader

Defaults the tesselator to martini while using delatin as a fallback when the image provided is not a sqare image. The user can also specify the desired loader

### To start the project

Install the required packages using npm or yarn
`npm install`

`npm install --global yarn && yarn`

Start the project via
`npm run webpack && npm start`
Go to http://0.0.0.0:3000/ or http://localhost:3000

### Controls

Tesselector button to switch between martini and delatin.
The number is a slider for changing maxMeshError

### Changes

1. Added and updated parse-terrain.js to create terrain using delatin when selected
2. Added tesselator option in terrain-layer.js (defaults to martini)
3. Added tesselator option in terrain-loader.js (deck.gl)
