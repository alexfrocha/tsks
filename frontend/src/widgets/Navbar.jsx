import { Box, Button, Container, Heading, HStack, Link, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ pageType }) {
    const navigate = useNavigate()
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')
    const [cookies, setCookie] = useCookies(['auth'])
    
    return (
        <Box display='flex' alignItems='center' justifyContent='space-between' pt={5} flexDirection='row' fontFamily='text'>
            { pageType === 'landing' && (
                <>
                    <Heading as='h2' size='xl' onClick={() => navigate('/')} sx={{ '&:hover': { cursor: 'pointer' } }}>tsks.</Heading>
                    <Box>
                        <Button onClick={() => {
                            cookies.auth ? navigate('/dashboard') : navigate('/auth')
                        }} fontSize={isNonMobileScreens ? '16px' : '14px'} fontWeight='400' variant='outline'>
                            {cookies.auth ? 'Painel' : 'Entrar'}
                        </Button>    
                    </Box>
                </>
            )}
        </Box>
    )
}