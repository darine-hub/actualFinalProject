import React, {useEffect,useState} from "react";
import "./announcement.scss";
import {  formatDistance} from 'date-fns'
import { useDispatch , useSelector} from "react-redux";
import TextEditor from "./BlogPage/Section/CreatePage";
import {getBlog} from '../redux/postsSlice'
import { useHistory } from "react-router";
import "quill/dist/quill.snow.css";

const Announcement = () => {
  const [show, setShow] = useState(false);
  const [displaydel, setDisplaydel] = useState("none");
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {
    dispatch(getBlog())}, [dispatch]);
const blogs = useSelector(state=>state.blogs)
const user = useSelector(state=>state.user)
 


  const handleClick = () => {
    setShow(!show);
    setDisplaydel("block");
  };
  
  return (
    <> 
        <h4> Announcements </h4>
        <div className="panel">
        {blogs?blogs.blogs.map(elm=>(
        <div className="notification">
          <header>
            <div className="profile">
              <div>
                <img
                  className="profile-pic"
                  src={elm.writer.image}
                />

                <p> {elm.writer.firstName} {elm.writer.lastName}</p>
              </div>
            </div>
            <p className="message">
         {elm.description} 
            </p>
            <i className="fa fa-ellipsis-h"></i>
            <p onClick={()=>history.push(`blog/post/${elm._id}`)}>read full announcement </p>
            <span>{formatDistance(new Date(elm.createdAt), new Date(), { addSuffix: true })}</span>
          </header>
        </div>)):null}
       
        <div className="buttons" onClick={handleClick}>
         
        </div>
        <div
          id="id01"
          style={{ display: `${displaydel}` }}
          className="w3-modal"
        > 
          <div className="w3-modal-content">
            <div className="w3-container">
            <button onClick={() => setDisplaydel("none")}>X</button>
              <div>
                <TextEditor />
              
               
              </div>
            </div>
          </div>
        </div>
      </div>
     {user.userInfo.role==="Admin"? <button onClick={() => setDisplaydel("block")}> Add Announcement </button>:null}
      
    </>
  );
};

export default Announcement;
