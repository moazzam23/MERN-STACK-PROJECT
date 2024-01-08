
import axios from "axios";

export const Loginuser=(email,password)=> async(dispatch)=>{
try {
    
dispatch({
    type:"Loginrequest"
})

const {data}= await axios.post("/api/v1/login",{email,password},{ headers:{
"Content-Type":"application/json",
}})

dispatch({
    type:"Loginsuccess",
    payload:data.user
})

} catch (error) {
    dispatch({
        type:"Loginfailure",
        payload:error,
    })
    
}
}
export const LoadUser=()=> async(dispatch)=>{
try {
    
dispatch({
    type:"Loaduserrequest"
})

const {data}= await axios.get("/api/v1/myprofile")

dispatch({
    type:"Loadusersuccess",
    payload:data.userdata
})

} catch (error) {
    dispatch({
        type:"Loaduserfailure",
        payload:error.response.data.message,
    })
}
}


export const postoffollowinguser=()=>async(dispatch)=>{
try {


    dispatch({
        type:"postoffollowingRequest",

    })

    const {data}= await axios.get("/api/v1/posts")

    dispatch({
        type:"postoffollowingSuccess",
        payload:data.postnew,
    })

    
} catch (error) {
    dispatch({
        type:"postoffollowingFaliure",
        payload:error.response.data.message,
    })
}
}

export const Alluser=()=>async(dispatch)=>{
    try {
    
    
        dispatch({
            type:"AlluserRequest",
    
        })
    
        const {data}= await axios.get("/api/v1/users")
    
        dispatch({
            type:"AlluserSuccess",
            payload:data.userdata,
        })
    
        
    } catch (error) {
        dispatch({
            type:"AlluserFailure",
            payload:error.response.data.message,
        })
    }
    }