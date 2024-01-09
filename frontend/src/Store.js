import {configureStore} from "@reduxjs/toolkit";
import { PostOfFollowingpostreducer, userReducer,Alluserreducer } from "./Reducers/User";
import { LikeanddislikeReducer, MyspostReducer } from "./Reducers/Post";

const store = configureStore({
    reducer:{ 
        user:userReducer,
        postoffolllowing:PostOfFollowingpostreducer,
        Alluser:Alluserreducer,
        Likepost: LikeanddislikeReducer,
        Mypost:MyspostReducer,
     }
})

export default store;