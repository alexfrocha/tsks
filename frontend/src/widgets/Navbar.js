import { Box, Button, Container, Heading, HStack, Link, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')
    
    return (
        <Box display='flex' alignItems='center' justifyContent='space-between' pt={5} flexDirection='row' fontFamily='text'>
            <Heading as='h2' size='xl' onClick={() => navigate('/')} sx={{ '&:hover': { cursor: 'pointer' } }}>tsks.</Heading>
            <Box>
                <Button href='#' mr={isNonMobileScreens ? 5 : 1} fontSize={isNonMobileScreens ? '16px' : '14px'} fontWeight='400' variant='ghost'>
                    Criar Conta
                </Button>
                <Button fontSize={isNonMobileScreens ? '16px' : '14px'} fontWeight='400' variant='outline'>
                    Entrar
                </Button>    
            </Box>
        </Box>
    )
}