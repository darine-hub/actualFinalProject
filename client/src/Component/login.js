import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';

import ParticleComponent from "./particles" ;
import BubbleComponent from "./bubble" ;
import "../styleCss/login.css"
const LoginPage = ({history}) => { 

  const dispatch = useDispatch();
  const [userInput,setUserInput]=useState({});
  const user = useSelector((state) => state.user);
  console.log(user)
  useEffect(() => {
      if(!user.isAuth){
        history.push('/login')
          
      }else{
        history.push('/')  
      }
  }, [user.isAuth])
 
 const handleChange =(e)=>{
     setUserInput({...userInput,
         [e.target.name]:e.target.value
     })
 }
 
 const handleSubmit =(e)=>{
     e.preventDefault();
     dispatch(login(userInput))
 }
  return (
    <>
  
<div class="bg"></div>
<div class="cont-1 animated fadeIn">
  <center>
    <h2>
      <a href="#homepage">Login</a>
    </h2>
  </center>
  <hr/>
  <form>
		<center>
      <div> 
        <input  type='email' placeholder='email' name='email' onChange={handleChange}/>
        <input type='password'
        placeholder='password'
        name='password'
        onChange={handleChange}/>
       </div>
		<p class="a-link"><a href="#forget-password">Forget password?</a></p>
    <button type='submit' onClick={handleSubmit}>
        Login
      </button>
		</center>
		<br/>
  
	</form>
  <h1 style={{color:'white'}}>{user.userErrors && user.userErrors }</h1>
</div>


  <ul class="bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
  


    
    <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <ParticleComponent />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
       
          {/* You can render <Route> and <NavTabs /> here */}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <BubbleComponent />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          
        </div>
      
      </div>
    
    </>
  );
};

export default LoginPage;