const mongoose = require('mongoose')
const Schema= mongoose.Schema
const salleSchema = new Schema ({

    name :String,
    capacity:Number,
    departement:{
        type:String,
        enum:['departement1','departement2','departement3']

    } }) 

const Salle = mongoose.model ('salle',salleSchema);
module.exports= Salle;