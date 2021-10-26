import React from 'react'
import "./sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/userSlice";
import SidebarChat from "./sidebarChat";
import MyVerticallyCenteredModal from './createChatFom'
import { clicksender ,getmessages, getchatmessages,clickedRoom ,getAllChatrooms } from "../../redux/messageSlice";
const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const messages = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  useEffect(() => {
    if(users.userInfo)
    {dispatch(getAllChatrooms(users.userInfo._id));}
  }, [dispatch]);
  const searchClick = (user) => {
    dispatch(clicksender(user))
    dispatch(getmessages({"user1":user._id,"user2":users.userInfo._id}))
    setSearch("")
    dispatch(clickedRoom(null))
  }
const clickroom = (id) => {
  dispatch(getchatmessages(id._id))
  dispatch(clickedRoom(id))
  dispatch(clicksender(null))
}

  
  return (
    <div className="side_bar_chat">
      {users.userInfo?<div><div className="sidebar__header">
        <div className="sidebar__headerRight"></div>
        
       
      
        
        
      <a class="add-button"  onClick={() => setDisplay("block")} href="#28"><span class="icon entypo-plus scnd-font-color"></span></a>
  
      
      
          <input
            placeholder="Search or start new chat"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           
          />
         
      
      </div>
     
        <div className="search__menu">
          {users.users
            .filter((elm) =>
              search !== ""
                ? `${elm.firstName} ${elm.lastName}`
                    .toLocaleLowerCase()
                    .includes(search)
                : false
            )
            .map((user) => (
              <div className="search__items" onClick={()=>searchClick(user)}> <h2>
                {user.firstName} {user.lastName}
                </h2>
              </div>
            ))}
        </div>
        <h1 style={{"background-color":"#394264","padding":"10px","margin":"0","border-bottom":"solid #1f253d"}}>Direct Messages</h1>
        <div className="sidebar__chats">
        {users.users.map((user) =>
          messages.allmessages
            .filter(
              (el) =>
                (user._id === el.receiver || user._id === el.sender) &&
                user._id !== users.userInfo._id
            )
            .slice(-1)
            .map((message) => <SidebarChat message={message} />)
        )}
      </div>
      <h1 style={{"background-color":"#394264","padding":"10px","margin":"0","border-bottom":"solid #1f253d","border-top":"solid #1f253d"}}>ChatRooms</h1>
      <div className="sidebar__chats" >
      {messages.ChatRooms.map(elm=><div className="sidebarChat" onClick={()=>clickroom(elm)} ><div className='sidebarChat_info'><h2>{elm.name}</h2></div></div>)}
      </div>
      <div id="id01" style={{ display: `${display}` }} className="w3-modal" >
        <div className="w3-modal-content">
          <div className="w3-container">
            <div>
            <MyVerticallyCenteredModal/>
              </div>
            <button onClick={() => setDisplay("none")}>Close</button>
          </div>
        </div>
    </div></div>:null}
    </div>
  );
};

export default Sidebar;
