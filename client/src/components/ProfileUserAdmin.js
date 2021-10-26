import React from 'react'
import '../styleCss/profile.css'
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import BarreNavigationHome from './BarreNavigationHome';
import {getUsers, updateUser} from '../redux/userSlice';
import {useState,useEffect} from 'react';

const ProfileUserAdmin = ({history,match}) => {


    var maintenant=new Date();
var jour=maintenant.getDate();
var mois=maintenant.getMonth()+1;
var an=maintenant.getFullYear();
    const dispatch = useDispatch();
    

    const user = useSelector(state => state.user)
    useEffect(() => {
       
  
        if(user.isAuth){
            
            dispatch(getUsers())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])


    const [updatedInfo, setUpdatedInfo] = useState({});
    console.log(updatedInfo)
    const handleUpdate = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
      };
      const handleUpdateSubmit = (e, userId) => {
        e.preventDefault();
        dispatch(updateUser({ id: userId, data: updatedInfo }));

    };
   

    return (
        <body>

        <div class="main-container">
          <BarreNavigationHome/>
          <div class="middle-container container">
           { user.users && user.users.filter(elm=>elm._id=== match.params.id).map((el)=> (
         <div class="">  
        
        
        <div class="containerProfile">
        
            <h1 class="title">MY PROFILE</h1>
        
            <div class="grid">
                <div class="form-group a">
                    <label for="name">EMAIL</label>
                    <input name="email" type="text" placeholder={el.email}  onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group b">
                    <label for="first-name">ROLE</label>
                    <select id="options" name="role" onChange= {handleUpdate} >
                    <option value="Role"> {el.role}</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                </div>
        
                <div class="form-group email-group">
                    <label for="email">FIRSTNAME</label>
                    <input name="firstName" type="text" placeholder={el.firstName} onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group phone-group">
                    <label for="phone">LASTNAME</label>
                    <input name="lastName" type="text" placeholder={el.lastName} onChange= {handleUpdate}/>
                </div>
        
                <div class="textarea-group">
        <img style={{width:'150px',height:'150px',borderRadius:'50%'}}src={el.image}/>
                </div>
        
                <div class="form-group">
                    <label for="address">AGE</label>
                    <input id="address" type="text" name='age' placeholder={el.age} onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label for="address">FAMILY SITUATION</label>
                    <select
                    
                    
                    name="familySituation"
                    onChange= {handleUpdate}
                  
                  >
                     <option    value="familySituation"  > {el.familySituation}</option>
                    <option    value="Single" >Single</option>
                    <option    value="Maried" >Maried</option>
                    <option   value="Devorced" >Devorced</option>
                  </select>
                </div>
                <div class="form-group">
                    <label for="address">CONTACT NO</label>
                    <input name='tel' type="text" placeholder={el.tel} onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group">
                    <label for="address">ADRESS</label>
                    <input name="address" type="text"  placeholder={el.adress} onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label for="address">TITLE</label>
                    <input name="title" type="text" placeholder={el.title}  onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label for="address">DEPARTEMENT</label>
                {/*     <input id="address" type="text" placeholder={el.departement}/> */}
               
                <select id="options" name="departement" onChange= {handleUpdate}>

                    <option value="Departement">{el.departement}</option>
                      <option value="Departement 1">Departement 1</option>
                      <option value="Departement 2">Departement 2</option>
                      <option value="Departement 3">Departement 3</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="address">JOIN DATE</label>
                    <input name="joinDate" type="text" placeholder= {new Date (el.joinDate).getDate() + '/'+ parseInt(new Date (el.joinDate).getMonth()+1) + '/'+new Date (el.joinDate).getFullYear()}  />
                </div>
            
           </div><br/> <br/><br/> <br/>
        
             < div class="text-center">
          	<a class="sign-in button" onClick={(e)=>handleUpdateSubmit(e,el._id)} >UPDATE  </a> 
            </div>	 
            
        </div>
        
        
        
        
        </div>  ))} </div> 
        
                </div></body>
    )
}

export default ProfileUserAdmin
