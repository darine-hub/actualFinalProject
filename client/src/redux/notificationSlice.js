import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postNewNotification = createAsyncThunk(
  'notification/postNewNotification',
  async (info, { rejectWithValue }) => {
    try {
        
      const res = await axios.post(`http://localhost:5000/notification/addNotification`, info ,{
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


export const getNotification = createAsyncThunk(
    'notification/getNotification',
    async (info, { rejectWithValue }) => {
      try {
          
        const res = await axios.get('http://localhost:5000/notification/listNotifications',{
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




const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
      notifications: [],
      loading: false,
      notificationErrors: null,
      notificationErrors: null,
     notification: {},
    
    },
  

    extraReducers: {
      [postNewNotification.pending]: (state) => {
        state.loading = true;
      },
      [postNewNotification.fulfilled]: (state, action) => {
       
        state.loading = false;
        state.notification = action.payload;
        state.notificationErrors = null;
      },
      [postNewNotification.rejected]: (state, action) => {
        state.notificationErrors  = action.payload;  
        state.loading = false;
        
      },
      
      [getNotification.ending]:state=>{
        state.loading =true;
      },
      [getNotification.fulfilled]:(state,action)=>{
      state.loading=false;
      state.notifications=action.payload;
      state.errors=null;
      
      
      },
      [getNotification.rejected]:(state,action)=>{
      state.loading=false;
      state.errors=action.payload;
      },

      



           
      

     
    },
  });
  
  export default notificationSlice.reducer;