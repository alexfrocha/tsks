import { Box, Button, Heading, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { MdAdd, MdAddCircle, MdBook, MdBookmark } from 'react-icons/md'
import {FaBookOpen} from 'react-icons/fa'

export default function Sidebar({categories, setActualCategory, setPageType}) {
    return (
        <Box h='100vh' w='350px' position={'sticky'} top={0} zIndex={50} boxShadow='1px -20px 20px rgba(0,0,0,.2)' bg='tsks.sidebarDark'>
            <VStack alignItems='flex-start'>
                <HStack justifyContent='space-between' w='100%' px={5} pt={5}> 
                    <Heading fontFamily='text' fontWeight='400' fontSize='16px'>Categorias</Heading>
                </HStack>
                <List w='100%'>
                    
                    {categories.map((category) => (
                        <ListItem 
                        key={category._id}
                        w='100%'
                        _hover={{
                            transition: '.2s',
                            bg: 'tsks.lessDark',
                            cursor: 'pointer'
                        }} 
                        display='flex' 
                        px={5}
                        alignItems='center' 
                        py={3}
                        onClick={() => {
                            setActualCategory(category)
                            setPageType('category')
                        }}>
    
                            <Box w='30px' h='30px' bg='#F84C6F' display='flex' borderRadius={5} position='relative' mr={3}>   
                                <ListIcon as={FaBookOpen} position='absolute' top='50%' left='50%' transform='translate(-50%,-50%)' fontSize='18px' />
                            </Box>
                            <Text fontFamily='text' fontSize='14px'>{category.name}</Text>
                        </ListItem>
                    ))}

                </List>
            </VStack>
        </Box>
    )
}