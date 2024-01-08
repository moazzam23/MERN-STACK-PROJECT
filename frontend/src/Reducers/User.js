import { createReducer } from "@reduxjs/toolkit";

const Loginrequest = 'Loginrequest';
const Loginsuccess = 'Loginsuccess';
const Loginfailure = 'Loginfailure';
const RegisterRequest = 'RegisterRequest';
const Registersuccess = 'Registersuccess';
const Registerfailure = 'Registerfailure';
const Loaduserrequest = 'Loaduserrequest';
const Loadusersuccess = 'Loadusersuccess';
const loaduserfailure = 'loaduserfailure';
const postoffollowingRequest = 'postoffollowingRequest';
const postoffollowingSuccess = 'postoffollowingSuccess';
const postoffollowingFailure = 'postoffollowingFailure';
const AlluserRequest = 'AlluserRequest';
const AlluserSuccess = 'AlluserSuccess';
const AlluserFailure = 'AlluserFailure';
const clearerror="clearerror";


const initialState = {
  isAuthenticated:false,
};


//USER LOGIN REDUCER
export const userReducer = createReducer(initialState, (builder) => {
  // login user
  builder
    .addCase(Loginrequest, (state) => {
      state.loading = true;
    })
    .addCase(Loginsuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(Loginfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });

  // register user
  builder
    .addCase(RegisterRequest, (state) => {
      state.loading = true;
    })
    .addCase(Registersuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(Registerfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });

  // load user
  builder
    .addCase(Loaduserrequest, (state) => {
      state.loading = true;
    })
    .addCase(Loadusersuccess, (state, action) => {
      state.loading = false;
      state.userdata = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(loaduserfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });
    builder.addCase(
      clearerror, (state)=>{
        state.error=null;
  
      }
    )
});

//FOLLOWING POST REDUCER
export const PostOfFollowingpostreducer= createReducer(initialState,(builder)=>{
  builder.addCase(
    postoffollowingRequest, (state)=>{
      state.loading=true;
    }
  )
  builder.addCase(
    postoffollowingSuccess, (state,action)=>{
      state.loading=false;
      state.postnew=action.payload;
      state.isAuthenticated=true;
    }
  )
  builder.addCase(
    postoffollowingFailure, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.isAuthenticated=false;

    }
  )
  builder.addCase(
    clearerror, (state)=>{
      state.error=null;

    }
  )
}) 

// Get All User Reducer
export const Alluserreducer= createReducer(initialState,(builder)=>{
  builder.addCase(
    AlluserRequest, (state)=>{
      state.loading=true;
    }
  )
  builder.addCase(
    AlluserSuccess, (state,action)=>{
      state.loading=false;
      state.userdata=action.payload;
      state.isAuthenticated=true;
    }
  )
  builder.addCase(
    AlluserFailure, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.isAuthenticated=false;

    }
  )
  builder.addCase(
    clearerror, (state)=>{
      state.error=null;

    }
  )
}) 