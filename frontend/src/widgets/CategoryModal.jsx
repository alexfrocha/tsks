import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { setCategories } from '../features/homeSlice'

export default function CategoryModal({setSucesso, setErro, actionType, isOpen, setCategoriesStatic, onClose, category = { name: '' }}) {
    
    const [formValues, setFormValues] = useState(category)
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const categories = useSelector((state) => state.categories)

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormValues((prevValues) => ({
            [name]: value
        }))
    }

    const createCategory = async () => {
        const response = await fetch('http://localhost:3001/categories/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            },
            body: JSON.stringify({
                ...formValues,
                userId: cookies.auth
            })
        })
        const data = await response.json()
        if(data.successMessage) setSucesso(data.successMessage)
        if(data.messageError) setErro(data.messageError)
        setTimeout(() => {
            setErro('')
            setSucesso('')
        }, 5000);
        setCategories([
            ...categories,
            data
        ])
        setCategoriesStatic({
            data
        })
    }

    const editCategory = async () => {
        const response = await fetch(`http://localhost:3001/categories/edit/${category._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            },
            body: JSON.stringify({
                ...formValues,
                userId: cookies.auth
            })
        })
        const data = await response.json()
        if(data.successMessage) setSucesso(data.successMessage)
        if(data.messageError) setErro(data.messageError)
        setTimeout(() => {
            setErro('')
            setSucesso('')
        }, 5000);
        setCategories([
            ...categories,
            data
        ])
    }
    
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily={'text'}>{actionType === 'edit' ? 'Editar Categoria' : 'Criar Categoria'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input ref={initialRef} name='name' value={formValues.name} onChange={handleChange} placeholder='Nome da Categoria' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onClose()
                            if(actionType === 'create') createCategory()
                            if(actionType === 'edit') editCategory()
                        }} colorScheme={'blue'}>
                            {actionType === 'edit' ? 'Editar' : 'Criar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}