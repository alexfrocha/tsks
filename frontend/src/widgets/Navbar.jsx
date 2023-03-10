import { Avatar, Box, Button, Container, Heading, HStack, Link, List, ListIcon, ListItem, Text, Tooltip, useMediaQuery } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {MdDashboard, MdAddCircle, MdDns} from "react-icons/md"
import {AiOutlineUser} from 'react-icons/ai'


export default function Navbar({ pageType }) {
    const navigate = useNavigate()
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')
    const [cookies, setCookie] = useCookies(['auth'])
    const isDashboard = pageType === 'dashboard'
    const user = useSelector((state) => state.user)

    return (
        <Box display='flex'  bg={isDashboard ? 'tsks.lessDark' : undefined} alignItems='center' justifyContent='space-between' px={isDashboard ? 10 : 3} py={3} flexDirection='row' fontFamily='text'>
            { pageType === 'landing' ? (
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
            ) : (
                <>
                    <List display='flex'>
                        <ListItem fontSize='16px' mr={isDashboard && isNonMobileScreens ? 5 : undefined} display='flex' alignItems='center'>
                            <ListIcon fontSize='20px' as={MdDashboard} color='whiteAlpha.700' />
                            Painel
                        </ListItem>
                    </List>
                    <List display='flex' alignItems='center'>
                        <Tooltip label={`${user.firstName} ${user.lastName}`} bg='tsks.dark' color='white'>
                            <Avatar 
                                _hover={{ cursor: 'pointer' }} 
                                onClick={() => navigate(`/profile/${cookies.auth}`)} 
                                bg='tomato' 
                                size='sm' 
                                src={user.picturePath ? user.picturePath : undefined} 
                                icon={!user.picturePath ? <AiOutlineUser fontSize='20px' /> : undefined} 
                            />
                        </Tooltip>
                    </List>
                </>
            )}
        </Box>
    )
}