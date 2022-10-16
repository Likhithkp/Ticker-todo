import React from 'react';
import "./App.css";
import { useState,useEffect } from 'react';
import Axios from "axios";

const App = () => {

  const [listOfTasks,setListOfTasks] = useState([])
  const [text,setText] = useState("")


  useEffect(() => {
    Axios.get("https://todo-ticker.herokuapp.com/get")
    .then((Response) => {
      setListOfTasks(Response.data)
    })
  },[])

  const addTask = () => {
    Axios.post("https://todo-ticker.herokuapp.com/get/post", {text})
    .then(() => {
      setListOfTasks([...listOfTasks, {text}])
    });
  }

  const deleteTask = (id) => {
    Axios.delete(`https://todo-ticker.herokuapp.com/get/delete/${id}`)
    .then(() => {
      setListOfTasks(listOfTasks.filter((task) => {
        return task._id !== id;
      }))
    })
  }


  return (
    <div className='container'>
      <h1>Ticker☑️</h1>
      <div className='top'>
      <input onChange={(event) => setText(event.target.value)}/>
      <button className='add' onClick={() =>addTask()}>Add</button>
      </div>


      <div>
        {listOfTasks.map((val) => {
          return(
            <div className='item'>
            {val.text}
            <div className='icons'>
              <i className="ri-delete-bin-6-line" onClick={() => deleteTask(val._id)}></i>
            </div>
            </div>
          )
        })}
        </div>
    </div>
  )
}

export default App