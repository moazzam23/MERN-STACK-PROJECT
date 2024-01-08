import {createReducer} from "@reduxjs/toolkit"


const LikeSuccess='LikeSuccess';
const LikeFailure='LikeFailure';
const LikeRequest='LikeRequest';
const CommentRequest='CommentRequest';
const CommentSuccess='CommnetSuccess';
const CommetFailure='CommentFailure';
const  ClearError='ClearError';
const ClearMessage='ClearMessage';

const initialState={};

export const LikeanddislikeReducer= createReducer(initialState,(builder)=>{

    builder.addCase(
        LikeRequest,(state)=>{
            state.loading=true;
        })
        .addCase(
        LikeSuccess,(state,action)=>{
            state.loading=false;
            state.message=action.payload;
        })
        .addCase(
        LikeFailure,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
   .addCase(
        CommentRequest,(state)=>{
            state.loading=true;
        })
        .addCase(
        CommentSuccess,(state,action)=>{
            state.loading=false;
            state.message=action.payload;
        })
        .addCase(
        CommetFailure,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(
        ClearError,(state)=>{
state.error=null;
        })
        .addCase(
        ClearMessage,(state)=>{
state.message=null;
        })
    })
