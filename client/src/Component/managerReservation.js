import "../styleCss/manager-disp.css";
import { getTask } from "../redux/taskSlice";
import { getreservations } from "../redux/reservationSlice";
import { getprojectbyid } from "../redux/projectSlice";
import { useEffect, useState } from "react";
import { getUsers } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import BarreNavigationHome from "../components/BarreNavigationHome"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
const Managerdisp = ({history}) => {
  const [project, setProject] = useState("all");
  const [date, setDate] = useState(new Date());
  const task = useSelector((state) => state.task);
  const projects = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const reservation = useSelector((state) => state.reservation);
  
 
  useEffect(() => {
    if (!user.isAuth) {
      history.push('/login');
      setTimeout(() => {  console.log("World!"); }, 2000);
    } 
    
  }, [user.isAuth]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    if (user.userInfo){
    dispatch(getTask(user.userInfo._id));}
  }, [dispatch,user.userInfo]);
  useEffect(() => {
    if (user.userInfo){
    dispatch(getprojectbyid(user.userInfo._id));
  }}, [dispatch,user.userInfo]);
  useEffect(() => {
    dispatch(getreservations());
  }, [dispatch,user.userInfo]);

  const FORMAT = 'dd/MM/yyyy';
  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  
  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
  

  return (
    <div className="main-container">
      
      
      <BarreNavigationHome/>
        <div>
         
           <DayPickerInput
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
      onDayChange={date=>setDate(date)}
    />
          <h1>Projects</h1>
          <select
            className="movie"
            onChange={(e) => setProject(e.target.value)}
          >
            <option name="all" value="all">
              choose a project
            </option>
            {projects.projectbyid.map((elm) =>
              elm ? <option name="all">{elm.title}</option> : null
            )}
          </select>
        </div>
        {task.taskbyId
          .filter((elm) =>
            project === "all" ? elm : elm.project.title === project
          )
          .map((elm) =>
            elm.employee ? (
              <div className="employee block">
                <a className="add-button" href="#28">
                  <span className="icon entypo-plus scnd-font-color"></span>
                </a>
                <div className="profile-picture big-profile-picture clear">
                  <img
                    width="150px"
                    alt="Anne Hathaway picture"
                    src={elm.employee.image}
                  />
                </div>
                <h1 className="user-name">
                  {elm.employee.firstName} {elm.employee.lastName}
                </h1>
                <p>
                  availability:
                  {reservation.reservations.filter(
                    (el) =>
                      el.userId === elm.employee._id && dateFnsFormat(new Date(el.dateOfreservation), FORMAT) === dateFnsFormat(new Date(date), FORMAT)
                  ).length===0 ? (
                    <h1>available</h1>
                  ) : (
                    <h1>not available</h1>
                  )}
                </p>
                <p>Project: {elm.project.title}</p>
                <p>Task: {elm.name}</p>
                <p>Description: {elm.description}</p>
                <div className="profile-description">
                  <p className="scnd-font-color"></p>
                </div>
              </div>
            ) : null
          )}
     
    </div>
  );
};
export default Managerdisp;
