
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postNewTask = createAsyncThunk(
  'task/postNewTask',
  async (info, { rejectWithValue }) => {
    try {
        
      const res = await axios.post(`http://localhost:5000/project/tasks/addtask`, info ,{
        headers: { token: localStorage.getItem('token') }
      }) 
      console.log(info)
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const afficheTask = createAsyncThunk(
  'task/afficheTask',
  async (info, { rejectWithValue }) => {
    try {
        
      const res = await axios.get('http://localhost:5000/project/tasks/listTasks',{
        headers: { token: localStorage.getItem('token') }
      }) 
      
     
      return res.data;
    }
    
    catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`http://localhost:5000/project/tasks/updateTask/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(afficheTask());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getTask = createAsyncThunk(
  'tasks/getTask',
  async (ownerId, { rejectWithValue }) => {
    try {
      
        
      const res = await axios.get(`http://localhost:5000/project/tasks/tasksbyId/${ownerId}` ,{
        headers: { token: localStorage.getItem('token') }
      }) 
      
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const updateStateTask = createAsyncThunk(
  'task/updateStateTask',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`http://localhost:5000/project/tasks/updateStateTask/${id}`, {}, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(afficheTask());
      return res.data;
     
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const updateFinishTask = createAsyncThunk(
  'task/updateFinishTask',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`http://localhost:5000/project/tasks/updateFinishTask/${id}`, {}, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(afficheTask());
      return res.data;
      
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);




export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`http://localhost:5000/project/tasks/deleteTask/${id}`, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(afficheTask());
      return res.data;
      
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



export const deleteManyTask = createAsyncThunk(
  'task/deleteManyTask',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`http://localhost:5000/project/tasks/deleteManyTasks/${id}`, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(afficheTask());
      return res.data;
      
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);




const taskSlice = createSlice({
    name: 'task',
    initialState: {
      tasks: [],
      taskbyId:[],
      loading: false,
      taskErrors: null,
      tasksErrors: null,
     task: {},
     tasksProject:[]
    },
  

    extraReducers: {
      [postNewTask.pending]: (state) => {
        state.loading = true;
      },
      [postNewTask.fulfilled]: (state, action) => {
       
        state.loading = false;
        state.task = action.payload;
        state.projectErrors = null;
      },
      [postNewTask.rejected]: (state, action) => {
        state.taskErrors = action.payload;  
        state.loading = false;
        
      },
      
      [afficheTask.ending]:state=>{
        state.loading =true;
      },
      [afficheTask.fulfilled]:(state,action)=>{
      state.loading=false;
      state.tasks=action.payload;
      state.errors=null;
      
      
      },
      [afficheTask.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },

      [updateStateTask.pending]:state=>{
        state.loading =true;
      },
      [updateStateTask.fulfilled]:(state,action)=>{
      state.loading=false;
      state.taskt=action.payload;
      state.errors=null;
      
      
      },
      [updateStateTask.rejected]:(state,action)=>{
      state.loading=false;
      state.taskErrors=action.payload;
      },


      [updateFinishTask.pending]:state=>{
        state.loading =true;
      },
      [updateFinishTask.fulfilled]:(state,action)=>{
      state.loading=false;
      state.taskt=action.payload;
      state.errors=null;
      
      
      },
      [updateFinishTask.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },


      [updateTask.pending]:state=>{
        state.loading =true;
      },
      [updateTask.fulfilled]:(state,action)=>{
      state.loading=false;
      state.task=action.payload;
      state.errors=null;
      
      
      },
      [updateTask.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },

      [deleteTask.pending]:state=>{
        state.loading =true;
      },
      [deleteTask.fulfilled]:(state,action)=>{
      state.loading=false;
      state.task=action.payload;
      state.errors=null;
      
      
      },
      [deleteTask.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },

      [deleteManyTask.pending]:state=>{
        state.loading =true;
      },
      [deleteManyTask.fulfilled]:(state,action)=>{
      state.loading=false;
      state.tasks=action.payload;
      state.errors=null;
      
      
      },
      [deleteManyTask.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },
      [getTask.pending]: (state) => {
        state.loading = true;
      },
      [getTask.fulfilled]: (state, action) => {
       
        state.loading = false;
        state.taskbyId = action.payload;
        state.projectErrors = null;
      },
      [getTask.rejected]: (state, action) => {
        state.errors = action.payload;  
        state.loading = false;
        
      
   
  }}});
  
  export default taskSlice.reducer;
