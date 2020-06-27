import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState(["desenvolvimento de app", "front-end "])

  useEffect(()=>{
    api.get("projects")
    .then(response=>{
      console.log(response.data)
      setProjects(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  },[])
  function handleAddProject() {
    api.post("projects",{ title:"new project" + Date.now(),
    owner:"gatão"})
    .then(response=>{
      console.log(response.data)
      setProjects([...projects,response.data])
    })
  }

  return (
    <div>
      <Header title={"title"} />
      <ul>
        {projects.map(project => <li>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Add project</button>
    </div>
  )
}

export default App;