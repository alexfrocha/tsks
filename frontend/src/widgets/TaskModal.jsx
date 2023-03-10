import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { FaTasks } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setCategories, setTasks } from "../features/homeSlice";

export default function TaskModal({ isOpen, onOpen, onClose, actionType, category, task = {description: '', completed: false} }) {

    
    const [formValues, setFormValues] = useState(task)
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const user = useSelector((state) => state.user)
    const categories = useSelector((state) => state.categories)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
        
    }

    const createTask = async () => {
        const responseTask = await fetch('http://localhost:3001/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            },
            body: JSON.stringify({
                description: formValues.description,
                completed: formValues.completed,
                categoriaId: category._id,
                userId: user._id
            })
        })
        const data = await responseTask.json()
        dispatch(addTask({ task: data }))
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
                    <ModalHeader fontFamily={'text'}>{actionType === 'edit' ? 'Editar tarefa' : 'Nova tarefa'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Descrição</FormLabel>
                            <Input ref={initialRef} name='description' value={formValues.name} onChange={handleChange} placeholder='O que você vai fazer?' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onClose()
                            if(actionType === 'create') createTask()
                        }} colorScheme={'blue'}>
                            {actionType === 'edit' ? 'Editar' : 'Criar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}