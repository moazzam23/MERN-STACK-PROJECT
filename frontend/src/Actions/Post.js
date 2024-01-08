import axios from "axios"

export const getlikeanddislikepost= (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LikeRequest",
        })
    
        const {data}= await axios.get(`/api/v1/createpost/${id}`)
        dispatch({
            type:"LikeSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:'LikeFailure',
            payload:error.response.data.message,
        })
    }
}

export const Getcommnetpost= (id,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"CommentRequest",
        })
    
        const {data}= await axios.put(`/api/v1/posts/comment/${id}`)
        dispatch({
            type:"CommentSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({
            type:"CommetFailure",
            payload:error.response.data.message,
        })
    }
}