const mongoose = require('mongoose')
const Schema= mongoose.Schema
const reservationSchema = new Schema ({
    salleId:
    { type: Schema.Types.ObjectId,
    required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'user',
        required:true

    },
created_at:{
    type:Date,
    default:Date.now()
},
dateOfreservation:{
    type:Date,
    required:true
}})

const Reservation = mongoose.model ('reservtion',reservationSchema);
module.exports= Reservation;