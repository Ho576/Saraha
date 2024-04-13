import userModel from './../../../db/models/User.model.js';
import MessageModel from './../../../db/models/Message.model.js';

export const getMessages = async(req,res)=>{
      const messagesList = await MessageModel.find({receverId:req.id }).select('content createdAt') ;
      return res.status(201).json({ message: "Success", messagesList });

};
export const sendMessage = async (req, res) => {
    const { receverId } = req.params;
    const { content } = req.body; 

    const user = await userModel.findById(receverId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const createMessage = await MessageModel.create({ content, receverId }); // corrected 'receverId' to 'receiverId'
    return res.status(201).json({ message: "Success", createMessage });
};
