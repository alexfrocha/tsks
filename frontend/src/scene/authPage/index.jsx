import { Box } from '@chakra-ui/react'
import React from 'react'
import Form from './Form'


export default function AuthPage() {

    return (
        <Box bg='tsks.dark' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Form />
        </Box>
    )
}