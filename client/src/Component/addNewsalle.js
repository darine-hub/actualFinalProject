import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import {React , useState} from 'react'
import { useDispatch } from "react-redux"
import {addSalle} from "../redux/salleSlice"

const MyVerticallyCenteredModal=(props) =>{
    const [dep , setDep] = useState("")
    const [counter , setCounter] = useState(0)
    const [name , setName] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = (e) => { 
        e.preventDefault()
        dispatch(addSalle({capacity:counter,departement:dep,name:name}))
        props.onHide()}
        console.log(name)
    
    return (
        
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New Salle</h4>
          <input placeholder="insert name"  onChange={(e)=>setName(e.target.value)}/>
          <select id="movie" onChange={(e)=>setDep(e.target.value)}>
        <option name = "all" value="all">check salles ....</option>
          <option name = "departement 1" value="departement1">1</option>
          <option name = "departement 2" value="departement2">2</option>
          <option name = "departement 3 " value="departement3">3</option>
        
        </select>
       
        <button onClick={()=>setCounter(counter+1)}>+</button>
       
        <button onClick={()=>setCounter(counter-1)}>-</button>
        <input value={counter} placeholder={counter}/>
      <button onClick={(e)=>handleSubmit(e)}>create</button> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default MyVerticallyCenteredModal