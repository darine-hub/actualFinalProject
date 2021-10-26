import React from 'react'
import BarreNavigationHome from './BarreNavigationHome'
import {useState,useEffect} from 'react';
import {logout,getUsers,deleteUser,updateStateUser} from '../redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'

const ListUser = ({history}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    useEffect(() => {
  

      
          dispatch(getUsers())
          
          
     
   
  }, [])


  const handleDeleteUser = (idUser) => {

    if (window.confirm( "etes vous sur de bloquer cet User!" ) ) {
      dispatch(updateStateUser(idUser));
  } else {
    alert = "You pressed Cancel!";
  }
  }


    return (
        <body>

        <div class="main-container">
          <BarreNavigationHome/>
          <div class="listProject">
   

   {user.users &&
                   user.users.map((elm)=>(
                       <div className='listProfile'>

                    <a class="add-button" href={`/profileUserAdmin/${elm._id}`}><span class="icon entypo-plus scnd-font-color"></span></a>
                    <div class="profile-picture big-profile-picture clear">
                        <img  className='imgProfile' alt="Anne Hathaway picture" src={elm.image} />
                    </div>
                    <h1 class="user-name">{elm.firstName}  {elm.lastName} </h1>
                    <div class="profile-description">
                      { elm.blocked === false?
                     
                   <p class="scnd-font-color">{elm.role}</p>:
                   <p class="scnd-font-color"> Out services</p>
                      }
                        
                    </div>
                    <ul class="profile-options horizontal-list">
                        <li><a class="comments" href={`/profileUserAdmin/${elm._id}`}><p><span class="icon entypo-pencil scnd-font-color"></span>EDIT</p></a></li>
                        <li><a class="views" href={`/profileUserAdmin/${elm._id}`}><p><span class="icon fontawesome-eye-open scnd-font-color"></span> MORE</p></a></li>
                        <li onClick={()=>handleDeleteUser(elm._id)}><a class="likes" /* href="#42" */><p><span span class="icon entypo-trash scnd-font-color" ></span >block</p></a></li>
                    </ul> 
        
                        </div>  
                     

                   )
 )}
          
   
       
           
   
   
   
           
      
   
   </div>  


        </div>
        </body>
    )
}

export default ListUser

