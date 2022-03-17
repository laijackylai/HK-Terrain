import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import useWindowDimensions from './windowDimensions';

const Info = () => {
  const {height} = useWindowDimensions();
  const zoom = useSelector((state) => state.zoom);
  const bearing = useSelector((state) => state.bearing);
  const mouseEvent = useSelector((state) => state.mouseEvent);

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    if (mouseEvent && mouseEvent.coordinate) {
      setLon(mouseEvent.coordinate[0]);
      setLat(mouseEvent.coordinate[1]);
    }
  }, [mouseEvent]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0.02 * height,
        top: 0.02 * height,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 0.02 * height,
        gap: '3px'
      }}
    >
      <div style={{fontFamily: 'Ubuntu', fontSize: 20}}>Info</div>
      <div style={{fontFamily: 'Ubuntu', fontSize: 12}}>Zoom: {zoom}</div>
      <div style={{fontFamily: 'Ubuntu', fontSize: 12}}>Bearing: {bearing}</div>
      <div style={{fontFamily: 'Ubuntu', fontSize: 12}}>Lon: {lon}</div>
      <div style={{fontFamily: 'Ubuntu', fontSize: 12}}>Lat: {lat}</div>
    </div>
  );
};

export default Info;
