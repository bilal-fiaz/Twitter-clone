import Notification from "../models/notification.model.js";
import User from "../models/User.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if(id === req.user._id.toString()){
        return res.status(400).json({message: "You can't follow/unfollow yourself"});
    }
    if(!userToModify || !currentUser) return res.status(400).json({error:"user not found"});

    const isFollowing = currentUser.following.includes(id);

    if(isFollowing){
        // Unfollow the user
        await User.findByIdAndUpdate(id, {$pull: { followers: req.user._id } });
        await User.findByIdAndUpdate(req.user._id, {$pull: { following: id } });

        // TODO return the id of the user as a response
        res.status(200).json({message: "User unfollowed sucessfully"})
    }else{
        // Follow the user
        await User.findByIdAndUpdate(id, {$push: { followers: req.user._id } });
        await User.findByIdAndUpdate(req.user._id, {$push: { following: id } });
        // Send notification to the user
        const newNotification = new Notification({
          type: "follow",
          from: req.user._id,
          to:userToModify._id
        });

        await newNotification.save();

        // TODO return the id of the user as a response
        res.status(200).json({message: "User followed sucessfully"})

    };


  } catch (error) {
    console.error("Error in followUnfollowUser:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
