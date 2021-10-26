
const ChatRoom = require('../models/chatSchema')
const Message = require('../models/messageSchema')
const Msg = require("../models/chatmessagesSchema")

const addRoom = async (req, res) => {
    try {
      const { name , members } = req.body;
      
      const newRoom = await ChatRoom.create({name,members});
      
      res.json(newRoom);
      console.log(newRoom) 
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error)
      
    }
  };
  
  const getAllChatrooms= async (req,res)=>{
    try{
        const Chatrooms = await ChatRoom.find({members:{ $in: req.params.id}})
        if(!Chatrooms) {
            res.status(400).json({success: false});
          }
          res.send(Chatrooms);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
const getRoomChat= async (req,res)=>{
  try{
      const Chat = await Msg.find({Room: req.params.id})
      if(!Chat) {
          res.status(400).json({success: false});
        }
        res.send(Chat);
    
    }

  catch(error){
      res.status(500).json({success: false});
  }
  

}
const addmessage = async (req, res) => {
  try {
    const { sender , receiver , timeStamp , body } = req.body;
    const newMessage = await Message.create({sender , receiver , timeStamp , body});
    res.json(newMessage);
    console.log(newMessage) 
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
    
  }
};
const addchatmessage = async (req, res) => {
  try {
    const { sender , Room , timeStamp , body } = req.body;
    const newMessage = await Msg.create({sender , Room , timeStamp , body});
    res.json(newMessage);
    console.log(newMessage) 
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
    
  }
};
const getmessages= async (req,res)=>{
  try{
    console.log('hi',req.params)
      const messages = await Message.find({
      
        $or : [
          { $and : [{ sender : req.params.user1 }, { receiver : req.params.user2 }] },
          { $and : [{ sender : req.params.user2  }, { receiver : req.params.user1  }] },
        ]
      })
      if(!messages) {
          res.status(400).json({success: false});
        }
        res.send(messages);
    
    }

  catch(error){
      res.status(500).json({success: false});
  }
  

}
const getallmessages= async (req,res)=>{
  try{
  
      const messages = await Message.find({
        $or : [
          {sender : req.params.id},
          { receiver: req.params.id},
        ]
      })
      if(!messages) {
          res.status(400).json({success: false});
        }
        res.send(messages);
    
    }

  catch(error){
      res.status(500).json({success: false});
  }
  

}
module.exports={getAllChatrooms,addchatmessage, getRoomChat,addmessage,getallmessages,getmessages,addRoom}