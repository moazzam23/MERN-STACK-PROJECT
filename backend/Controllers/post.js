const post = require("../Models/Post")
const User = require("../Models/user")
exports.createpost = async (req,res)=>{

    try {
   const postdata={
    caption: req.body.caption,
    image:{
        publicid:"hello",
        url:"new"
    },
    users:req.user._id

   };
   const newpostdata = await post.create(postdata)
   const user = await User.findById(req.user._id) 
user.posts.push(newpostdata._id);

await user.save();

   res.status(201).json({
    success:true,
    post:newpostdata,
   })   
   
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

exports.likepostandunlike = async (req,res)=>{
    try {
        const newpost = await post.findById(req.params.id)
 
        if(!newpost){
            return res.status(404).json({
                success:false,
                message:"Not Found"
            })
        }

        if(newpost.likes.includes(req.user._id)){
            const index = newpost.likes.indexOf(req.user._id);
            newpost.likes.splice(index,1);

            await newpost.save();
        return res.status(200).json({
            success:true,
            message:"Post Unlike"
        })
        }
else{

    newpost.likes.push(req.user._id)
    await newpost.save();
        return res.status(200).json({
            success:true,
            message:"Post liked"
        })
}


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deletepost= async (req,res)=>{

    try {
        
        const findpost = await post.findById(req.params.id);
        if(!findpost){
            return res.status(404).json({
                success:false,
                message:"Post Not Found"
            })
        }

        if(findpost.users.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }
await findpost.remove();

const user = await User.findById(req.user._id);
const index = await user.posts.indexOf(req.user._id)
user.posts.splice(index, 1);

await user.save();
res.status(200).json({
    success:true,
    message:"Post deleted Successfully"
})


    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


exports.getpostoffollowers= async (req,res)=>{

    try {

        const usernew = await User.findById(req.user._id);
  
        const postnew = await post.find({
            users:{ $in: usernew.following}

        })

      res.status(200).json({
        success:true,
        postnew,
      })  
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updatepost= async (req,res)=>{
    try {

        const findpost = await post.findById(req.params.id);
        if(!findpost){
            return res.status(404).json({
                success:false,
                message:"Post Not Found"
            })
        }

        if(findpost.users.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }

        findpost.caption=req.body.caption,
        await findpost.save();
        res.status(200).json({
            success:true,
            message:"Post Caption Updated Successfully"
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.createcomment= async (req,res)=>{
    try {

        const postc = await post.findById(req.params.id);

        if(!postc){
            return res.status(404).json({
                success:false,
                message:"Post Not Found"
            });
        }

        let commentindex= -1;
        

        postc.comments.forEach((item,index)=>{
            if(item.user.toString() == req.user._id.toString()){
                commentindex=index;
            }
        })

        if (commentindex !== -1) {

            postc.comments[commentindex].comment=req.body.comment;

            await postc.save();
          return  res.status(200).json({
                success:true,
                message:"Comment Updated"
            })
            
        } else {
         postc.comments.push({
               user:req.user._id,
                comment:req.body.comment,
    
            })
        await postc.save();
        return  res.status(200).json({
                success:true,
                message:"Commented Successfully"
            })

        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deletecomment = async (req,res)=>{
    try {

        const posts = await post.findById(req.params.id);

        if(!posts){
            return res.status(404).json({
                success:false,
                message:"Post Not found",
            })
        }
        

        if (posts.users.toString()== req.user._id.toString()) {

 if(req.body.commentid == undefined){
    return res.status(400).json({
        success:false,
        message: "Comment Id is Required"
    })
 }

            posts.comments.forEach((item,index)=>{
                if (item._id.toString()== req.body.commentid.toString()) {
return posts.comments.splice(index,1)
                }
            })
await posts.save();
return res.status(200).json({
    success:true,
    message:"selected Comments has Deleted Successfully"
})
            
        } else {
             
            posts.comments.forEach((item,index)=>{
                if (item.user.toString()== req.user._id.toString()) {
return posts.comments.splice(index,1)
                }
            })
await posts.save();
return res.status(200).json({
    success:true,
    message:"Your Comment Deleted Successfully"
})

        }


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}