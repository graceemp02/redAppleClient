/** @format */

import { Button, CssBaseline, Box, TextField, Typography, Container } from '@mui/material';
import Logo from '../assests/logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © Iamredapple.com '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    // navigate('/');
    setEmailError(false);
    setPwdError(false);
    const formData = new FormData(e.currentTarget);

    await axios
      .post('clientLogin.php', formData)
      .then(result => {
        const res = result.data['res'];
        if (res === 'true') {
          setUser(result.data.id);
          // sessionStorage.setItem('id', result.data.id);
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
        <Container component='main' maxWidth='sm' sx={{ px: '7px' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img src={Logo} alt='IamredApple Logo' className='logo' />
            <Typography component='h1' sx={{ fontSize: '6vh' }}>
              Red Apple
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={emailError && true}
                margin='normal'
                required
                fullWidth
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
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                helperText={pwdError && 'Password Incorrent'}
              />

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
