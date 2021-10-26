import "./chat.css"
import {  useState } from "react"
import { useSelector , useDispatch } from "react-redux"
import { addchatMessage } from "../../redux/messageSlice"

const Chatroom = () => {
    const [input,setInput] =useState("")
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user);
    const reduxMessages = useSelector((state) => state.message);
    
    
    const handleSubmit = (e) => {
        const date = new Date()
        e.preventDefault()
        dispatch(addchatMessage({
            "body":input,
            "sender":users.userInfo._id,
            "timeStamp":date,
            "Room":reduxMessages.currentChat._id
          })
        )
setInput("")
    }
    
return(
    <div className="chat">
        <div className="chat__header">
         
            <div className="chat__headerInfo">
                
               <h3>{reduxMessages.currentChat.name} </h3>
                <p>Last seen at ...</p>
            </div>
            <div className="chat__headerRight">
               
            </div>
        </div>
        <div className="chat__body">
          
            {reduxMessages.Chatmessages.map(message => (
                <div>
             <div class="profile-picture small-profile-picture">
             <img width="40px" src={`${users.userInfo.image}`}/>
         </div>   
            <p className={`chat__message ${message.sender===users.userInfo._id?"chat__received":null}`}>
              
                {message.body}
                <span className="chat__timestamp">
                    {message.timeStamp}
                </span>
            </p>
            </div>
            ))}
            
            
        </div>
        
        <div className="chat__footer">
           
            <form>
                <input value={input} placeholder='type a message' onChange={(e)=>setInput(e.target.value)} type='text'/>
                <button type="submit" onClick={handleSubmit}> send a message</button>
                
                
            </form>

        </div>
        
    </div>
)
}
export default Chatroom