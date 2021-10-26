
import "./card.scss"
import { useState} from 'react'
import {deleteReservation,getreservationsbyId,updateReservation} from '../redux/reservationSlice'
import { useDispatch, useSelector } from "react-redux"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
const Card = ({reservation,count}) => {
 const [show,setShow]=useState(false)
 const [displaydel, setDisplaydel] = useState("none");
 const [displayedit, setDisplayedit] = useState("none");
 const [date,setDate]=useState(reservation.dateOfreservation)
 const [salles,setSalle]=useState(reservation.salleId)
 const user = useSelector(state=>state.users)
 const salle = useSelector(state=>state.salle)
 const dispatch = useDispatch()

 const handleClick = () =>{
   setShow(!show)
   setDisplaydel("block")
 }
 const handleClickEdit = () =>{
  setShow(!show)
  setDisplayedit("block")
}
 const handleClose = () => {
  setShow(false);

  dispatch(
    deleteReservation(reservation._id))
    dispatch(getreservationsbyId(user.userInfo._id))
    setDisplaydel("none")
  ;
};
const handleCloseEdit = () => {
  setShow(false);
  dispatch(updateReservation({ id: reservation._id, data: {"salleId":salles,"dateOfreservation":date} }))
  dispatch(getreservationsbyId(user.userInfo._id))
  setDisplayedit("none")
  ;
};
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
    return(

<div class="project-box-wrapper">
      <div class="project-box" style= {{backgroundColor: "#c8f7dc"}}  >
        <div class="project-box-header">
        <span></span>
         
        
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>
          reservation {count}
          </p>
          <p class="box-content-subheader" style={{color:'gray'}}> salle number : {reservation.salleId.nSalle}</p>
        </div>
        <div class="more-wrapper">
            <button class="project-btn-more" onClick={()=>setShow(!show)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" /></svg>
            </button>
            <div className={`dropdown-content ${show?"show":null}`}>
    <a href="#edit" onClick={handleClickEdit}>Edit</a>
    <a href="#delete" onClick={handleClick}>Delete</a>

    
  </div>
  {/**********************modal delete************************************* */}
  <div id="id01" style={{ display: `${displaydel}` }} className="w3-modal">
        <div className="w3-modal-content">
          

          <div className="w3-container">
            <div>
             <h2>delete reservation for {dateFnsFormat(new Date(reservation.dateOfreservation), FORMAT)} ?</h2>
            <button variant="primary" onClick={handleClose}>
              Save Changes
            </button>
            <button onClick={() => setDisplaydel("none")}>Close</button>
          </div>
        </div>
      </div>
          </div>
       </div>
       {/**********************modal edit******************************** */}
       <div id="id01" style={{ display: `${displayedit}` }} className="w3-modal">
        <div className="w3-modal-content">
          

          <div className="w3-container">
            <div>
            <DayPickerInput
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
      onDayChange={date=>setDate(date)}
     
  />
   <select
            className="salle-01"
            onChange={(e) => setSalle(e.target.value)}
          >
            <option name="all" value="all">
              choose a salle
            </option>
            {salle.salles.map((elm) =>
              elm ? <option name="salleId" value={elm._id}>salle Number {elm.nSalle}</option> : null
            )}
          </select>
            <button variant="primary" onClick={handleCloseEdit}>
              Save Changes
            </button>
            <button onClick={() => setDisplayedit("none")}>Close</button>
          </div>
        </div>
      </div>
          </div>
       </div>
       
        <div class="project-box-footer">
    
          <div class="days-left" style=   {{color: "#34c471"}} >
           {`${new Date(reservation.dateOfreservation).getDate()} / ${new Date(reservation.dateOfreservation).getMonth() + 1} / ${new Date(reservation.dateOfreservation).getFullYear()}`}
          </div>
        </div>
      </div>
    </div>

    )
}
export default Card