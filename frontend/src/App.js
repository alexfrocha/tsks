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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './scene/landingPage';
import { useCookies } from 'react-cookie';

function App() {
  const [cookie, setCookies] = useCookies(['auth'])

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
