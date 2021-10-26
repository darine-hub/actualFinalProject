import OneSalle from "./oneSalle";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { getsalles, getsallesbydept } from "../redux/salleSlice";
import { getUsers } from "../redux/userSlice";
import {
  getreservations,
  getreservationsbyId,
} from "../redux/reservationSlice";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./addNewsalle";
import BarreNavigationHome from "../components/BarreNavigationHome"
import Card from "./card";
import "../styleCss/HomePage.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const Salles = ({history}) => {
  const salle = useSelector((state) => state.salle);
  const user = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.reservation);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    if (!user.isAuth) {
      history.push('/login');
    } 
    
  }, [user.isAuth]);
  const checksalle = (e) => {
    e.target.value === "all"
      ? dispatch(getsalles())
      : dispatch(getsallesbydept(e.target.value));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getsalles());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getreservations());
  }, [dispatch]);
  useEffect(() => {
    if(user.userInfo){
    dispatch(getreservationsbyId(user.userInfo._id));
  }}, [dispatch]);
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
    <div>
      {user.userInfo?
      <div>
        <BarreNavigationHome />
        
       
        <div className="salles-res">
          <h1>{loading}</h1>

        
          {user.userInfo.role === "admin" ? (
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Launch vertically centered modal
            </Button>
          ) : null}

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="main-salle">
            
          <div>
          <ul className="showcase">
            
            <li>
              <div className="salle selected"></div>
              <small>Available</small>
            </li>
            <li>
              <div className="salle occupied"></div>
              <small>Occupied</small>
            </li>
          </ul>
          
          <div className="salle-container">
            <h1>Departments</h1>
            <select className="movie" onChange={(e) => checksalle(e)}>
              <option name="all" value="all">
                check salles ....
              </option>
              <option name="departement 1" value="departement1">
                Departement 1
              </option>
              <option name="departement 2" value="departement2">
                Departement 2
              </option>
              <option name="departement 3 " value="departement3">
                Departement 3
              </option>
            </select>
          </div>
          <div style={{"color":"black"}}>
          <DayPickerInput
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
      onDayChange={date=>setDate(date)}
     
  />
    </div>
          <div className="row">
            {salle
              ? salle.salles.map((elm) => (
                  <OneSalle
                    salle={elm}
                    date={date}
                  ></OneSalle>
                ))
              : null}
          </div>
          </div>
          <div className="reservation-wrapper">
            { reservations.reservationbyId.filter(elm=>new Date(elm.dateOfreservation).getTime()>=new Date(dateFnsFormat(new Date(),"yyyy-MM-dd")).getTime()).sort((a, b) => new Date(a.dateOfreservation) - new Date(b.dateOfreservation)).map((elm, index) => (
              <div>
                <Card reservation={elm} count={index + 1} />
              </div>
            ))}
          </div>
          </div>
       
      </div></div>:null}
    </div>
    
  );
};

export default Salles;
