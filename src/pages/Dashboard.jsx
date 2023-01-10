/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Logo from '../assests/logo.png';
import CircleIcon from '@mui/icons-material/Circle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserContext } from '../context/UserContext';
import { A, B, C, D, E, F, Ad } from '../assests';
const circleStyle = {
  width: '2.7vh',
  height: '2.7vh',
};
const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesk = useMediaQuery(theme.breakpoints.up('lg'));
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
    fetchDta();
    const node = document.createElement('script');
    node.id = 'aniScript';
    node.src = 'js/script.js';
    document.body.appendChild(node);
  }, []);
  const removeAnimationScript = () => {
    const node = document.getElementById('aniScript');
    node.remove();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDta();
    }, 1000);
    return () => clearInterval(interval);
  }, [api]);
  const handleLogout = () => {
    removeAnimationScript();
    setUser(null);
    sessionStorage.clear();
    navigate('/login');
  };
  let img = A;
  if (res.letter === 'A') {
    img = A;
  } else if (res.letter === 'B') {
    img = B;
  } else if (res.letter === 'C') {
    img = C;
  } else if (res.letter === 'D') {
    img = D;
  } else if (res.letter === 'E') {
    img = E;
  } else {
    img = F;
  }
  const backtoMachine = e => {
    removeAnimationScript();
    navigate('/');
  };
  const mainStyle = {
    flex: 1,
    width: { xs: '95%', sm: '70%' },
    minWidth: { xs: '95%', sm: '900px' },
    display: 'flex',
    borderRadius: '1vh',
    backgroundColor: 'white',
    // overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '.75em',
  };
  return (
    <div
      style={{
        padding: '1vh 5vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        minHeight: '98vh',
        // overflow: 'hidden',
      }}>
      <div style={mainStyle}>
        <div style={{ display: 'flex', width: '95% !important', justifyContent: 'space-between' }}>
          <div>
            <Typography fontSize='2.5vh' sx={{ fontWeight: 'bold' }}>
              AQI
            </Typography>
            <Typography fontSize='2vh' sx={{ textAlign: 'center' }}>
              {res.aqi}%
            </Typography>
          </div>
          <div className='centerIcon'>
            <Typography fontSize='2.5vh' sx={{ fontWeight: 'bold' }}>
              Fan
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.fan1 > 0 ? '#00c853' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.fan2 > 0 ? '#00c853' : 'gray'} />
            </div>
          </div>
          <div className='centerIcon'>
            <Typography fontSize='2.5vh' sx={{ fontWeight: 'bold' }}>
              UCV
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.uvc1 > 0 ? '#00c853' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.uvc2 > 0 ? '#00c853' : 'gray'} />
            </div>{' '}
          </div>
          <div className='centerIcon'>
            {' '}
            <Typography fontSize='2.5vh' sx={{ fontWeight: 'bold' }}>
              OSA
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.osa1 > 0 ? '#00c853' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.osa2 > 0 ? '#00c853' : 'gray'} />
            </div>{' '}
          </div>
          <div className='centerIcon'>
            {' '}
            <Typography fontSize='2.5vh' sx={{ fontWeight: 'bold' }}>
              C/H
            </Typography>
            <div className='iconsDiv'>
              <CircleIcon sx={circleStyle} htmlColor={res.ch1 > 0 ? 'blue' : 'gray'} />
              <CircleIcon sx={circleStyle} htmlColor={res.ch2 > 0 ? 'red' : 'gray'} />
            </div>{' '}
          </div>
          <div>
            <Typography fontSize='2.5vh' sx={{ fontWeight: 'bold' }}>
              Temp
            </Typography>
            <Typography sx={{ textAlign: 'center' }} fontSize='2vh'>
              {res.temp}°F
            </Typography>{' '}
          </div>
        </div>
        <div id='outer'>
          <div id='three-container' style={{ display: 'flex', justifyContent: 'center' }}>
            <img id='img1' alt='AQI Level' src={img} style={{ display: 'none' }} />
            <img id='img2' alt='Ad Display' src={Ad} style={{ display: 'none' }} />
            {/* <img id='img2' alt='Ad Display' src={MyAd} style={{ display: 'none' }} /> */}
          </div>
        </div>
        <div>
          <Typography
            lineHeight={1}
            sx={{ fontSize: '3vh', mb: '10px', textAlign: 'center', fontWeight: 'bold' }}>
            HEALTHY INDOOR AIR QUALITY
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            margin: '0 auto',
          }}>
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
            <Typography fontSize='2vh'>Humidity</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.voc1 ? res.voc1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc2 ? res.voc2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc3 ? res.voc3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc4 ? res.voc4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.voc5 ? res.voc5 : 'gray'} />
            <Typography fontSize='2vh'>VOC</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.co2_1 ? res.co2_1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_2 ? res.co2_2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_3 ? res.co2_3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_4 ? res.co2_4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.co2_5 ? res.co2_5 : 'gray'} />
            <Typography fontSize='2vh'>
              CO<sub>2</sub>
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.pm25_1 ? res.pm25_1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_2 ? res.pm25_2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_3 ? res.pm25_3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_4 ? res.pm25_4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm25_5 ? res.pm25_5 : 'gray'} />
            <Typography fontSize='2vh'>PM2.5</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleIcon sx={circleStyle} className={res.pm10_1 ? res.pm10_1 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_2 ? res.pm10_2 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_3 ? res.pm10_3 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_4 ? res.pm10_4 : 'gray'} />
            <CircleIcon sx={circleStyle} className={res.pm10_5 ? res.pm10_5 : 'gray'} />
            <Typography fontSize='2vh'>PM10</Typography>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            height: ' 10vh',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '16%',
            }}>
            <img src={Logo} alt={'Logo'} width='100%' />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography fontWeight={'bold'} fontSize='2.5vh'>
              {res.machine}
            </Typography>
            <Typography fontWeight={'bold'} mt={0.5} fontSize='2.5vh'>
              {res.customer}
            </Typography>
            <Typography fontSize='2vh' textAlign='center' mt={0.5}>
              Next Inspection Date:
              {isMobile && <br />}
              {res.date}
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
              onClick={e => {
                e.preventDefault();
                navigate('/control', {
                  state: { api: api, machine: res.machine, date: res.date, user: res.customer },
                });
              }}
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
              onClick={backtoMachine}
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
