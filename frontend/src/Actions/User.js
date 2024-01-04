
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
    payload:data.user
})

} catch (error) {
    dispatch({
        type:"Loaduserfailure",
        payload:error,
    })
    
}
}