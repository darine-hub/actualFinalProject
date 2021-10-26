import "./sidebarChat.css";
import { useDispatch, useSelector } from "react-redux";
import { clickedRoom, clicksender, getmessages } from "../../redux/messageSlice";

const SidebarChat = ({ message }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
   const handleClick = () => {
    console.log(message.sender, message.receiver);
    dispatch(getmessages({ user1: message.receiver, user2: message.sender }));
    dispatch(clicksender(users.users.filter(elm=>
      (((message.receiver===elm._id)||(message.sender===elm._id))&&(elm._id!==users.userInfo._id)))[0])
        
   );
   dispatch(clickedRoom(null))
  };
  
 
  return (
    <div className="sidebarChat" onClick={handleClick}>
      <div className="sidebarChat_info">
        
        {users.users.map(elm=>
          (((message.receiver===elm._id)||(message.sender===elm._id))&&(elm._id!==users.userInfo._id))?
            <h2>{elm.firstName} {elm.lastName} </h2>:null
          
       )}
        <p>{message.body} {message.timeStamp}</p>
      </div>
    </div>
  );
};
export default SidebarChat;
