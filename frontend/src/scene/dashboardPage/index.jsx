import { Alert, AlertIcon, Box, Button, Card, CardHeader, Center, Checkbox, CircularProgress, Container, Heading, HStack, List, ListIcon, ListItem, Text, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FaBookOpen } from 'react-icons/fa'
import { MdAdd, MdAddCircle, MdArrowBack } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategories, setTasks, update, updateTasks } from '../../features/homeSlice'
import CategoryModal from '../../widgets/CategoryModal'
import Navbar from '../../widgets/Navbar'
import Sidebar from '../../widgets/Sidebar'
import TaskModal from '../../widgets/TaskModal'
import { RiDeleteBack2Fill, RiDeleteBinFill } from 'react-icons/ri'

export default function DashboardPage() {
    
    const navigate = useNavigate()
    const [actualCategory, setActualCategory] = useState({})
    const [pageType, setPageType] = useState('general')
    const isGeneral = pageType === 'general'
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const [showTask, setShowTask] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const categories = useSelector((state) => state.categories)
    const tasks = useSelector((state) => state.tasks)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const localTasksList = useSelector((state) => state.localTasksList)
    const [localeCategoriesWithTasks, setLocaleCategoriesWithTasks] = useState({})

    const [categoriesStatic, setCategoriesStatic] = useState([])

    const handleShowTask = () => setShowTask(true)
    const handleDisableTask = () => setShowTask(false)

    const getCategories = async () => {
          const categoriesResponse = await fetch(`http://localhost:3001/categories/${cookies.auth}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        const data = await categoriesResponse.json()
        dispatch(setCategories({ categories: data}))
    }


    const getTasksByCategoria = async (categoria) => {
        const tasksResponse = await fetch(`http://localhost:3001/tasks/${categoria._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        const data = await tasksResponse.json()
        if(data) dispatch(setTasks({ tasks: data }))
        return data
    }

    const handleDeleteTask = async (task) => {
        const taskResponse = await fetch(`http://localhost:3001/tasks/delete/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        await taskResponse.json()
    }




    useEffect(() => {
        getCategories()
        getTasksByCategoria(actualCategory)

    }, [categoriesStatic, pageType, localTasksList])


    const updateTaskMongo = async (task) => {
        const tasksResponse = await fetch(`http://localhost:3001/tasks/update/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            },
            body: JSON.stringify({
                description: task.description,
                completed: !task.completed
            })
        })
        const data = await tasksResponse.json()

    }


    let pendentTasks;
    let completedTasks;

    if(actualCategory) {
        pendentTasks = tasks.filter((task) => task.completed === false)
        completedTasks = tasks.filter((task) => task.completed === true)
    }

    const handleCheckboxChange = (task) => {
        let updatedTask = {
            description: task.description,
            completed: !task.completed
        }
        dispatch(updateTasks({ task: updatedTask }))
        updateTaskMongo(task)
    }

    const handleDeleteCategory = async (category) => {
        await fetch('http://localhost:3001/categories/delete/' + category._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }
        })
    }

    return (
        <Box  bg='tsks.dashboardBg' flex={1}>
            <Navbar pageType='dashboard' />
            <Box display='flex'>
                <Sidebar setPageType={setPageType} setActualCategory={setActualCategory} categories={categories} />
                <Box w='100%' zIndex={4} h='100vh' overflow={'scroll'}>
                    <Container px='14rem' maxW='container.xl'>
                        <Box mt={'3rem'}>
                            {isGeneral ? (
                                <>
                                <Heading fontWeight='600' fontFamily='text'>
                                    Categorias
                                </Heading>
                                <Wrap spacing={5} mt={10}>
                                {erro && (
                                    <Alert status='error' variant='left-accent'>
                                        <AlertIcon />
                                        {erro}
                                    </Alert>
                                )}
                                {sucesso && (
                                    <Alert status='success' variant='left-accent'>
                                        <AlertIcon />
                                        {sucesso}
                                    </Alert>
                                )}
                                    {categories.map((category) => (
                                        <WrapItem key={category._id}>
                                            <Card w='180px' bg='tsks.sidebarDark' h='180px' borderRadius={20} 
                                            _hover={{
                                                cursor: 'pointer',
                                                bg: 'tsks.lessDark',
                                                transition: '.2s'
                                            }}
                                            onClick={(e) => {
                                                setPageType('category')
                                                e.preventDefault()
                                                setActualCategory(category)
                                            }}
                                            >
                                                <CardHeader>
                                                    <Box w='50px' h='50px' bg='#F84C6F' display='flex' borderRadius={5} position='relative' mr={3}>   
                                                        <FaBookOpen style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%,-50%)'
                                                        }} fontSize='35px' />
                                                    </Box>
                                                    <Text fontFamily='text' mt={8} fontSize='24px'>{category.name}</Text>
                                                    <Text fontFamily='text' fontSize='12px' color='whiteAlpha.600'>Registre suas tarefas</Text>
                                                    
                                                </CardHeader>
                                            </Card>
                                    </WrapItem>
                                    ))}
                                    <WrapItem>
                                        <Center 
                                        onClick={onOpen}
                                        _hover={{
                                            color: 'white',
                                            border: '5px dashed white',
                                            cursor: 'pointer',
                                            transition: '0.5s'
                                        }} w='180px' color='tsks.lessDark' border='5px dashed #262A32' borderRadius={20} h='180px'>
                                            <MdAddCircle fontSize='30px' />
                                        </Center>
                                    </WrapItem>
                                    <CategoryModal setCategoriesStatic={setCategoriesStatic} setSucesso={setSucesso} setErro={setErro} actionType={'create'} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                                </Wrap>
                                </>
                            ) : (
                                

                                <>
                                <Box display={'flex'} justifyContent='space-between' alignItems='flex-end'>
                                    <Box display={'flex'} alignItems='flex-end'>
                                    <Button onClick={(e) => {
                                        e.preventDefault()
                                        setActualCategory({})
                                        setPageType('general')
                                    }} mr={5}>
                                        <MdArrowBack />
                                    </Button>
                                    <Heading fontWeight='600' fontFamily='text'>
                                        {actualCategory.name}
                                    </Heading>
                                    </Box>
                                    
                                    <Button variant='outline' onClick={() => {
                                        handleDeleteCategory(actualCategory)
                                        update()
                                        setPageType('general')
                                    }}>
                                        <RiDeleteBinFill />
                                    </Button>

                                </Box>
                                
                                <Button onClick={handleShowTask} my={10} py={7} fontWeight={'300'} justifyContent={'start'} leftIcon={<MdAddCircle style={{ marginRight: '5px' }} fontSize={'25px'} color='#F84C6F' />} borderWidth={'2px'} fontFamily={'text'} borderRadius={15} bg='tsks.sidebarDark' variant={'outline'} w={'100%'}>
                                    Criar uma nova tarefa
                                </Button>
                                <TaskModal isOpen={showTask} onClose={handleDisableTask} category={actualCategory} actionType={'create'} />

                                <List mb={10} fontFamily={'text'}>
                                    <Text>Pendentes - {pendentTasks.length}</Text>
                                {pendentTasks.map((task) => (
                                    <ListItem mt={3} 
                                    _hover={{
                                        cursor: 'pointer',
                                        bg: 'tsks.lessDark',
                                        transition: '.2s'
                                    }}
                                    onClick={(e) => {
                                        handleCheckboxChange(task)
                                    }} key={task._id} p={5} pr={10} bg={'tsks.sidebarDark'} fontWeight={'300'} borderRadius={15} position={'relative'} >
                                        <Checkbox size={'md'} isChecked={task.completed} colorScheme={'pink'}>
                                            <Text as={task.completed && 's'} ml={3} fontSize={'18px'}>{task.description}</Text>
                                        </Checkbox>
                                        <Button onClick={() =>  handleDeleteTask(task)} position={'absolute'} right='5' top={'50%'} transform={'translateY(-50%)'}>
                                            <RiDeleteBack2Fill />
                                        </Button>
                                    </ListItem>
                                    ))
                                    }
                                </List>

                                <List fontFamily={'text'}>
                                    <Text>Completas - {completedTasks.length}</Text>
                                    {completedTasks.length == 0 ? 'Você ainda não completou nenhuma tarefa' : (
                                        <>
                                        {completedTasks.map((task) => (
                                            <ListItem mt={3} 
                                            _hover={{
                                                cursor: 'pointer',
                                                bg: 'tsks.lessDark',
                                                transition: '.2s'
                                            }}
                                            onClick={(e) => {
                                                handleCheckboxChange(task)
                                            }} key={task._id} pr={10} p={5} bg={'tsks.sidebarDark'} position={'relative'} fontWeight={'300'} borderRadius={15}>
                                                <Checkbox size={'md'} isChecked={task.completed} colorScheme={'pink'}>
                                                    <Text as={task.completed && 's'} ml={3} fontSize={'18px'}>{task.description}</Text>
                                                </Checkbox>
                                                <Button onClick={() => handleDeleteTask(task)} position={'absolute'} right='5' top={'50%'} transform={'translateY(-50%)'}>
                                                    <RiDeleteBack2Fill />
                                                </Button>
                                            </ListItem>
                                            ))
                                        }
                                        </>
                                    )}
                                </List>

                                </>


                            )}
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}