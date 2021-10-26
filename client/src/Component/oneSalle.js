import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewreservation,
  clickdate,
  getreservationsbyId,
} from "../redux/reservationSlice";
import dateFnsFormat from "date-fns/format";
import "./salle.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import dateFnsParse from "date-fns/parse";

const OneSalle = (props) => {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("none");
  const salle = useSelector((state) => state.salle);
  const user = useSelector((state) => state.user);
  const reservation = useSelector((state) => state.reservation);
  const FORMAT = "dd/MM/yyyy";
  const dispatch = useDispatch();
  const filtered = reservation.reservations.filter(
    (elm) =>
      elm.salleId._id === props.salle._id &&
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(props.date), FORMAT)
  );
  const filter_user = reservation.reservationbyId.filter(
    (elm) =>
      elm.salleId._id === props.salle._id &&
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(props.date), FORMAT)
  );

  const handleClose = () => {
    dispatch(
      addNewreservation({
        salleId: props.salle._id,
        userId: user.userInfo._id,
        dateOfreservation: reservation.clickedDate,
      })
    );
    dispatch(getreservationsbyId(user.userInfo._id));
    setDisplay("none");
  };
 
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
    <>
     {/*  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
 */}
      <div
        className={`salle ${
          filtered.length > props.salle.capacity ? "red" : "blue"
        }`}
        onClick={() => setDisplay("block")}
      >
        {props.count}
        {props.name}
        {filter_user.length !== 0 ? (
          <div id="dot-container">
            <div id="dot">
              <div id="dot-pulse"></div>
            </div>
          </div>
        ) : null}
      </div>

      <div id="id01" style={{ display: `${display}` }} className="w3-modal" >
        <div className="w3-modal-content">
          <div className="w3-container">
            <div>
              <h2 style={{ color: "black" }}>
                user : {user.userInfo.firstName} {user.userInfo.lastName}
              </h2>
              <h2 style={{ color: "black" }}> date of reservation :</h2>
              <div>
                <p style={{ color: "red" }}>add reservation date</p>

                <DayPickerInput
                  formatDate={formatDate}
                  format={FORMAT}
                  parseDate={parseDate}
                  placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                  onDayChange={(date) => dispatch(clickdate(date))}
                />
              </div>

              <h2 style={{ color: "black" }}> salle selected : {salle._id} </h2>
            </div>
            <button variant="primary" onClick={handleClose}>
              Save Changes
            </button>
            <button onClick={() => setDisplay("none")}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSalle;
