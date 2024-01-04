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

const initialState = {
  isAuthenticated:false,
};

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
      state.user = action.payload;
      state.isAuthenticated=true;
    })
    .addCase(loaduserfailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    });
});

