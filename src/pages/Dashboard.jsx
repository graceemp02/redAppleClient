/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import Logo from '../assests/logo.png';
import CircleIcon from '@mui/icons-material/Circle';
import { UserContext } from '../context/UserContext';
import { A, B, C, D, E, F, Ad } from '../assests';

const circleStyle = {
  width: '2.7vh',
  height: '2.7vh',
};
const Dashboard = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState({});
  const [display, setDisplay] = useState('flex');
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  const api = location.state.data;

  const fetchDta = async () => {
    await axios
      .get('dashboard.php', {
        params: { api: api },
      })
      .then(result => {
        setRes(result.data);
        setDisplay(result.data.humHdnStatus ? 'flex' : 'none');
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDta();
    }, 1000);
    return () => clearInterval(interval);
  }, [api]);
  const handleLogout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate('/login');
  };
  let img = A;
  if (res.letter === 'A') {
    console.log('Image : ' + 'A');
    img = A;
  } else if (res.letter === 'B') {
    console.log('Image : ' + 'B');
    img = B;
  } else if (res.letter === 'C') {
    console.log('Image : ' + 'C');
    img = C;
  } else if (res.letter === 'D') {
    console.log('Image : ' + 'D');
    img = D;
  } else if (res.letter === 'E') {
    console.log('Image : ' + 'E');
    img = E;
  } else {
    console.log('Image : ' + 'F');
    img = F;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
      <div
        style={{
          flex: 1,
          width: '40%',
          minWidth: '400px',
          display: 'flex',
          borderRadius: '1vh',
          backgroundColor: 'white',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '.75em',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            <Typography variant='body1' sx={{ fontWeight: 'bold', color: 'black' }}>
              AQI
            </Typography>
            <div>{res.aqi}%</div>
          </div>
          <div className='centerIcon'>
            <Typography variant='body1' sx={{ fontWeight: 'bold', color: 'black' }}>
              FAN
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.fan1 > 0 ? '#00c853' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.fan2 > 0 ? '#00c853' : 'gray'} />
            </div>
          </div>
          <div className='centerIcon'>
            <Typography variant='body1' sx={{ fontWeight: 'bold', color: 'black' }}>
              UCV
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.uvc1 > 0 ? '#00c853' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.uvc2 > 0 ? '#00c853' : 'gray'} />
            </div>{' '}
          </div>
          <div className='centerIcon'>
            {' '}
            <Typography variant='body1' sx={{ fontWeight: 'bold', color: 'black' }}>
              OSA
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.osa1 > 0 ? '#00c853' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.osa2 > 0 ? '#00c853' : 'gray'} />
            </div>{' '}
          </div>
          <div className='centerIcon'>
            {' '}
            <Typography variant='body1' sx={{ fontWeight: 'bold', color: 'black' }}>
              C/H
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.ch1 > 0 ? 'blue' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.ch2 > 0 ? 'red' : 'gray'} />
            </div>{' '}
          </div>
          <div>
            <Typography variant='body1' sx={{ fontWeight: 'bold', color: 'black' }}>
              Temp
            </Typography>
            <div>{res.temp}°F</div>{' '}
          </div>
        </div>
        <div>
          <div id='three-container' style={{ display: 'flex', justifyContent: 'center' }}>
            <img id='img1' src={img} style={{ display: 'none' }} />
            <img id='img2' src={Ad} style={{ display: 'none' }} />
          </div>
        </div>
        <div>
          <Typography
            color={'black'}
            variant={'body1'}
            lineHeight={1}
            sx={{ fontSize: '2.8vh', mb: '10px', textAlign: 'center' }}>
            HEALTHY INDOOR AIR QUALITY
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CircleIcon sx={circleStyle} className={res.humInd1 ? res.humInd1 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humInd2 ? res.humInd2 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humInd3 ? res.humInd3 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humInd4 ? res.humInd4 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humInd5 ? res.humInd5 : 'gray'} />
              </div>
              <Box sx={{ display: { display }, flexDirection: 'column' }}>
                <CircleIcon sx={circleStyle} className={res.humHdnInd1 ? res.humHdnInd1 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humHdnInd2 ? res.humHdnInd2 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humHdnInd3 ? res.humHdnInd3 : 'gray'} />
                <CircleIcon sx={circleStyle} className={res.humHdnInd4 ? res.humHdnInd4 : 'gray'} />
              </Box>
            </div>
            <Typography variant='body2'>Humidity</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.voc1 ? res.voc1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc2 ? res.voc2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc3 ? res.voc3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc4 ? res.voc4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc5 ? res.voc5 : 'gray'} />
            <Typography variant='body2'>VOC</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.co2_1 ? res.co2_1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_2 ? res.co2_2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_3 ? res.co2_3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_4 ? res.co2_4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_5 ? res.co2_5 : 'gray'} />
            <Typography variant='body2'>
              CO<sub>2</sub>
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.pm25_1 ? res.pm25_1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_2 ? res.pm25_2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_3 ? res.pm25_3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_4 ? res.pm25_4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_5 ? res.pm25_5 : 'gray'} />
            <Typography variant='body2'>PM2.5</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.pm10_1 ? res.pm10_1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_2 ? res.pm10_2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_3 ? res.pm10_3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_4 ? res.pm10_4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_5 ? res.pm10_5 : 'gray'} />
            <Typography variant='body2'>PM10</Typography>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: ' 100px',
            alignItems: 'center',
          }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt={'Logo'} width='60px' />{' '}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography fontWeight={'bold'} color={'black'} fontSize='1.3em' variant={'body1'}>
              {res.machine}
            </Typography>
            <Typography
              fontWeight={'bold'}
              color={'black'}
              fontSize='1.3em'
              mt={0.5}
              variant={'body1'}>
              {res.customer}
            </Typography>
            <Typography color={'black'} variant={'body1'} fontSize='.9em' mt={0.5}>
              Next Inspection Date: {res.date}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              height: '100%',
            }}>
            <Button
              sx={{
                width: '6em',
                height: '3vh',
                mb: '5px',
                fontSize: '1.5vh',
                textTransform: 'capitalize',
              }}
              variant='contained'
              onClick={() =>
                navigate('/control', {
                  state: { api: api, machine: res.machine, date: res.date, user: res.customer },
                })
              }
              size='small'>
              Time
            </Button>
            <Button
              sx={{
                width: '6em',
                height: '3vh',
                mb: '5px',
                fontSize: '1.5vh',
                textTransform: 'capitalize',
              }}
              width={100}
              variant='contained'
              onClick={() => navigate('/')}
              size='small'>
              Machines
            </Button>
            <Button
              sx={{
                width: '6em',
                height: '3vh',
                fontSize: '1.5vh',
                textTransform: 'capitalize',
              }}
              onClick={handleLogout}
              variant='contained'
              size='small'>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
