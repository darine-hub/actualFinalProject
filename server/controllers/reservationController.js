const Reservation = require('../Models/reservationSchema')
const getreservations= async (req,res)=>{
    try{
        const reservation = await Reservation.find()
        if(!reservation) {
            res.status(400).json({success: false});
          }
          res.send(reservation);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
const addreservations= async (req,res)=>{
    try{
        console.log('hi')
        console.log(req.body)
        const{salleId,userId,dateOfreservation}=req.body
        const newReservation = new Reservation({
            salleId,
            userId,
            dateOfreservation
          });
          await newReservation.save()
        
        if(!newReservation) {
            res.status(500).json({success: false});
          }
          res.send(newReservation);
      
      }

    catch(error){
console.error(error)
    }
    

}
const getreservationsbyId= async (req,res)=>{
    try{
        const reservationbyId = await Reservation.find({userId:req.params.id})
        if(!reservationbyId) {
            res.status(400).json({success: false});
          }
          res.send(reservationbyId);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
module.exports={getreservations,addreservations,getreservationsbyId}