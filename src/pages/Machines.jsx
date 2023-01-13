/** @format */

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniMachine from '../components/MiniMachine';
import axios from 'axios';

export default function Machines() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('id');
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get('miniMachines.php', {
        params: { cid: user },
        cancelToken: source.token,
      })
      .then(result => {
        setMachines(result.data);
      })
      .catch(error => console.log(error));
    return () => {
      source.cancel();
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const handleMachineClick = api => {
    localStorage.setItem('api', api);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <Typography
            component='div'
            sx={{ fontSize: '3.5vh', flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
            Machines
          </Typography>
          <Button variant='contained' sx={{ fontSize: '1.5vh' }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {machines.map(item => (
          <MiniMachine
            onClick={handleMachineClick}
            key={item.id}
            letter={item.letter}
            name={item.name}
            api={item.api}
          />
        ))}
      </Box>
    </Box>
  );
}
