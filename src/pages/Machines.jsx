/** @format */

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniMachine from '../components/MiniMachine';
import axios from 'axios';

export default function Machines() {
  const [machines, setMachines] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const user2 = localStorage.getItem('id');
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get('miniMachines.php', {
        params: { cid: user2 },
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
    setUser(null);
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
            variant='h4'
            component='div'
            sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
            Machines
          </Typography>
          <Button variant='contained' onClick={handleLogout}>
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
