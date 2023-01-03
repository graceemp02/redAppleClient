/** @format */

import { useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Box';
import List from '@mui/material/List';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import {
  Button,
  createTheme,
  Divider,
  ListItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import SubTxt from '../components/SubTxt';
import Relay from '../components/Relay';
import { useContext, useEffect, useState } from 'react';
import Logo from '../assests/logo.png';

import axios from 'axios';
import { useRef } from 'react';
import { UserContext } from '../context/UserContext';
// let theme = createTheme();
// console.log(theme.palette.action.active);
const circleStyle = {
  width: '2.7vh',
  height: '2.7vh',
  ml: '12px',
};
const hdnCircle = {
  width: '2.7vh',
  height: '2.7vh',
  ml: '12px',
  visibility: 'hidden',
};
const shortButton = {
  height: '3vh',
  minWidth: '3vw',
  fontSize: '1.5vh',
};
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '5px',
    color: 'white!important',
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      // borderRadius: theme.shape.borderRadius,
      borderRadius: '15px',
      textTransform: 'capitalize',
    },
    '&:first-of-type': {
      // borderRadius: theme.shape.borderRadius,
      borderRadius: '15px',
      textTransform: 'capitalize',
    },
  },
}));

const Control = () => {
  const navigate = useNavigate();
  const startRef = useRef();
  const [res, setRes] = useState({});
  const endRef = useRef();
  const sotRef = useRef();
  const tvocRef = useRef();
  const pm10Ref = useRef();
  const pm25Ref = useRef();
  const co2Ref = useRef();
  const location = useLocation();
  const api = location.state.api;
  const [alignment, setAlignment] = useState('0');

  const { setUser } = useContext(UserContext);

  const fetchDta = async () => {
    await axios
      .get('system.php', {
        params: { api: api },
      })
      .then(result => {
        setRes(result.data);

        setAlignment(result.data.aop);
      })
      .catch(error => console.log(error));
  };
  const pushData = async id => {
    await axios
      .get('system.php', {
        params: { api: api, relay: id },
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDta();
    }, 1000);
    return () => clearInterval(interval);
  }, [api]);

  const handleRelayBtnClick = id => {
    pushData(id);
  };
  const handleLogout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate('/login');
  };
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('start', startRef.current.value === '' ? res.start : startRef.current.value);
    formData.append('end', endRef.current.value === '' ? res.end : endRef.current.value);
    formData.append('sot', sotRef.current.value === '' ? res.sot : sotRef.current.value);

    await axios
      .post(`system.php?api=${api}`, formData)
      .then(() => {
        startRef.current.value = '';
        endRef.current.value = '';
        sotRef.current.value = '';
        tvocRef.current.value = '';
        pm10Ref.current.value = '';
        pm25Ref.current.value = '';
        co2Ref.current.value = '';
      })
      .catch(error => console.log(error));
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '40vw',
        margin: '0 auto',
      }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '40%',
          minWidth: '400px',
          height: '100%',
        }}>
        <Typography
          align='left'
          fontSize={'auto'}
          variant='h4'
          pl={2}
          fontWeight={'bold'}
          sx={{
            textDecoration: 'Underline',
            textAlign: 'center',
            color: 'black',
            mb: '.1vh',
            fontSize: '3.3vh !important',
          }}>
          SYSTEM OVERRIDE
        </Typography>

        <Paper
          sx={{
            flex: 5,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '1vh',
            display: 'flex',
          }}>
          <List
            component='nav'
            aria-label='relay controld'
            sx={{
              flex: 1,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
            }}>
            <Relay
              id='1'
              lable='Override 1'
              btn={res.ovr1}
              isDisable={false}
              ind={res.ovr1_ind}
              onBtnClick={handleRelayBtnClick}
            />
            <Relay
              id='2'
              lable='Override 2'
              btn={res.ovr2}
              isDisable={false}
              ind={res.ovr2_ind}
              onBtnClick={handleRelayBtnClick}
            />

            <ListItem sx={{ padding: '0.1rem 1rem', flex: 1 }} divider>
              <ListItemText sx={{ m: 0, fontSize: '2vh !important' }} primary={'System RST'} />
              <Button
                variant='contained'
                size='small'
                onClick={() => handleRelayBtnClick('3')}
                sx={shortButton}>
                {res.rst === '1' ? 'Release' : 'Press'}
              </Button>
              <CircleIcon sx={hdnCircle} />
            </ListItem>
            <ListItem sx={{ padding: '0.1rem 1rem', flex: 1 }} divider>
              <ListItemText sx={{ m: 0, fontSize: '2vh !important' }} primary={'Select Mode'} />
              <StyledToggleButtonGroup
                sx={{ bgcolor: 'gray' }}
                color='primary'
                value={alignment}
                exclusive
                onChange={handleChange}>
                <ToggleButton onClick={() => handleRelayBtnClick('4')} value='1'>
                  Auto
                </ToggleButton>
                <ToggleButton onClick={() => handleRelayBtnClick('5')} value='0'>
                  OFF
                </ToggleButton>
                <ToggleButton onClick={() => handleRelayBtnClick('6')} value='2'>
                  Program
                </ToggleButton>
              </StyledToggleButtonGroup>
            </ListItem>

            <form
              style={{ flex: 3, display: 'flex', flexDirection: 'column' }}
              onSubmit={handleSubmit}>
              <div
                style={{
                  flex: 3,
                  display: 'flex',
                  margin: '0px 5px ',
                  flexDirection: 'column',
                  border: '2px solid black',
                  borderRadius: '1vh',
                  marginBottom: '.5vh',
                }}>
                <ListItem sx={{ padding: '0.2rem 1rem', flex: 1 }} divider>
                  <ListItemText
                    sx={{ m: 0, fontSize: '2vh !important' }}
                    primary={'Shift Start Time'}
                  />
                  <input
                    ref={startRef}
                    placeholder={res.start}
                    style={{ width: '15%', textAlign: 'center', borderColor: 'whitesmoke' }}
                  />
                </ListItem>
                <ListItem sx={{ padding: '0.2rem 1rem', flex: 1 }} divider>
                  <ListItemText
                    sx={{ m: 0, fontSize: '2vh !important' }}
                    primary={'Shift End Time'}
                  />
                  <input
                    placeholder={res.end}
                    ref={endRef}
                    style={{ width: '15%', textAlign: 'center', borderColor: 'whitesmoke' }}
                  />
                </ListItem>
                <ListItem sx={{ padding: '0.2rem 1rem', flex: 1 }} divider>
                  <ListItemText
                    sx={{ m: 0, fontSize: '2vh !important' }}
                    primary={'System Override Time'}
                  />
                  <input
                    placeholder={res.sot}
                    ref={sotRef}
                    style={{ width: '15%', textAlign: 'center', borderColor: 'whitesmoke' }}
                  />
                </ListItem>
              </div>
              <input type='submit' hidden />
            </form>
            <div
              style={{
                flex: 3,
                display: 'flex',
                margin: '0px 5px ',
                flexDirection: 'column',
                border: '2px solid black',
                borderRadius: '1vh',
                marginBottom: '.5vh',
              }}>
              <ListItem sx={{ padding: '0 1rem', flex: 1 }} divider>
                <ListItemText
                  sx={{ m: 0, fontSize: '2vh !important' }}
                  primary={'System Violated'}
                />

                <CircleIcon htmlColor={res.sv === '1' ? 'red' : 'gray'} sx={circleStyle} />
              </ListItem>
              <ListItem sx={{ padding: '0 1rem', flex: 1 }} divider>
                <ListItemText
                  sx={{ m: 0, fontSize: '2vh !important' }}
                  primary={<span>Replace Filter</span>}
                />
                <CircleIcon htmlColor={res.filter === '1' ? 'red' : 'gray'} sx={circleStyle} />
              </ListItem>
              <ListItem sx={{ padding: '0 1rem', flex: 1 }} divider>
                <ListItemText sx={{ m: 0, fontSize: '2vh !important' }} primary={'HVAC Status'} />
                <Typography
                  variant='body1'
                  sx={{ border: '1px solid black', p: 1, borderRadius: 1 }}>
                  {res.oc}
                </Typography>
              </ListItem>
            </div>
          </List>
        </Paper>
        <div
          style={{
            flex: 1,
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
              {location.state.machine}
            </Typography>
            <Typography
              fontWeight={'bold'}
              color={'black'}
              fontSize='1.3em'
              mt={0.5}
              variant={'body1'}>
              {location.state.user}
            </Typography>
            <Typography color={'black'} variant={'body1'} fontSize='.9em' mt={0.5}>
              Next Inspection Date: {location.state.date}
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
              onClick={() => window.history.back()}
              size='small'>
              Back
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

export default Control;
