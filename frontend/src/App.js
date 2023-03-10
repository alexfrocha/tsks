import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  useColorMode,
  GridItem,
  HStack,
} from '@chakra-ui/react';
import theme from './theme';
import Navbar from './widgets/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './scene/landingPage';
import { useCookies } from 'react-cookie';
import AuthPage from './scene/authPage';
import DashboardPage from './scene/dashboardPage';

function App() {
  const [cookies, setCookie] = useCookies(['auth'])

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={cookies.auth ? <Navigate to='/dashboard' /> : <AuthPage />} />
          <Route path='/dashboard' element={cookies.auth ? <DashboardPage /> : <Navigate to='/auth' />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
