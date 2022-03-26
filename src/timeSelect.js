import {Box, Slider} from '@material-ui/core';
import React from 'react';
import useWindowDimensions from './windowDimensions';

const TimeSelect = () => {
  const {width} = useWindowDimensions();

  return (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        marginBottom: '3px',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        paddingLeft: '1vh',
        paddingRight: '1vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box sx={{width: 0.5 * width}}>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={110}
        />
      </Box>
    </div>
  );
};

export default TimeSelect;
