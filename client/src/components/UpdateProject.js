
//import '../styleCss/project.css'

import { afficheProject, updateProject } from "../redux/projectSlice";
import {getUsers} from '../redux/userSlice'
import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";
import BarreNavigationHome from "./BarreNavigationHome";

const UpdateProject = ({match,history}) => {

    const [step, setStep] = useState(1);

    const nextStep = () => {
      setStep(Number(step + 1));
    };
  
    const prevStep = () => {
      setStep(Number(step - 1));
    };
  
      const dispatch = useDispatch();
   
  
    
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUsers())
  
        if(user.isAuth){
            
            dispatch(afficheProject())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])

  const project = useSelector(state => state.project)
  const [updatedInfo, setUpdatedInfo] = useState({});
    const handleUpdate = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
      };
      const handleUpdateSubmit = (e, projectId) => {
        e.preventDefault();
        dispatch(updateProject({ id: projectId, data: updatedInfo }));

    };
   


    return (
      <body>

      <div class="main-container">
        <BarreNavigationHome/>
        <div class="middle-container container">
      
        { project.projects && project.projects.filter(project=>project._id===match.params.id).map((el)=> (
      <div class="task block"> 

  
         
        
	<form class="registration-form">
  <h2 class="titular"> UPDATE PROJECT</h2>
		<div class="input-container">
			<label >Title</label> <br/>
			<input type="text" name="title" placeholder={el.title} onChange= {handleUpdate} />
		</div>
    <div class="input-container">
			<label > Description</label><br/>
			<input type="text"  name="description" placeholder={el.description}   onChange= {handleUpdate} />
		</div>
    <div class="input-container">
			<label> Start Date</label><br/>
	
    <input type="date"  name="startDate" min="2021-01-01" max="2021-12-31"  placeholder={el.startDate} onChange= {handleUpdate} />
       </div> 
       <div class="input-container">
			<label> Deadline</label><br/>
	
    <input type="date"  name="deadLine" min="2021-01-01" max="2021-12-31" placeholder={el.deadLine} onChange= {handleUpdate} />
       </div> 
       <div class="input-container">
			<label > State</label>   <br/> 
       <select id="options" name="state" placeholder={el.state} onChange={handleUpdate}>
                      <option value='state'>state</option>
                      <option value='ended'>ended </option>
                      <option value='valid'>valid</option>
                      <option value='In progress'>In progress</option>
                   
                    </select>
                    </div> 
       
       <br/><br/>
	
	
    <div class="text-center">
       <a class="sign-in button" onClick={(e)=>handleUpdateSubmit(e,el._id)}>Update Project</a>
       </div> 
		
	
	</form>
</div>  
))}
<h1 style={{color:'white'}}>{project.projectErrors && project.projectErrors._message }</h1>
  <a href={'/listProject'}>back</a>
        </div></div></body>

    )
}

export default UpdateProject
