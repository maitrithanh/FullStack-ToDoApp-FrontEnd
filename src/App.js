import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, deleteToDo, getAllToDo, updateToDo } from "./utils/HandleApi";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";

function App() {
  const [todo, setToDo] = useState([])
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo, setLoading)
  }, [])
  

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  const deleteMode = (_id) => {
    deleteToDo(_id, setToDo)
  }
  
  return (
    <div className="App">
      <div className="container">
        <div className="logo">
          <img className="img-logo" src="/TLogo.webp" alt="Logo" />
        </div>
        <h1>ToDo App</h1>
        <div className="top">
          <input type="text" placeholder="Add ToDo...." value={text} onChange={(e) => setText(e.target.value)} required/>
          <button className="add" 
          onClick={isUpdating ? () => 
          updateToDo(toDoId, text, setText, setToDo, setIsUpdating) : () => 
          addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>

        <div className="list">
          {!loading && <Loading />}
          {todo.map((item) => <ToDo key={item._id} text={item.text} updateMode={() => updateMode(item._id, item.text)} deleteToDo={() => deleteMode(item._id)}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
