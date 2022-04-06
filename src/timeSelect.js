import {Box, Slider} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import useWindowDimensions from './windowDimensions';
import Select from 'react-select';
import DatePicker from 'sassy-datepicker';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setRadarData} from './redux/action';

const TimeSelect = () => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const [pickedDate, setPickedDate] = useState(
    new Date(new Date('2021-09-16').setHours(0, 0, 0, 0))
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [pickOptions, setPickOptions] = useState([]);

  useEffect(() => {
    getRadarDataset();
  }, [pickedDate]);

  const getRadarDataset = async () => {
    const res = await axios.get(
      `https://localhost:3001/availableTimeslots/${formatDate(pickedDate)
        .replace('-', '')
        .replace('-', '')}/radar`
    );
    setPickOptions(res.data);
  };

  const formatDate = (d) => {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const onSelectTime = async (o) => {
    const date = formatDate(pickedDate).replace('-', '').replace('-', '');
    const url = `https://localhost:3001/radarData/${date}/${o.value}`;
    dispatch(setRadarData(url));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
      }}
    >
      <div>
        {calendarOpen && (
          <div style={{backgroundColor: 'white', borderRadius: 10}}>
            <DatePicker
              selected={pickedDate}
              onChange={(date) => {
                setPickedDate(date);
                setCalendarOpen(false);
              }}
            />
          </div>
        )}
      </div>
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
        <button
          style={{
            padding: '1vh',
            borderRadius: 5,
            backgroundColor: 'white',
            borderWidth: '1px',
            borderColor: 'rgb(204,204,204)'
          }}
          onClick={() => setCalendarOpen((o) => !o)}
        >
          {formatDate(pickedDate)}
        </button>
        <Select
          menuPlacement="top"
          defaultValue={'None Selected'}
          options={pickOptions}
          onChange={(o) => onSelectTime(o)}
        />
        <Box sx={{width: 0.4 * width}}>
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
    </div>
  );
};

export default TimeSelect;
