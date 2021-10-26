import React, { useState } from "react";


/* import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js"; */

import { useDispatch ,useSelector  } from "react-redux";
import { postNewUser } from "../redux/userSlice";
import BarreNavigationHome from "./BarreNavigationHome";
import {logout,getUsers} from '../redux/userSlice'
import {useEffect,useRef} from 'react';

 import "../styleCss/register.css"; 
 import axios from 'axios';
 import emailjs from 'emailjs-com';

const UserComponent = () => {

  const form = useRef();
  const [step, setStep] = useState(1);

  const [userInput, setUserInput] = useState({});
  const [fileInput, setFileInput] = useState({});



  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUsers())

 
  
}, [])

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_ijlk7jy', 'template_tquv2vw',e.target, 'user_TnQ9mkOd2fnep9GX4SvMe')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
};


 

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  
  };

  console.log (userInput.email)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewUser({ userInput ,fileInput}));
    nextStep();
    sendEmail(e)
 
  };

  const nextStep = () => {
    setStep(Number(step + 1));
  };

  const prevStep = () => {
    setStep(Number(step - 1));
  };

  return (

    <body>

    <div class="main-container">
    
      <BarreNavigationHome/>
      
      <div class="middle-container container">
    
    
      <div  > 

    <div /* id="mainCoantiner" */>
     {/* <div class="container-fluid">  
      <div class="row justify-content-center">*/}
        <div class="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
          <div /* class="card" */>
         
            {/*     <ul id="progressbar">
                        <li  id="account"><strong>Account</strong></li>
                        <li class="active"id="personal"><strong>Personal</strong></li>
                        <li id="payment"><strong>Image</strong></li>
                        <li id="confirm"><strong>Finish</strong></li>
                    </ul>
                    <div class="progress">
                        
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="50" aria-valuemax="100"></div>
                    </div>  */}

            {step === 1 ? (
              <form id="msform">
                <ul id="progressbar">
                  <li class="active" id="account">
                    <strong>Account</strong>
                  </li>
                  <li id="personal">
                    <strong>Personal</strong>
                  </li>
                  <li id="payment">
                    <strong>Image</strong>
                  </li>
                  <li id="confirm">
                    <strong>Finish</strong>
                  </li>
                </ul>
<br/><br/>
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Account Information:</h2>
                      </div>
                    </div>
                    <label class="fieldlabels">Email: * </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Id"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Password: *</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Confirm Password: *</label>
                    <input
                      type="password"
                      name="cpwd"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="Next"
                    onClick={nextStep}
                  />
                </fieldset>
              </form>
            ) : step === 2 ? (
              <form id="msform">
                <ul id="progressbar">
                  <li id="account">
                    <strong>Account</strong>
                  </li>
                  <li class="active" id="personal">
                    <strong>Personal</strong>
                  </li>
                  <li id="payment">
                    <strong>Image</strong>
                  </li>
                  <li id="confirm">
                    <strong>Finish</strong>
                  </li>
                </ul>
                <br/><br/>
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Personal Information:</h2>
                      </div>
                    </div>
                    <label class="fieldlabels">First Name: *</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Last Name: *</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Age</label>
                    <input
                      type="text"
                      name="age"
                      placeholder="Age"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Family Situation</label>
                    <select
                    
                    
                      name="familySituation"
                      onChange={handleChange}
                    
                    >
                       <option    value="familySituation" > familySituation</option>
                      <option    value="Single" >Single</option>
                      <option    value="Maried" >Maried</option>
                      <option   value="Devorced" >Devorced</option>
                    </select>

                    <label class="fieldlabels">Contact No.: *</label>
                    <input
                      type="text"
                      name="tel"
                      placeholder="Contact No."
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Adress</label>
                    <input
                      type="text"
                      name="adress"
                      placeholder="Adress"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Role</label>
                 
                    <select id="options" name="role"  onChange={handleChange}>
                    <option value="Role"> role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                    <label class="fieldlabels">Depatement</label>
                  
                    <select id="options" name="departement"  onChange={handleChange}>

                    <option value="Departement">Departement</option>
                      <option value="Departement 1">Departement 1</option>
                      <option value="Departement 2">Departement 2</option>
                      <option value="Departement 3">Departement 3</option>
                    </select>
                  </div>
                  <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="Next"
                    onClick={nextStep}
                  />
                  <input
                    type="button"
                    name="previous"
                    class="previous action-button-previous"
                    value="Previous"
                    onClick={prevStep}
                  />
                </fieldset>
              </form>
            ) : step === 3 ? (
              <form id="msform">
                <ul id="progressbar">
                  <li id="account">
                    <strong>Account</strong>
                  </li>
                  <li id="personal">
                    <strong>Personal</strong>
                  </li>
                  <li class="active" id="payment">
                    <strong>Image</strong>
                  </li>
                  <li id="confirm">
                    <strong>Finish</strong>
                  </li>
                </ul>
                <br/><br/>
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Image Upload:</h2>
                      </div>
                    </div>
                    <label class="fieldlabels">Upload Your Photo:</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setFileInput(e.target.files[0])}
                    />
                  </div>
                  <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                  <input
                    type="button"
                    name="previous"
                    class="previous action-button-previous"
                    value="Previous"
                    onClick={prevStep}
                  />
                </fieldset>
              </form>
            ) : (
              <form id="msform" ref={form} onSubmit={sendEmail}>
                <ul id="progressbar">
                  <li id="account">
                    <strong>Account</strong>
                  </li>
                  <li id="personal">
                    <strong>Personal</strong>
                  </li>
                  <li id="payment">
                    <strong>Image</strong>
                  </li>
                  <li class="active" id="confirm">
                    <strong>Finish</strong>
                  </li>
                </ul>
                <br/><br/>
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                     
                        <h2 class="fs-title">Send Mail to User:</h2>
                      </div>
                    </div>{" "}
                    <br />
                    <br />
                    <label class="fieldlabels">Name</label>
                    <input
                     type="text" name="user_name"
                      
                      value={userInput.firstName}
                    />
                    <label class="fieldlabels">Mail</label>
                    <input
                      type="text" name="user_email" 
                      value={userInput.email}
                      
                    />
                     <label class="fieldlabels">Message</label>
                    <input
                     type="text" name="message"
                      
                      value={userInput.password}
                    />
                      <input
                    type="button"
                    name="send"
                    class="next action-button"
                   
                    type="submit" value="Send"
                  />
                   </div>
                </fieldset>
              </form>
            )}
          </div>
      
          </div>
          </div>



          </div>
         
      
      </div>
      </div>
      </body>
          
        
  );
};

export default UserComponent;
