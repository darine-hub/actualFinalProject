
//import '../styleCss/project.css'

import { useDispatch ,useSelector} from "react-redux";
import { postNewProject } from "../redux/projectSlice";
import BarreNavigationHome from './BarreNavigationHome';
import {useState,useEffect} from 'react';
import {logout,getUsers,deleteUser} from '../redux/userSlice'
import { Link } from "react-router-dom";


const FormProject = () => {

const project = useSelector(state => state.project)
const user = useSelector(state => state.user)

  const dispatch = useDispatch();
  const [projectInput, setProjectInput] = useState({});
  const handleChange = (e) => {
    setProjectInput({ ...projectInput, [e.target.name]: e.target.value });
  };
console.log (projectInput)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewProject(projectInput));
   
  };
  useEffect(() => {
  

      
    dispatch(getUsers())
    
    


}, [])
  
    return (
        
       <body>

<div class="main-container">

  <BarreNavigationHome/>
  
  <div class="middle-container container">


<div class="task block"> 
	
	<form class="registration-form">
  <h2 class="titular"> ADD PROJECT</h2>
  <div class="input-container">
			<label >Title</label> <br/>
			<input type="text" name="title" placeholder='Title' onChange= {handleChange} />
		</div>
    <div class="input-container">
			<label > Description</label><br/>
			<input type="text"  name="description" placeholder='Description' onChange= {handleChange} />
		</div>
    <div class="input-container">
			<label > Start Date</label><br/>
	
    <input type="date"  name="startDate" min="2021-01-01" max="2021-12-31" onChange= {handleChange} />
       </div> 
       <div class="input-container">
			<label > Deadline</label><br/>
	
    <input type="date"  name="deadLine" min="2021-01-01" max="2021-12-31" onChange= {handleChange} />
       </div> <br/><br/>
	
		
    <div class="text-center">
     <Link to={'/listProject'}>  <a class="sign-in button" onClick={handleSubmit}>Add Project</a></Link>
       </div>  
	</form>
</div>
<h1 style={{color:'white'}}>{project.projectErrors && project.projectErrors._message }</h1>
  <a href={'/listProject'}>back</a>


</div>
</div>
   </body>     
    )
}

export default FormProject
