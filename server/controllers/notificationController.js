const Notification = require('../models/notificationSchema');

const addNotification =  async(req,res)=>{
    try {
       
        
        const {titre,message,joinDate,receiver}= req.body
        const newNotification =await Notification.create({
        titre,
        message,
        joinDate,
        receiver,
        owner:req.personId,

       
     })
        res.json(newNotification);
        
        
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
       
    }
    
    
    
    
    
    } 

    const getNotificationController = async (req,res)=>  {
        try {
            
              const listNotifications= await  Notification.find().populate('owner', '-password').populate('receiver');
              res.status(200).json(listNotifications)
               
        } catch (error) {
            res.status(500).json({message:error})
        }
     
    
    }

    module.exports={addNotification,getNotificationController}