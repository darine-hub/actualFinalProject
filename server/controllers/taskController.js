
const Task = require('../models/taskSchema');

const addTask =  async(req,res)=>{
try {
   
    
    const {name,description,startDate,deadLine,project,employee}= req.body
    const newTask =await Task.create({
    name,
    description,
    startDate,
    deadLine,
    owner:req.personId,
    project,
    employee


    })
    res.json(newTask);
    
    
} catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
    console.log (projectId)
}





} 

const afficheTaskController = async (req,res)=>  {
    try {
        
          const listTasks = await  Task.find().populate('owner', '-password').populate('project').populate('employee');
          res.status(200).json(listTasks)
           
    } catch (error) {
        res.status(500).json({message:error})
    }
 

}
const afficheTaskbyId = async (req,res)=>  {
    try {
        
          const listTasks = await Task.find({owner:req.params.id}).populate('owner', '-password').populate('project').populate('employee');
          res.status(200).json(listTasks)
           
    } catch (error) {
        res.status(500).json({message:error})
    }
 

}




const updateTaskController = async (req,res)=>{
try {
    const { name,description,startDate,deadLine, state,employee} = req.body;
   const newTask = await Task.findByIdAndUpdate(req.params.id,{
 name,
 description,
 startDate,
 deadLine,
 state,
 employee

   });
   res.status(200).json(newTask)
    
} catch (error) {
    res.status(500).json({message:error})  
}


}


const updateStateTaskController = async (req,res)=>{
    try {
        
       const newTask = await Task.findByIdAndUpdate(req.params.id,{ 

 state:"valid",
 
        
       });
       res.status(200).json(newTask)
        
    } catch (error) {
        res.status(500).json({message:error})  
    }
    
    
    }

    const updateFinishTaskController = async (req,res)=>{
        try {
            
           const newTask = await Task.findByIdAndUpdate(req.params.id,{ 
    
     state:"ended",
     
            
           });
           res.status(200).json(newTask)
            
        } catch (error) {
            res.status(500).json({message:error})  
        }
        
        
        }
   


const deleteTaskController = async (req,res)=>{
try {
   const TaskDeleted = await Task.findByIdAndDelete(req.params.id);
   res.status(200).json(TaskDeleted)
    
} catch (error) {
    res.status(500).json({message:error}) 
}

}

const deleteManyTaskController = async (req,res)=>{
    try {
       const [TasksDeleted] = await Task.deleteMany({project: req.params.id});
       res.status(200).json([TasksDeleted] )
        
    } catch (error) {
        res.status(500).json({message:error}) 
    }
    
    }



module.exports={afficheTaskbyId ,addTask,afficheTaskController,updateTaskController,deleteTaskController,updateStateTaskController,updateFinishTaskController,deleteManyTaskController   }