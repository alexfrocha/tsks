import { Alert, AlertIcon, Box, Button, FormControl, Heading, Input, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { motion } from 'framer-motion'

const registerSchema = yup.object().shape({
    firstName: yup.string().required('Campo Obrigatório'),
    lastName: yup.string().required('Campo Obrigatório'),
    email: yup.string().email('Isso não é um email').required('Campo Obrigatório'),
    password: yup.string().required('Campo Obrigatório'),
    picture: yup.string(),
})

const loginSchema = yup.object().shape({
    email: yup.string().required('Campo Obrigatório'),
    password: yup.string().required('Campo Obrigatório')
})

const initialValuesLogin = {
    emaiL: '',
    password: ''
}

const initialValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picture: ''
}

export default function Form() {

    const [erro, setErro] = useState('')
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [pageType, setPageType] = useState('login')
    const isLogin = pageType === 'login'
    const [cookie, setCookie] = useCookies(['auth'])
    

    const register = async (values, onSubmitProps) => {
        const formData = new FormData()
        
        Object.keys(formValues).forEach(key => {
            formData.append(key, formValues[key])
        })

    
        console.log(formValues)
        const savedResponse = await fetch('http://localhost:3001/auth/register',
            {
                method: 'POST',
                body: formData
            }
        )

        const data = await savedResponse.json()
        if(data.messageError) {
            setPageType('register')
            setErro(data.messageError)
            return
        }
        if(!data.error) {        
            setErro('')
            setPageType('login')
        }
    
    }

    const login = async (values, onSubmitProps) => {

        const loginCredentials = {
            "email": formValues.email.toLowerCase(),
            "password": formValues.password
        }

        const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginCredentials)
        })

        const data = await loggedInResponse.json()

        if(data.messageError) {
            setErro(data.messageError)
            return
        }
        if(!data.error) {
            setCookie('auth', data.user._id, { path: '/' })
            setErro('')
            navigate('/dashboard')
        }


    }


    const handleFormSubmit = async (values, onSubmitProps) => {
        if(!isLogin) await register(values, onSubmitProps)
        if(isLogin) await login(values, onSubmitProps)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    return (
        <Box width='300px' height='auto' fontFamily='text'>
            <VStack>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 }}}>
                    <Heading mb='1rem' fontFamily='text'>{isLogin ? 'Entrar' : 'Criar Conta'}</Heading>
                </motion.div>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                    validationSchema={isLogin ? loginSchema : registerSchema}
                >

                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        resetForm
                    }) => (
                        <FormControl onSubmit={(handleSubmit)} style={{ width: '300px' }}>
                            
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1 }}}>
                            <VStack>
                                {erro && (
                                    <Alert status='error' variant='left-accent'>
                                        <AlertIcon />
                                        {erro}
                                    </Alert>
                                )}
                                {isLogin ? (
                                    <>
                                        <Input w='100%' value={formValues.email} onChange={handleChange} onBlur={handleBlur} name='email' placeholder='Email' size='md' />
                                        <Input w='100%' value={formValues.password} onChange={handleChange} name='password' type='password' placeholder='Senha' size='md' />
                                    </>
                                ) : (
                                    <>
                                        <Input w='100%' value={formValues.firstName} onChange={handleChange} onBlur={handleBlur} name='firstName' placeholder='Nome' size='md' />
                                        <Input w='100%' value={formValues.lastName} onChange={handleChange} name='lastName' placeholder='Sobrenome' size='md' />
                                        <Input w='100%' value={formValues.email} onChange={handleChange} onBlur={handleBlur} name='email' placeholder='Email' size='md' />
                                        <Input w='100%' value={formValues.password} onChange={handleChange} name='password' type='password' placeholder='Senha' size='md' />
                                    </>
                                )}
                                <Box width='100%' flexShrink={0}>
                                    <Button onClick={handleFormSubmit} bg='tsks.gradient' transition='1s' _hover={{
                                        background: 'linear-gradient(45deg, hsla(342, 90%, 67%, 1) 0%, hsla(356, 23%, 77%, 1) 31%, hsla(341, 73%, 52%, 1) 64%, hsla(319, 68%, 44%, 1) 91%);'
                                    }} width='100%' type='submit'>{isLogin ? 'Entrar' : 'Criar'}</Button>
                                </Box>
                                <Link onClick={() => {
                                    setErro('')
                                    setPageType(isLogin ? 'register' : 'login')
                                    resetForm()
                                }} textAlign='center' fontSize='14px' color='whiteAlpha.800'>
                                {isLogin ? 
                                    'Não tem uma conta? Clique aqui para criar' :
                                    'Já tem uma conta? Clique aqui para entrar'
                                }
                                </Link>
                            </VStack>
                            </motion.div>
                            
                            
                        </FormControl>
                    )}

                </Formik>
            </VStack>
        </Box>
    )
}