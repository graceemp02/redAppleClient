/** @format */

import { Control, Dashboard, Login, Machines } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Protected from './context/Protected';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme, { factor: 10 });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/client'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Protected Component={Machines} />} />
          <Route path='/*' element={<Protected Component={Machines} />} />
          <Route path='/dashboard' element={<Protected Component={Dashboard} />} />
          <Route path='/control' element={<Protected Component={Control} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
