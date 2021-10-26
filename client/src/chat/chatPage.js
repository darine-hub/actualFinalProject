import Sidebar from "./components/sidebar";
import Chat from "./components/chat";
import "./chatPage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage , getallmessages , updateChat} from "../redux/messageSlice"
import BarreNavigationHome from "../components/BarreNavigationHome"
import Pusher from "pusher-js"
import { useEffect  } from 'react';
import Chatroom from "./components/chatRoom"
import {useState} from 'react'

function ChatPage({history}) {
  const dispatch = useDispatch()
  const [dta , setDat] = useState()
  const reduxMessages = useSelector((state) => state.message);
  const users = useSelector((state) => state.user);
  useEffect(() => {
    if (!users.isAuth) {
      history.push('/login');
    } 
    
  }, [users.isAuth,history]);
  useEffect(()=>{
    if(users.userInfo)
  {dispatch(getallmessages(users.userInfo._id))}
  },[dispatch])
  useEffect(() => {
    const pusher = new Pusher("8039ec8f94cd766943cb", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      console.log(data)
      dispatch(updateMessage(data))
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [reduxMessages]);
  useEffect(() => {
    const pusher = new Pusher("8039ec8f94cd766943cb", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("chatRooms");
    channel.bind("inserted", (data) => {
      setDat(data)
      dispatch(updateChat(data))
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [reduxMessages]);
 console.log(dta)
  return (
    <div className="app">
      {reduxMessages?<div><BarreNavigationHome/>
      
      <div className="app__body">
     
      <Sidebar />
        {reduxMessages.sender&&<Chat /> }
        {reduxMessages.currentChat&&<Chatroom /> }
        
</div></div>:null}
      </div>
 
  );
}

export default ChatPage;
