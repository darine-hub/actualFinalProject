import {createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/****************************************************** */

export const addMessage= createAsyncThunk(
  'messages/addMessage',
  async (info, { rejectWithValue, dispatch }) => {
    console.log('info here',info);
    try {
      const res = await axios.post('http://localhost:5000/chat/addmessage', info, {
        headers: { token: localStorage.getItem('token') },
      });
      console.log(info)
     dispatch(getmessages({"user1":info.sender,"user2":info.receiver}))
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
/********************************************************** */
export const addchatMessage= createAsyncThunk(
  'Chatmessages/addchatMessage',
  async (info, { rejectWithValue, dispatch }) => {
    console.log('info here',info);
    try {
      const res = await axios.post('http://localhost:5000/chat/addchatmessage', info, {
        headers: { token: localStorage.getItem('token') },
      });
      console.log(info)
     dispatch(getchatmessages(info.Room))
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
/******************************************************** */
export const addChatroom= createAsyncThunk(
  'chatRooms/addChatRoom',
  async (info, { rejectWithValue, dispatch }) => {
    console.log('info here',info);
    try {
      const res = await axios.post('http://localhost:5000/chat/addRoom', info, {
        headers: { token: localStorage.getItem('token') },
      });
      const id=JSON.parse(localStorage.getItem('user'))
      console.log(id)
      dispatch(getAllChatrooms(id._id.toString()))
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

/******************************************************* */
export const getAllChatrooms = createAsyncThunk(
  "chatRooms/getAllChatroom", async (userId, thunkAPI) => {
     try {
        const response = await axios.get(`http://localhost:5000/chat/getAllChatrooms/${userId}`,{
          headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
/******************************************************* */
export const getmessages = createAsyncThunk(
  "messages/getmessages", async (Info, thunkAPI) => {
     try {
       console.log(Info)
        const response = await axios.get(`http://localhost:5000/chat/getmessages/${Info.user1}/${Info.user2}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
/******************************************************* */
export const getallmessages = createAsyncThunk(
  "allmessages/getallmessages", async (Info, thunkAPI) => {
     try {
       console.log(Info)
        const response = await axios.get(`http://localhost:5000/chat/getallmessages/${Info}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});
/****************************************************************** */
export const getchatmessages = createAsyncThunk(
  "Chatmessages/getchatmessages", async (Info, thunkAPI) => {
     try {
       console.log(Info)
        const response = await axios.get(`http://localhost:5000/chat/getRoomChat/${Info}`,{
        
        headers: { token: localStorage.getItem('token')
         }});//where you want to fetch data
         
        return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
      messages: [],
      ChatRooms:[],
      allmessages:[],
      Chatmessages:[],
      sender:null,
      currentChat:null,
    loading: false,
    messageErrors: null,
    messagesErrors: null,
    ChatRoomsErrors:null,
    allmessagesErrors:null,
    ChatmessagesErrors:null,
    senderErrors:null,
    currentChatErrors:null,
    


    
  },
  reducers:{
    clicksender:(state,action)=>{
      state.sender=action.payload
  },
  updateMessage:(state,action)=>{
    state.messages=[...state.messages,action.payload]
},
updateChat:(state,action)=>{
  state.Chatmessages=[...state.Chatmessages,action.payload]},
clickedRoom:(state,action)=>{
  state.currentChat=action.payload
}},
  extraReducers: {
    [addMessage.pending]: (state) => {
      state.loading = true;
    },
    [addMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.messageErrors = null;
    },
    [addMessage.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    
    [getAllChatrooms.pending]: (state) => {
      state.loading = true;
    },
    [getAllChatrooms.fulfilled]: (state, action) => {
      state.loading = false;
      state.ChatRooms = action.payload;
      state.ChatRoomsErrors = null;
    },
    [getAllChatrooms.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [addChatroom.pending]: (state) => {
      state.loading = true;
    },
    [addChatroom.fulfilled]: (state, action) => {
      state.loading = false;
      state.ChatRoomsErrors = null;
    },
    [addChatroom.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getmessages.pending]: (state) => {
      state.loading = true;
    },
    [getmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
      state.messagesErrors = null;
    },
    [getmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getallmessages.pending]: (state) => {
      state.loading = true;
    },
    [getallmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.allmessages = action.payload;
      state.allmessagesErrors = null;
    },
    [getallmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [addchatMessage.pending]: (state) => {
      state.loading = true;
    },
    [addchatMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.ChatmessagesErrors = null;
    },
    [addchatMessage.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getchatmessages.pending]: (state) => {
      state.loading = true;
    },
    [getchatmessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.Chatmessages = action.payload;
      state.ChatmessagesErrors = null;
    },
    [getchatmessages.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    
  }, 
});

export const {clicksender , updateChat,updateMessage ,clickedRoom} = messageSlice.actions
export default messageSlice.reducer;