const Salle = require('../Models/salleSchema')
const getsalles= async (req,res)=>{
    try{
        const salle = await Salle.find({})
        if(!salle) {
            res.status(400).json({success: false});
          }
          res.send(salle);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
const getsallesbydept= async (req,res)=>{
    try{
        const salle = await Salle.find({departement:req.params.dep})
        if(!salle) {
            res.status(400).json({success: false});
          }
          res.send(salle);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
const addSalle = async (req, res) => {
    try {
      const { name,
        capacity,
        departement } = req.body;
      const newSalle = await Salle.create({ 
        name,
        capacity,
        departement });
      res.json(newSalle);
      console.log(newSalle) 
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error)
      
    }
  };

module.exports={getsalles,addSalle,getsallesbydept}