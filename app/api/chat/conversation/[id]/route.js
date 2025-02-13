import { connectToDB } from "@utils/db";
import Conversation from "@models/conversation";
import User from "@models/user";

export const GET = async (req, {params}) => {
    const  userId  = params.id.trim();
    console.log(userId);
    try {
        await connectToDB();
        const conversations = await Conversation.find({ members: { $in: [userId] } });
        
        const conversationUserData =await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await User.findById(receiverId);
            return { user: { receiverId: user._id, email: user.email, username: user.username, image: user.image }, conversationId: conversation._id }
        }))

        return new Response(JSON.stringify(await conversationUserData), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch conversations:", error);
        return new Response("Failed to fetch conversations" + " " + error, { status: 500 });
    }
};
