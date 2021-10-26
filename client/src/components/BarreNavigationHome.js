import React from 'react'
import "../styleCss/HomePage.css"
import { useDispatch,useSelector } from 'react-redux'
import {useState,useEffect} from 'react';
import {logout,getUsers} from '../redux/userSlice'
import { Link } from "react-router-dom";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
/* import 'animate.css'; */
const BarreNavigationHome = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [search,setSearch]= useState('') 
    const handleLogout =(e)=>{
   
        dispatch(logout())
    }
    
    const handleClickDefault=()=>{
        store.addNotification({
           /* content:MyNotify, */
           title:'titre1',
           message:'you manager valid your task',
            type:'info',
            container:'top-right',
            insert:'top',
            animationIn:['animated','fadeIn'],
            animationOut:['animated','fadeout'],
             dismiss:{
                 duration:8000,
              showIcon:true
            }, 
            width:600
        })
    }

    return (
        <div>

<ReactNotification />
    

         
 {user.users &&
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
                    
             return elm.role === 'Admin' ? 

<header class="block">
<ul class="header-menu horizontal-list">
          
    {/*  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> */}       
<li>
                <a class="header-menu-tab" href= {'/'}><span class="icon entypo-home scnd-font-color"></span>Home</a>
            </li>
           
            <li>
                <a class="header-menu-tab" href={'/profile'}><span class="icon fontawesome-user scnd-font-color"></span>Account</a>
            </li>
         
            <li>
                <a class="header-menu-tab" href={'/register'}><span class="icon entypo-user-add scnd-font-color"></span>ADD User</a>
            </li>

            <li>
                <a class="header-menu-tab" href="#2"><span class="icon entypo-plus-squared scnd-font-color"></span>ADD Departement</a>
            </li>

            <li>
                <a class="header-menu-tab" href="#2"><span class="icon entypo-plus-circled scnd-font-color"></span>ADD Salle</a>
            </li>

         
           {/*  <li>
            <div class="input-container">
                <input type="text" placeholder="serch project" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/>
                <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div>
            </div></li> */}
        
        
        <li><div class="profile-menu">
        <Link to={'/login'}>  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> </Link> 
            <p>Me <a href="#26"><span class="entypo-down-open scnd-font-color"></span></a></p>
            
            <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.image}/>
            </div>
            
           
        </div></li>
        </ul>
    </header>: elm.role === 'Manager' ?

<header class="block">
<ul class="header-menu horizontal-list">

<li>
                <a class="header-menu-tab" href={'/'}><span class="icon entypo-home scnd-font-color"></span>Home</a>
            </li>
        
            <li>
                <a class="header-menu-tab" href={'/profile'}><span class="icon fontawesome-user scnd-font-color"></span>Account</a>
            </li>
         


            <li>
                <a class="header-menu-tab" href={'/project'} ><span class=" icon entypo-folder scnd-font-color"></span>ADD Project</a>
            </li>
          

            <li>
                <a class="header-menu-tab" href={'/salles'} ><span class=" icon entypo-calendar scnd-font-color"></span>ADD Disponibilities</a>
            </li>

            <li>
                <a class="header-menu-tab"  onClick={handleClickDefault} href='#' ><span class=" icon entypo-bell scnd-font-color"></span>Notification<div class="menu-box-number" style={{backgroundColor:'red'}}>5</div></a>
            </li>
          
           
            <li>
            <div class="input-container">
                <input type="text" placeholder="serch project" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/>
                <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div>
            </div></li>
       
        <li><div class="profile-menu">
        <Link to={'/login'}>  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> </Link> 
            <p>Me <a href="#26"><span class="entypo-down-open scnd-font-color"></span></a></p>
            
            <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.image}/>
            </div>
          
        </div></li>
        </ul>
       
    </header> :

<header class="block">
<ul class="header-menu horizontal-list">
<li>
                <a class="header-menu-tab" href={'/'}><span class="icon entypo-home scnd-font-color"></span>Home</a>
            </li>
           
           
           
            <li>
                <a class="header-menu-tab" href={'/profile'}><span class="icon fontawesome-user scnd-font-color"></span>Account</a>
            </li>
            <li>
                <a class="header-menu-tab" href={'/salles'} ><span class=" icon entypo-calendar scnd-font-color"></span>ADD Disponibilities</a>
            </li>
          
            <li>
                <a class="header-menu-tab" href='' ><span class=" icon entypo-bell scnd-font-color"></span>Notification <div class="menu-box-number" style={{backgroundColor:'red'}}>5</div></a>
            </li>
           
           
            <li>
            <div class="input-container">
                <input type="text" placeholder="serch project" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/>
                <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div>
            </div></li>
        </ul>

       
        <div class="profile-menu">
       
       <Link to={'/login'}>  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> </Link> 
            <p>Me <a href="#26"><span class="entypo-down-open scnd-font-color"></span></a></p>
            
            <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.image}/>
            </div>
          <div>
           
            </div>
        </div>
    </header>

})}




  
    <div class="left-container container">
    {user.users &&
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
                    
             return elm.role === 'Admin' ? 
        <div class="menu-box block"> 
            <h2 class="titular">MENU BOX</h2>
            <ul class="menu-box-menu">
                <li>
                    <Link to={"/chat"}><a class="menu-box-tab" href="#6"><span class="icon fontawesome-envelope scnd-font-color"></span>Messages<div class="menu-box-number">24</div></a> </Link>                           
                </li>
          
          
                
                <li>
                    <a class="menu-box-tab" href="#8"><span class="icon entypo-paper-plane scnd-font-color"></span>Invites<div class="menu-box-number">3</div></a>                            
                </li>
                <li>
                <Link to={'/bigcalendar'}><a class="menu-box-tab" href="#"><span class="icon entypo-calendar scnd-font-color"></span>Events<div class="menu-box-number">5</div></a></Link>                            
                </li>
              
              
               
                <li>
                    <a class="menu-box-tab" href={'/listUsers'}><sapn class="icon entypo-users scnd-font-color"></sapn>List Users</a>
                </li>

                <li>
                    <a class="menu-box-tab" href="#13"><sapn class="icon entypo-calendar scnd-font-color"></sapn>List Disponibilities</a>
                </li>

            </ul>
        </div> : elm.role ==='Manager'?

<div class="menu-box block"> 
<h2 class="titular">MENU BOX</h2>
<ul class="menu-box-menu">
    <li>
    <Link to={"/chat"}><a class="menu-box-tab" href="#6"><span class="icon fontawesome-envelope scnd-font-color"></span>Messages<div class="menu-box-number">24</div></a> </Link>                              
    </li>


    
    <li>
        <a class="menu-box-tab" href="#8"><span class="icon entypo-paper-plane scnd-font-color"></span>Invites<div class="menu-box-number">3</div></a>                            
    </li>
    <li>
    <Link to={'/bigcalendar'}><a class="menu-box-tab" href="#"><span class="icon entypo-calendar scnd-font-color"></span>Events<div class="menu-box-number">5</div></a></Link>                            
    </li>
   
   
    <li>
        <a class="menu-box-tab" href={'/listProject'}><sapn class="icon entypo-folder scnd-font-color"></sapn> Lists Projects</a>
    </li>

    <li>
    <Link to ={'/project-members-disponibility'}><a class="menu-box-tab" href=''><sapn class="icon entypo-calendar scnd-font-color"></sapn> Members Disponibilities</a></Link>
    </li>

</ul>
</div>:

<div class="menu-box block"> 
<h2 class="titular">MENU BOX</h2>
<ul class="menu-box-menu">
    <li>
    <Link to={"/chat"}><a class="menu-box-tab" href="#6"><span class="icon fontawesome-envelope scnd-font-color"></span>Messages<div class="menu-box-number">24</div></a> </Link>                                                         
    </li>


    
    <li>
        <a class="menu-box-tab" href="#8"><span class="icon entypo-paper-plane scnd-font-color"></span>Invites<div class="menu-box-number">3</div></a>                            
    </li>
    <li>
    <Link to={'/bigcalendar'}><a class="menu-box-tab" href="#"><span class="icon entypo-calendar scnd-font-color"></span>Events<div class="menu-box-number">5</div></a></Link>                          
    </li>
 
    <li>
        <a class="menu-box-tab" href={'/listProject'} ><sapn class="icon entypo-folder scnd-font-color"></sapn> List Projects</a>
    </li>
    <li>
       <a class="menu-box-tab" href=''><sapn class="icon entypo-calendar scnd-font-color"></sapn> My Disponibilities</a>
    </li>

</ul>
</div>
    
    })}
        
        
        
     




        <div class="donut-chart-block block"> 
            <h2 class="titular">OS AUDIENCE STATS</h2>
            <div class="donut-chart">
             
                <div id="porcion1" class="recorte"><div class="quesito ios" data-rel="21"></div></div>
                <div id="porcion2" class="recorte"><div class="quesito mac" data-rel="39"></div></div>
                <div id="porcion3" class="recorte"><div class="quesito win" data-rel="31"></div></div>
                <div id="porcionFin" class="recorte"><div class="quesito linux" data-rel="9"></div></div>
               
                <p class="center-date">JUNE<br/><span class="scnd-font-color">2013</span></p> 
            </div>
            <ul class="os-percentages horizontal-list">
                <li>
                    <p class="ios os scnd-font-color">iOS</p>
                    <p class="os-percentage">21<sup>%</sup></p>
                </li>
                <li>
                    <p class="mac os scnd-font-color">Mac</p>
                    <p class="os-percentage">48<sup>%</sup></p>
                </li>
                <li>
                    <p class="linux os scnd-font-color">Linux</p>
                    <p class="os-percentage">9<sup>%</sup></p>
                </li>
                <li>
                    <p class="win os scnd-font-color">Win</p>
                    <p class="os-percentage">32<sup>%</sup></p>
                </li>
            </ul>
        </div>
        <div class="line-chart-block block clear"> 
            <div class="line-chart">
        
                <div class='grafico'>
                   <ul class='eje-y'>
                     <li data-ejeY='30'></li>
                     <li data-ejeY='20'></li>
                     <li data-ejeY='10'></li>
                     <li data-ejeY='0'></li>
                   </ul>
                   <ul class='eje-x'>
                     <li>Apr</li>
                     <li>May</li>
                     <li>Jun</li>
                   </ul>
                     <span data-valor='25'>
                       <span data-valor='8'>
                         <span data-valor='13'>
                           <span data-valor='5'>   
                             <span data-valor='23'>   
                             <span data-valor='12'>
                                 <span data-valor='15'>
                                 </span></span></span></span></span></span></span>
                </div>
             
            </div>
            <ul class="time-lenght horizontal-list">
                <li><a class="time-lenght-btn" href="#14">Week</a></li>
                <li><a class="time-lenght-btn" href="#15">Month</a></li>
                <li><a class="time-lenght-btn" href="#16">Year</a></li>
            </ul>
            <ul class="month-data clear">
                <li>
                    <p>APR<span class="scnd-font-color"> 2013</span></p>
                    <p><span class="entypo-plus increment"> </span>21<sup>%</sup></p>
                </li>
                <li>
                    <p>MAY<span class="scnd-font-color"> 2013</span></p>
                    <p><span class="entypo-plus increment"> </span>48<sup>%</sup></p>
                </li>
                <li>
                    <p>JUN<span class="scnd-font-color"> 2013</span></p>
                    <p><span class="entypo-plus increment"> </span>35<sup>%</sup></p>
                </li>
            </ul>
        </div>
        <div class="media block"> 
            <div id="media-display">
                <a class="media-btn play" href="#23"><span class="fontawesome-play"></span></a>
            </div>
            <div class="media-control-bar">
                <a class="media-btn play" href="#23"><span class="fontawesome-play scnd-font-color"></span></a>
                <p class="time-passed">4:15 <span class="time-duration scnd-font-color">/ 9:23</span></p>
                <a class="media-btn volume" href="#24"><span class="fontawesome-volume-up scnd-font-color"></span></a>
                <a class="media-btn resize" href="#25"><span class="fontawesome-resize-full scnd-font-color"></span></a>
            </div>
        </div>
        <ul class="social horizontal-list block"> 
            <li class="facebook"><p class="icon"><span class="zocial-facebook"></span></p><p class="number">248k</p></li>
            <li class="twitter"><p class="icon"><span class="zocial-twitter"></span></p><p class="number">30k</p></li>
            <li class="googleplus"><p class="icon"><span class="zocial-googleplus"></span></p><p class="number">124k</p></li>
            <li class="mailbox"><p class="icon"><span class="fontawesome-envelope"></span></p><p class="number">89k</p></li>
        </ul>
    </div>
    
  </div>
            
      
    )
}


export default BarreNavigationHome
