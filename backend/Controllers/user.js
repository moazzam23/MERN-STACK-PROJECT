const usermodel = require("../Models/user");
const Post= require("../Models/Post")
const {sendemail}= require("../Middleware/SentEmail")
const crypto= require("crypto")
const cloudinary = require("cloudinary")


exports.register= async (req,res)=>{
    try {
        const {name,email,password, profilepic} = req.body;

        let user = await usermodel.findOne({email});
        if(user){
            return res.status(404).json({
                success:false,
                message:"User Already Exists"
            });
        }

        const cloud = await cloudinary.v2.uploader.upload(profilepic,{folder: "userpic",})

        user = await usermodel.create({name,email,password, profilepic:{
            public_id: cloud.public_id,
            url:cloud.url,
        }})


        const token = await user.generateToken();
 
      const options ={expires:new Date(Date.now()+90*24*60*60*1000),
    httpOnly:true,
    }

        res.status(201).cookie("token",token,options).json({
            success:true,
            user,
            token,
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message,
        })

    }
};

exports.login = async (req, res)=>{
    try {
        const {email,password}= req.body;

        const user = await usermodel.findOne({email}).select("+password").populate("posts followers following");
        if(!user){
            return  res.status(420).json({
                success:false,
                message:"User Not Found"
            });
        }
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).
            json({
                success:false,
                message:"Incorrect Password",
            })
        }

        const token = await user.generateToken();
 
      const options ={expires:new Date(Date.now()+90*24*60*60*1000),
    httpOnly:true,
    }

        res.status(200).cookie("token",token,options).json({
            success:true,
            user,
            token,
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

exports.logout = async (req,res)=>{
    try {
        
        res.status(200).cookie("token",null,{expires:new Date(Date.now()), httpOnly:true})
        .json({
       success:true,
       message:"logged Out"
        })


    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.followuser= async (req,res)=>{
    try {
   
        const usertofollow = await usermodel.findById(req.params.id);
        const logginuser = await usermodel.findById(req.user._id)

        if(!usertofollow){
return res.status(500).json({
    success:false,
    message:"User Not Found"
})
        }
        
        if(logginuser.following.includes(usertofollow._id)){
            const indexfollowing = logginuser.following.indexOf(usertofollow._id);
            logginuser.following.splice(indexfollowing,1);
            
            
            const indexfollower = usertofollow.followers.indexOf(logginuser._id);
            usertofollow.followers.splice(indexfollower,1);
            await logginuser.save();
            await usertofollow.save();
            res.status(200).json({
                success:true,
                message:"User unFollowed"
               })
        }

        else{

            logginuser.following.push(usertofollow._id);
            usertofollow.followers.push(logginuser._id);
           
           
            await logginuser.save();
           await usertofollow.save();
           res.status(200).json({
            success:true,
            message:"User Followed"
           })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updatepassword = async (req,res)=>{
    try {

        const userp = await usermodel.findById(req.user._id).select("+password")
      
        
        const {oldpassword, newpassword}=req.body;

        if(!oldpassword || !newpassword){
            res.status(400).json({
                success:false,
                message:"Please Enter Old and New Password",
            });
        }
   
        const isMatch= await userp.matchPassword(oldpassword);

        if(!isMatch){
            return   res.status(401).json({
                success:false,
                 message:"Incorrect Old Password"  
            });
        }
userp.password=newpassword;
userp.save();
res.status(200).json({
    success:true,
    message:"Password Updated Successfully"
});
        
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })
    
    }
    }

exports.updateprofile = async (req,res)=>{
    try {
        
        const usernew = await usermodel.findById(req.user._id);

        const{name,email}=  req.body;

        if(name){
            usernew.name=name;
        }
        if(email){
            usernew.email=email;
        }
await usernew.save();
        res.status(200).json({
            success:true,
            message:"profile Updated Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}    

exports.deleteuser = async(req,res)=>{
    try {

        const userd = await usermodel.findById(req.user._id)
        const post= userd.posts;
        const followers = userd.followers;
        const followings= userd.following;
        const userid = userd._id;



        await userd.deleteOne();

        res.cookie("token",null,{expires:new Date(Date.now()), httpOnly:true})
       

        for (let index = 0; index < post.length; index++){
            const postd = await Post.findById(post[index]);
           await postd.deleteOne();   
        }
        for (let index = 0; index < followers.length; index++){
            const follower = await usermodel.findById(followers[index]);
            
            
            const index2 = follower.following.indexOf(userid);
            follower.following.splice(index2, 1)
            await follower.save();
           
        }
        for (let index = 0; index < followings.length; index++){
            const follows = await usermodel.findById(followings[index]);

            const index2 = follows.followers.indexOf(userid);
            follows.followers.splice(index2, 1)
            await follows.save();
           
        }
        
        res.status(200).json({
            success:true,
            message:"Profile Deleted",
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.myprofile = async (req,res)=>{
    try {
        
        const userdata= await usermodel.findById(req.user._id).populate("posts followers following");
        res.status(200).json({
            success:true,
            userdata,
        })

    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })


    }
}

exports.getuserprofile=async (req, res)=>{
    try {

        const userdata = await usermodel.findById(req.user._id).populate("posts followers following");
        

        if (!userdata) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success:true,
            userdata,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getalluser=async (req, res)=>{
    try {

        const userdata = await usermodel.find({})
        
        res.status(200).json({
            success:true,
            userdata,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.forgotpassword= async (req,res)=>{
    try {
        
        const user= await usermodel.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Email Doesn't Exists"
            })
        }

const ResetPassword= user.getResetPasswordToken();

await user.save();

const reseturl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${ResetPassword}`

const message = `You can reset your password by clicking on this link: \n\n ${reseturl}`;

try {
    
    await sendemail({
        email:user.email,
        subject: "Reset Password",
        message
    })
    res.status(200).json({
        success:true,
        message:`Email Send to ${user.email}`,
    })

} catch (error) {
    
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;
    await user.save();
    res.status(500).json({
        success:false,
        message:error.message,
    })
}

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}

exports.resetpassword = async (req,res)=>{
    try {

        const resetpasswordtoken = crypto.createHash("sha256").update(req.params.token).digest("hex"); 
        
        const user = await usermodel.findOne({
            resetpasswordtoken,
            resetpasswordexpire:{$gt: Date.now() }
        })

        if(!user){
res.status(401).json({
    success:false,
    message:"Token is invalid or has expired"
})
        }


        user.password=req.body.password;
        user.resetpasswordtoken=undefined;
        user.resetpasswordexpire=undefined;
        await user.save();
        res.status(200).json({
            success:true,
            message:"password updated successfully",
        }) 
          

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.myposts=async (req, res)=>{
    try {

        const user = await usermodel.findById(req.user._id);
        const posts=[];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("likes comments.user users");

            posts.push(post)

            
        }
        
        res.status(200).json({
            success:true,
            posts,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}