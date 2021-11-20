import {AmbientLight, LightingEffect} from 'deck.gl';
import {_SunLight as SunLight} from '@deck.gl/core';

// * sunlight
const sunlight = new SunLight({
  // timestamp: moment().valueOf(),
  timestamp: 0,
  color: [255, 255, 255],
  intensity: 2
});

// * ambient light
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 0.5
});

// * lighting effect
export const lightingEffect = new LightingEffect({
  sunlight,
  ambientLight
});
