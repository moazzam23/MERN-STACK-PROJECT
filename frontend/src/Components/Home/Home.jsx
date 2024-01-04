import React from 'react'
import "./Home.css"
import User from '../User/User'
import Post from '../Post/Post'

const Home = () => {
  return (
    <div className='home'>
        <div className="homeleft">
            <Post
              postId={"Post._id"}
              postcaption={"Nature Beauty"} 
              postimage={"https://media.istockphoto.com/id/1480264364/photo/water-area-of-amusement-park-for-playing-with-water-during-the-summer-holidays.jpg?s=1024x1024&w=is&k=20&c=aiSrIoGxBv0o-GslcqmCzLkRdGNPVCUa-dlM1TRXEB4="}
              userId={"post.user._id"}
              userimage={"https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.webp?b=1&s=170667a&w=0&k=20&c=KtmKHyOE6MJV0w2DiGX8P4399KHNbZ3p8lCjTEabGcY="}
              userName={"Moazzam"}
              IsDelete={false}
              IsAccount={false}
            />
            </div>
            <div className="homeright">
                <User 
                userID={"user._id"}
                avator={"user.profilepic.url"}
                name={"user.name"}
                />
            </div>
    </div>
  )
}

export default Home