import React from 'react'
import '../styleCss/profile.css'
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import BarreNavigationHome from './BarreNavigationHome';
import {getUsers,updateUserImage} from '../redux/userSlice';
import {useState,useEffect} from 'react';
import CryptoJS from "crypto-js";

const ProfileUser = ({history}) => {
    const dispatch = useDispatch();

	const handleUpdateImage = (e, userId) => {
		dispatch(updateUserImage({ id: userId, file: e.target.files[0] }));
	  };

	 

    const user = useSelector(state => state.user)
    useEffect(() => {
       
  
        if(user.isAuth){
            
            dispatch(getUsers())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])
const decryptagePassword=(password)=>{
	var bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');

	var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}



    return (
      

<body>

<div class="main-container">
  <BarreNavigationHome/>
  <div class="middle-container container">
   { user.users && user.users.filter(elm=>elm._id=== user.userInfo._id).map((el)=> (
 <div class="">  


<div class="containerProfile">

	<h1 class="title">MY PROFILE</h1>

	<div class="grid">
		<div class="form-group a">
			<label for="name">EMAIL</label>
			<input id="name" type="text" value={el.email}/>
		</div>
	

		<div class="form-group b">
			<label for="first-name">PASSWORD</label>
			<input id="first-name" type="text" value={el.password}/>
		</div>

		<div class="form-group email-group">
			<label for="email">FIRSTNAME</label>
			<input id="email" type="text" value={el.firstName}/>
		</div>

		<div class="form-group phone-group">
			<label for="phone">LASTNAME</label>
			<input id="phone" type="text" value={el.lastName}/>
		</div>
	

		<div class="textarea-group">
<img style={{width:'150px',height:'150px',borderRadius:'50%'}}src={el.image} />

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
					  onChange={(e) => handleUpdateImage(e,user.userInfo._id )}
                    />
		</div>

		<div class="form-group">
			<label for="address">AGE</label>
			<input id="address" type="text" value={el.age}/>
		</div>
        <div class="form-group">
			<label for="address">FAMILY SITUATION</label>
			<input id="address" type="text" value={el.familySituation}/>
		</div>
        <div class="form-group">
			<label for="address">CONTACT NO</label>
			<input id="address" type="text" value={el.tel}/>
		</div>

        <div class="form-group">
			<label for="address">ADRESS</label>
			<input id="address" type="text"value={el.adress}/>
		</div>
        <div class="form-group">
			<label for="address">TITLE</label>
			<input id="address" type="text"value={el.title}/>
		</div>
		<div class="form-group">
			<label for="address">ROLE</label>
			<input id="address" type="text"value={el.role}/>
		</div>
        <div class="form-group">
			<label for="address">DEPARTEMENT</label>
			<input id="address" type="text" value={el.departement}/>
		</div>
		<div class="form-group">
                    <label for="address">JOIN DATE</label>
                    <input name="joinDate" type="text" value= {new Date (el.joinDate).getDate() + '/'+ parseInt(new Date (el.joinDate).getMonth()+1) + '/'+new Date (el.joinDate).getFullYear()}  />
                </div>
	
	
	</div>
	
				  <br/> <br/><br/> <br/>
	< div class="text-center">
    <Link to={`/`}>	<a class="sign-in button"  >UPDATE  </a> </Link>
	</div>	
	
</div>




</div>  ))} </div> 

        </div></body>
    )
}

export default ProfileUser
