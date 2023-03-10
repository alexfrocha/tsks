import { Box, Button, ButtonGroup, Container, Heading, Highlight, Show, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../../widgets/Navbar'
import Sphere from '../../widgets/Sphere'
import { motion } from 'framer-motion'
import overflow from './overflow.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function LandingPage() {

    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')
    const [cookies, setCookie] = useCookies(['auth'])
    const navigate = useNavigate()

    return (
        <Box bg='tsks.dark' h='100vh'>
            <Container maxW='container.xl'>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 * 2 }}}>
                    <Navbar pageType='landing' />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1 * 2 }}}>
                <Sphere size={isNonMobileScreens ? '440px' : '440px'} absolute={true} top={isNonMobileScreens ? '50%' : '40%'} left={isNonMobileScreens ? '27%' : '-40%'}/>
                </motion.div>
                

                
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.2 * 2 }}}>
                    <Show breakpoint='(min-width: 1000px)'>
                        <Sphere size='200px' absolute={true} top="24%" left='80%'/>
                    </Show>
                </motion.div>

                <Box mt={isNonMobileScreens ? '15%' : '25%'} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    
                    
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 * 2 }}}>
                        <Heading fontSize={isNonMobileScreens ? '55px' : '30px'} zIndex='10' gap='2px' display='flex' alignItems='flex-end'>
                            Tsks, apenas tarefas <Box mb='11px'><Sphere size={isNonMobileScreens ? '15px' : '10px'} /></Box>
                        </Heading>
                    </motion.div>


                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 * 2 }}}>
                    <Text maxW='400px' textAlign='center' color='whiteAlpha.700' fontSize={isNonMobileScreens ? '18px' : '14px'} mt={isNonMobileScreens ? '2rem' : '7%'} mb={isNonMobileScreens ? '1rem' : '7%'}>
                        Mantenha em mente as atividades da sua rotina e tenha a satisfação ao concluir cada uma delas.
                    </Text>
                    </motion.div>


                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.9 * 2 }}}>
                    <ButtonGroup>
                        <Button px={19} py={3} onClick={() => cookies.auth ? navigate('/dashboard') : navigate('/auth')} backdropFilter='blur(5px)'>Vamos começar</Button>
                    </ButtonGroup>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    )
}