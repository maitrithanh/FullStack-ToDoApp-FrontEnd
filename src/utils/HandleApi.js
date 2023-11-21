import axios from 'axios'

const baseUrl = "https://fullstack-todoapp-backend-9va1.onrender.com"

const getAllToDo =(setToDo) => {
    axios
    .get(baseUrl)
    .then((data) =>{
        // console.log("data ---->", data)
        setToDo(data.data)
    })
}

const addToDo = (text, setText, setToDo) => {
    axios
    .post(`${baseUrl}/save`, {text})
    .then((data) => {
        // console.log("Add: ", data)
        setText("")
        getAllToDo(setToDo)
    })
    .catch((err) => console.log(err))
}

const updateToDo = (toDoId, text, setText, setToDo, setIsUpdating, setMessage) => {
    axios
    .post(`${baseUrl}/update`, {_id: toDoId, text})
    .then((data) => {
        // console.log("Update: ",data)
        setText("")
        setMessage(data.data)
        setIsUpdating(false)
        getAllToDo(setToDo)
    })
    .catch((err) => console.log(err))
}

const deleteToDo = (_id, setToDo, setMessage) => {
    axios
    .post(`${baseUrl}/delete`, {_id})
    .then((data) => {
        // console.log("Delete: ",data);
        setMessage(data.data)
        getAllToDo(setToDo)
    })
}

export {getAllToDo, addToDo, updateToDo, deleteToDo}