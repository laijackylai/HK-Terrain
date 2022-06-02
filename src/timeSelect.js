import {Box, Slider} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import useWindowDimensions from './windowDimensions';
import Select from 'react-select';
import DatePicker from 'sassy-datepicker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRadarData} from './redux/action';
import Play from '../img/play.svg';
import Pause from '../img/pause.svg';

const TimeSelect = () => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const radarData = useSelector((state) => state.radarData);

  const [pickedDate, setPickedDate] = useState(
    new Date(new Date('2021-09-16').setHours(0, 0, 0, 0))
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [pickOptions, setPickOptions] = useState([]);
  const [timeIndex, setTimeIndex] = useState();
  const [playPause, setPlayPause] = useState(false);
  const [playInterval, setPlayInterval] = useState();
  const [radarType, setRadarType] = useState('TCR');
  const [selectedTime, setSelectedTime] = useState();
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(0);

  useEffect(() => {
    getRadarDataset();
  }, [pickedDate, radarType]);

  // const routerIP = 'localhost:3001'
  const routerIP = 'rsmcvisual01:8001';

  const getRadarDataset = async () => {
    const res = await axios.get(
      `https://${routerIP}/availableTimeslots/${radarType}/${formatDate(pickedDate)
        .replace('-', '')
        .replace('-', '')}/radar`
    );
    setPickOptions(res.data);
    // console.log(parseInt(res.data[0].label), parseInt(res.data[res.data.length - 1].label))
    setSliderMax(parseInt(res.data[res.data.length - 1].label));
    setSliderMin(parseInt(res.data[0].label));
    if (pickedDate != null && timeIndex != null) {
      const date = formatDate(pickedDate).replace('-', '').replace('-', '');
      const obj = res.data[timeIndex];
      const url = `https://localhost:3001/radarData/${date}/${obj.value}`;
      // console.log(url)
      dispatch(setRadarData(url));
    }
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
    const index = pickOptions.findIndex((obj) => obj == o);
    setTimeIndex(index);
    const date = formatDate(pickedDate).replace('-', '').replace('-', '');
    const url = `https://localhost:3001/radarData/${date}/${o.value}`;
    dispatch(setRadarData(url));
  };

  const play = async () => {
    if (playPause) {
      setPlayPause((o) => !o);
      if (playInterval) clearInterval(playInterval);
      return;
    }
    if (playInterval) clearInterval(playInterval);
    if (!radarData && !timeIndex) return;
    setPlayPause((o) => !o);
    let i = timeIndex + 1;
    const interval = setInterval(() => {
      if (i == pickOptions.length) {
        clearInterval(interval);
        setPlayPause((o) => !o);
      }
      setSelectedTime(pickOptions[i]);
      onSelectTime(pickOptions[i]);
      i += 1;
    }, 1000);
    setPlayInterval(interval);
  };

  const radarTypeOptions = [
    {label: 'TMS', value: 'TMS'},
    {label: 'TCR', value: 'TCR'}
  ];

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
        <Select
          menuPlacement="top"
          defaultValue={radarTypeOptions[1]}
          options={radarTypeOptions}
          onChange={(o) => {
            setRadarType(o.value);
          }}
        />
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
          value={selectedTime}
          defaultValue={'None Selected'}
          options={pickOptions}
          onChange={(o) => {
            setSelectedTime(o);
            onSelectTime(o);
          }}
        />
        <button
          style={{
            paddingTop: '.6vh',
            paddingBottom: '.6vh',
            borderRadius: 5,
            backgroundColor: 'white',
            borderWidth: '1px',
            borderColor: 'rgb(204,204,204)',
            width: '4vh'
          }}
          onClick={play}
        >
          <img src={playPause ? Pause : Play} />
        </button>
        <Box sx={{width: 0.3 * width}}>
          <Slider
            aria-label="Timestamp"
            defaultValue={sliderMin}
            value={selectedTime ? parseInt(selectedTime.label) : sliderMin}
            valueLabelDisplay="auto"
            step={6}
            min={sliderMin}
            max={sliderMax}
          />
        </Box>
      </div>
    </div>
  );
};

export default TimeSelect;
