/** @format */

import { Control, Dashboard, Login, Machines } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Protected from './context/Protected';
import { useState } from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme, { factor: 10 });

function App() {
  const [user, setUser] = useState(sessionStorage.getItem('id'));
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/clientest'>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Protected Component={Machines} />} />
            <Route path='/*' element={<Protected Component={Machines} />} />
            <Route path='/dashboard' element={<Protected Component={Dashboard} />} />
            <Route path='/control' element={<Protected Component={Control} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
