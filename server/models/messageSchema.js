const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  sender:{
      type : Schema.Types.ObjectId,
      ref:'user',
      required:true
  },
  receiver:{
    type : Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  body:{
  type:String
  },
  timeStamp :{
      type:Date
  },
  
  
});

const Message = mongoose.model("messagecollection", messageSchema);
module.exports = Message;