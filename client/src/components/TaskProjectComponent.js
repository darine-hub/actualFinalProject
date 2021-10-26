import React from "react";
import {
  afficheTask,
  postNewTask,
  updateStateTask,
  updateFinishTask,
  deleteTask,
  deleteManyTask
} from "../redux/taskSlice";
import { getUsers } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { afficheProject, updateStateProject ,finishProject, deleteProject} from "../redux/projectSlice";
import { useState, useEffect } from "react";
import detail from "../images/detail.png";
import img from "../images/icon-delete-16.jpg";
import img1 from "../images/update-icon-17.jpg";
import img2 from "../images/validate.jpg";
import { Link } from "react-router-dom";
import "../styleCss/taskProject.css";
import TaskProjectManager from "./TaskProjectManager";
import TaskProjectEmployee from "./TaskProjectEmployee";
import BarreNavigationHome from "./BarreNavigationHome";

const TaskProjectComponent = ({match,history}) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const task = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(afficheProject());

    if (user.isAuth) {
      dispatch(afficheTask());
    } else {
      history.push("/login");
    }
  }, [user.isAuth]);

  const handleStateUpdate = (idTask) => {
    dispatch(updateStateTask(idTask));
  };

  const handleFinishUpdate = (idTask) => {
    dispatch(updateFinishTask(idTask));
  };

  const handleDeleteTask = (idTask) => {

    if (window.confirm( "vouler vous supprimer cet task!" ) ) {
      dispatch(deleteTask(idTask));
     
  } else {
    alert = "You pressed Cancel!";
  }
  }
  const handleDeleteProject = (idProject) => {

    if (window.confirm( "vouler vous supprimer cet projet!" ) ) {
      dispatch(deleteProject(idProject));
      dispatch(deleteManyTask(idProject));
  } else {
    alert = "You pressed Cancel!";
  }

   
  };

  const handleStateProjectUpdate = (idProject) => {
    let filtredTasks = task.tasks.filter(task=>task.project._id===idProject).map(elm=>elm.state)
    let exist = filtredTasks.includes('ended')
 console.log(exist)
    if (exist=== true) {
alert('vous ne pas valider cet projets il y a encore des tasks non valides')
    }
    else{
    dispatch(updateStateProject(idProject));
    }
  };

  const handleFinishProject = (idProject) => {
    let filtredTasks = task.tasks.filter(task=>task.project._id===idProject).map(elm=>elm.state)
     let exist = filtredTasks.includes('In progress')
  console.log(exist)
     if (exist=== true) {
alert('vous ne pas finir cet projets il y a encore des tasks non finis')
     }
     else{
      dispatch(finishProject(idProject));
     }
    
  };

  /* const [notificationInput, setNotificationInput] = useState({});
  const handleChange = (e) => {
    setProjectInput({ ...notificationInput, [e.target.name]: e.target.value });
  };
console.log (projectInput)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewProjt(projectInput));
   
  }; */




  
  return (
    <body>
      <div class="main-container">
        
<BarreNavigationHome/>
        
 <div class="listProject">
 {user.users &&
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
return elm.role==='Manager'?
<div>


{project.projects &&
  project.projects
    .filter((elm) => elm._id == match.params.id )
    .map((proj) => {
      return proj.state === "valid" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span  >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              <td>
                                <ul class="action-list">
                                  <li>
                                    <a
                                      href={`/updateProject/${elm._id}`}
                                      data-tip="edit"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </a>
                                  </li>
                                  
                                
                                 

                                  <li>
                                    {" "}
                                    <a
                                      href={`/task/${elm._id}`}
                                      data-tip="ADD TASK"
                                    >
                                      {" "}
                                      <i class="icon entypo-plus-squared scnd-font-color"></i>{" "}
                                    </a>{" "}
                                  </li>
                                  <li
                                  onClick={() =>
                                    handleDeleteProject(elm._id)
                                  }
                                >
                                  <a href="" data-tip="delete">
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                  </a>
                                </li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                            elId.project._id === match.params.id
                        )
                        .map((el) => (
                  
                          <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                          <tr>
                            <td>
                              <img
                                className="image"
                                src={el.employee.image}
                              />{" "}
                              {el.employee.firstName}{" "}
                              {el.employee.lastName}{" "}
                            </td>
                            <td>{el.name}</td>
                            <td> {el.description} </td>
                            <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                            <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                            <td> {el.state}</td>
                            <td>
                              <ul class="action-list">
                                <li>
                                  <a
                                    href={`/updateTask/${el._id}`}
                                    data-tip="edit"
                                  >
                                    <i class="fa fa-edit"></i>
                                  </a>
                                </li>
                                <li
                                  onClick={() =>
                                    handleDeleteTask(el._id)
                                  }
                                >
                                  <a href="" data-tip="delete">
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                  </a>
                                </li>
                               
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                         ) )}




                        
                         
                       
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : proj.state === "ended" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"  style={{ backgroundColor: "rgb(233, 231, 253)" }}
              
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody   style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              <td>
                                <ul class="action-list">
                                  <li>
                                    <a
                                      href={`/updateProject/${elm._id}`}
                                      data-tip="edit"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </a>
                                  </li>
                               
                                  
                                
                                  <li
                                    onClick={() =>
                                      handleStateProjectUpdate (elm._id)
                                    }
                                  >
                                    <a href="" data-tip="valid">
                                      {" "}
                                      <i   style={{ color: "green" }} class="fa fa-check-square-o"></i>
                                    </a>
                                  </li>

                                  <li>
                                    {" "}
                                    <a
                                      href={`/task/${elm._id}`}
                                      data-tip="ADD TASK"
                                    >
                                      {" "}
                                      <i class="icon entypo-plus-squared scnd-font-color"></i>{" "}
                                    </a>{" "}
                                  </li>
                                  <li
                                  onClick={() =>
                                    handleDeleteProject(elm._id)
                                  }
                                >
                                  <a href="" data-tip="delete">
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                  </a>
                                </li>
                                </ul>
                              </td>
                              
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                          elId.project._id === match.params.id
                        )
                        .map((el) => {
                         
                          return  el.state==='ended'?

<tbody  style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                              <td>
                              <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
         <ul class="action-list">
         <li
                                    onClick={() =>
                                      handleStateUpdate (el._id)
                                    }
                                  >
                                    <a href="" data-tip="valid">
                                      {" "}
                                      <i   style={{ color: "green" }} class="fa fa-check-square-o"></i>
                                    </a>
                                  </li>
           <li>
             <a
               href={`/updateTask/${el._id}`}
               data-tip="edit"
             >
               <i class="fa fa-edit"></i>
             </a>
           </li>
           <li
             onClick={() =>
               handleDeleteTask(el._id)
             }
           >
             <a href="" data-tip="delete">
             <i class="icon entypo-trash scnd-font-color"></i>
             </a>
           </li>
         
         
     
         </ul>
       </td>
                             
                            </tr>
                          </tbody>:



<tbody  style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                              <td>
                              <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
         <ul class="action-list">
           <li>
             <a
               href={`/updateTask/${el._id}`}
               data-tip="edit"
             >
               <i class="fa fa-edit"></i>
             </a>
           </li>
           <li
             onClick={() =>
               handleDeleteTask(el._id)
             }
           >
             <a href="" data-tip="delete">
             <i class="icon entypo-trash scnd-font-color"></i>
             </a>
           </li>
         
         
     
         </ul>
       </td>
                             
                            </tr>
                          </tbody>


                        }


                        )}
       

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}> Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              <td>
                                <ul class="action-list">
                                  <li>
                                    <a
                                      href={`/updateProject/${elm._id}`}
                                      data-tip="edit"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </a>
                                  </li>
                                 
                                  
                                
                                  <li
                                    onClick={() =>
                                      handleFinishProject(elm._id)
                                    }
                                  >
                                    <a href="" data-tip="finish">
                                      {" "}
                                      <i class="fa fa-check-square-o"></i>
                                    </a>
                                  </li>

                                  <li>
                                    {" "}
                                    <a
                                      href={`/task/${elm._id}`}
                                      data-tip="ADD TASK"
                                    >
                                      {" "}
                                      <i class="icon entypo-plus-squared scnd-font-color"></i>{" "}
                                    </a>{" "}
                                  </li>
                                  <li
                                  onClick={() =>
                                    handleDeleteProject(elm._id)
                                  }
                                >
                                  <a href="" data-tip="delete">
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                  </a>
                                </li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                            elId.project._id === match.params.id
                        )
                        .map((el) => {   
     return el.state==='valid'?
     <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}> 
     <tr>
       <td>
         <img
           className="image"
           src={el.employee.image}
         />{" "}
         {el.employee.firstName}{" "}
         {el.employee.lastName}{" "}
       </td>
       <td>{el.name}</td>
       <td> {el.description} </td>
       <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
       <td> {el.state}</td>
       <td>
         <ul class="action-list">
           <li>
             <a
               href={`/updateTask/${el._id}`}
               data-tip="edit"
             >
               <i class="fa fa-edit"></i>
             </a>
           </li>
           <li
             onClick={() =>
               handleDeleteTask(el._id)
             }
           >
             <a href="" data-tip="delete">
             <i class="icon entypo-trash scnd-font-color"></i>
             </a>
           </li>
         
         
     
         </ul>
       </td>
     </tr>
   </tbody>
                         :el.state==='ended'?
                         <tbody style={{ backgroundColor: "rgb(254, 228, 203)" }}> 
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
                                <ul class="action-list">
                                  <li>
                                    <a
                                      href={`/updateTask/${el._id}`}
                                      data-tip="edit"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </a>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleDeleteTask(el._id)
                                    }
                                  >
                                    <a href="" data-tip="delete">
                                    <i class="icon entypo-trash scnd-font-color"></i>
                                    </a>
                                  </li>
                            {/*       <li
                                    onClick={() =>
                                      handleFinishUpdate(el._id)
                                    }
                                  >
                                    <a href="" data-tip="finish">
                                      {" "}
                                      <i class="fa fa-check-square-o"></i>
                                    </a>
                                  </li> */}
                      
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                         
                         
                        : <tbody> 
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
                                <ul class="action-list">
                                  <li>
                                    <a
                                      href={`/updateTask/${el._id}`}
                                      data-tip="edit"
                                    >
                                      <i class="fa fa-edit"></i>
                                    </a>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleDeleteTask(el._id)
                                    }
                                  >
                                    <a href="" data-tip="delete">
                                    <i class="icon entypo-trash scnd-font-color"></i>
                                    </a>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleFinishUpdate(el._id)
                                    }
                                  >
                                    <a href="" data-tip="finish">
                                      {" "}
                                      <i class="fa fa-check-square-o"></i>
                                    </a>
                                  </li>
                         
                                </ul>
                              </td>
                            </tr>
                          </tbody>

                        }
                          
                        )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
</div>

/****************************************************************** */


:

<div>


{project.projects &&
  project.projects
    .filter((elm) => elm._id == match.params.id)
    .map((proj) => {
      return proj.state === "valid" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(200, 247, 220)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                             
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(200, 247, 220)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                            elId.project._id === match.params.id && elId.employee._id === user.userInfo._id
                        )
                        .map((el) => (
                          <tbody>
                            <tr>
                              <td>
                             
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : proj.state === "ended" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(254, 228, 203)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(254, 228, 203)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                          elId.project._id === match.params.id && elId.employee._id === user.userInfo._id
                        )
                        .map((el) => (
                          <tbody>
                            <tr>
                              <td>
                               
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                             
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}> Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                             
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                          elId.project._id === match.params.id && elId.employee._id === user.userInfo._id
                        )
                        .map((el) => {


                          return el.state ==='valid'?
                        
                        <tbody  style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                              <td>
                           
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                             
                            </tr>
                          </tbody>

                         :el.state==='ended'?

<tbody  style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                              <td>
                           
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              
                            </tr>
                          </tbody>
                         :
                          <tbody>
                            <tr>
                              <td>
                           
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
                                <ul class="action-list">
                             
                            
                                  <li
                                    onClick={() =>
                                      handleFinishUpdate(el._id)
                                    }
                                  >
                                    <a href="" data-tip="finish">
                                      {" "}
                                      <i class="fa fa-check-square-o"></i>
                                    </a>
                                  </li>
                                  
                                </ul>
                              </td>
                            </tr>
                          </tbody>
})}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
</div>


{/* <TaskProjectEmployee/> */}



                })}
        </div>
      </div>
    </body>
  );
};

export default TaskProjectComponent;
