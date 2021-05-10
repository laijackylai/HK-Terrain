# loadersgl-tesselector

Create a new tesselector option for deck.gl terrain layer and loaders.gl terrain loader

### To start the project

Install the required packages
`yarn`
Start the project via
`npm run webpack && npm start`
Go to http://0.0.0.0:3000/

### Controls

Tesselector button to switch between martini and delatin.
The number is a slider for changing maxMeshError

### Changes

1. Added and updated parse-terrain.js to create terrain using delatin when selected
2. Added tesselector option in terrain-layer.js (defaults to martini)
3. Added tesselector option in terrain-loader.js
