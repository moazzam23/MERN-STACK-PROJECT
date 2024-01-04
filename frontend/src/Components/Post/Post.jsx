import React, { useState } from 'react'
import "./Post.css"
import {
    MoreVert, ChatBubbleOutline, Favorite, FavoriteBorder,DeleteOutline
} from "@mui/icons-material"
import { Avatar, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { grey } from '@mui/material/colors'

const Post = ({
    postId, postcaption,postimage,likes=[],comments=[], userId,userimage,userName,IsDelete=false,IsAccount=false,
}) => {

    const [like,setLike]=useState(false);

    const hanldlike=()=>{
        setLike(!like)
    }

  return (
    <div className='post'>
        <div className="postHeader">
         { IsAccount?   <Button>
                <MoreVert/>
            </Button> : null}
        </div>

        <img src={postimage} alt="post" />
    
    <div className="postDetails">



<Avatar src={userimage} alt='user' sx={{ height:"3vmax",width:"3vmax"}}  />
<Link to={`/user/${userId}`}>
    <Typography fontWeight={700} >{userName}</Typography>
</Link>

<Typography fontWeight={100} color={grey} style={{alignSelf:"center"}} >{postcaption}</Typography>
    </div>
    <button style={{border:"none", backgroundColor:"white",cursor:"pointer",margin:"1vmax 2vmax"}}>
    <Typography>10 Likes</Typography>
    </button>

<div className="postFooter">

<Button onClick={hanldlike}> 
    {
    like ? <Favorite style={{color:"red"}}/> : <FavoriteBorder/>}
</Button>

<Button>
    <ChatBubbleOutline/>
</Button>

<Button>
   { IsDelete ? <DeleteOutline/> :null}
</Button>

</div>

    </div>
  )
}

export default Post