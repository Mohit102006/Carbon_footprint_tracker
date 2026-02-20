import { User } from "../models/user.model.js";

export const setProfileImage = async(req , res) => {
    const {ig} = req.body
    const userId = req.user.id
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {ProfileImg:ig},
            {new:true}
        )
        // console.log(user)
       return  res.json({proimg:user.ProfileImg , success:true})
    } catch (error) {
        res.json({message:"Error occurred"})
    }
}

export const getProfileImg = async(req , res) => {
    const userId = req.user.id
    try {
        const user = await User.findOne({_id:userId})
        return res.json({proimg:user.ProfileImg , success:true})
    } catch (error) {
        return res.json({message:"Error occurred"})
    }
}