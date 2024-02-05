import axios from 'axios'

const baseUrl = "https://fullstack-todoapp-backend-9va1.onrender.com"

const getAllToDo =(setToDo, setLoading) => {
    axios
    .get(baseUrl)
    .then((data) =>{
        // console.log("data ---->", data)
        setLoading(true)
        setToDo(data.data)
    }).finally(
        setLoading(false)
    )
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

const updateToDo = (toDoId, text, setText, setToDo, setIsUpdating) => {
    axios
    .post(`${baseUrl}/update`, {_id: toDoId, text})
    .then((data) => {
        // console.log("Update: ",data)
        setText("")
        setIsUpdating(false)
        getAllToDo(setToDo)
    })
    .catch((err) => console.log(err))
}

const deleteToDo = (_id, setToDo) => {
    axios
    .post(`${baseUrl}/delete`, {_id})
    .then((data) => {
        // console.log("Delete: ",data);
        getAllToDo(setToDo)
    })
}

export {getAllToDo, addToDo, updateToDo, deleteToDo}