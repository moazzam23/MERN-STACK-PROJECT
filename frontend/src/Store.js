import {configureStore} from "@reduxjs/toolkit";
import { PostOfFollowingpostreducer, userReducer,Alluserreducer } from "./Reducers/User";
import { LikeanddislikeReducer } from "./Reducers/Post";

const store = configureStore({
    reducer:{ 
        user:userReducer,
        postoffolllowing:PostOfFollowingpostreducer,
        Alluser:Alluserreducer,
        Likepost: LikeanddislikeReducer,
     }
})

export default store;