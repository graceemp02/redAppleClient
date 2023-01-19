/** @format */

import {
  Button,
  CssBaseline,
  Box,
  TextField,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material';
import Logo from '../assests/logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography fontSize='2vh' textAlign='center' color='text.secondary' {...props}>
      {'Copyright © Iamredapple.com '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const user = localStorage.getItem('id');

  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const navigate = useNavigate();
  const themex = useTheme();

  const isMobile = useMediaQuery(themex.breakpoints.down('sm'));
  useEffect(() => {
    if (user) navigate('/');
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();

    setEmailError(false);
    setPwdError(false);
    const formData = new FormData(e.currentTarget);

    await axios
      .post('clientLogin.php', formData)
      .then(result => {
        const res = result.data['res'];
        if (res === 'true') {
          localStorage.setItem('id', result.data.id);
          navigate('/');
        } else if (res === 'Password Incorrent') setPwdError(true);
        else {
          setEmailError(true);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='loginContainer'>
      <ThemeProvider theme={theme}>
        <Container component='main' sx={{ px: '7px' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img src={Logo} alt='IamredApple Logo' className='logo' />
            <Typography component='h1' sx={{ fontSize: '7vh' }}>
              Red Apple
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ marginBlock: '1vh', width: '100%' }}>
              <TextField
                error={emailError && true}
                margin='normal'
                required
                fullWidth
                className='loginField'
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                autoFocus
                helperText={emailError && 'Invalid Email'}
              />
              <TextField
                error={pwdError && true}
                margin='normal'
                required
                sx={{ marginBlock: '4vh' }}
                fullWidth
                name='password'
                className='loginField'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                helperText={pwdError && 'Password Incorrent'}
              />

              <Button
                type='submit'
                className='loginField'
                fullWidth
                variant='contained'
                sx={{ my: '2vh' }}>
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mb: 4, position: 'absolute', bottom: 0, left: 0, right: 0 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
