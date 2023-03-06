/** @format */

import { Button, CssBaseline, Box, TextField, Typography, Container, Grid } from '@mui/material';
import Logo from '../assests/logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ResetPasswordDialog from '../components/reset/ResetPasswordDialog';

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
  const user = localStorage.getItem('client_id');
  const [dialog, setdialog] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();

    emailError && setEmailError(false);
    pwdError && setPwdError(false);
    const formData = new FormData(e.currentTarget);

    await axios
      .post('clientLogin.php', formData)
      .then(result => {
        const res = result.data['res'];
        if (res === 'true') {
          localStorage.setItem('client_id', result.data.id);
          navigate('/');
        } else if (res === 'Password Incorrent') setPwdError(true);
        else {
          setEmailError(true);
        }
      })
      .catch(err => console.log(err));
  };
  const handleForgot = () => {
    setdialog(true);
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
                sx={{ marginBlock: '6vh' }}
                fullWidth
                name='password'
                className='loginField'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                helperText={pwdError && 'Password Incorrent'}
              />
              <Grid container>
                <Grid item xs>
                  <span></span>
                </Grid>
                <Grid item>
                  <Link onClick={handleForgot} sx={{ cursor: 'pointer' }} variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>

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
        {dialog && <ResetPasswordDialog />}
      </ThemeProvider>
    </div>
  );
}
