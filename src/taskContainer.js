import React, {useState, useEffect} from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function TaskContainer(props) {


    
  const [state, setState] = useState(()=> ({
    task: "",
    tasks: []
  }))


  useEffect(()=>{
    console.log(1)

    fetch("http://localhost:3000/").then(res => res.json()).then(data => {
      console.log(data)


      setState(ps => ({...ps, tasks: data}))
    })

  }, [])
  console.log("hello react")

  const change = e => {
    let value = e.target.value;
    setState(ps => ({...ps, task: value}))
  }

  const submit = e => {

    let exists = state.tasks.find(a => a.task === state.task);

    if (exists){
      e.preventDefault()
      alert("Task is already on the list")
    }

    // Default options are marked with *
   else{
     return fetch("http://localhost:3000/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({task: state.task}) // body data type must match "Content-Type" header
    });
  }
     }


  const deleteBtn = (e,a)=> {
    
    
    console.log(a)
    return fetch("http://localhost:3000/", {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({delete: a}) // body data type must match "Content-Type" header
    }).then(res => {
      if (res.status === 200){
        let newTasks = state.tasks.filter(objs => objs.task !== a)
        setState(ps => ({...ps, tasks: newTasks}))
      }
    });


  }


    return (
        <div className="App">

<div id="#todo-table ">
      
      <form onSubmit={submit}>
      
        <input type="text" name="task" onChange={change} value={state.task} placeholder="Add new task..." required />
        <button type="submit" >Add task</button>

      </form>


      <ul>

        {state.tasks.map(a => <li>{a.task}  <h2 onClick={e => deleteBtn(e, a.task)}>X</h2></li>)}

      </ul>

    </div>
            
        </div>
    )
}

export default TaskContainer
