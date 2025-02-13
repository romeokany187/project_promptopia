import { connectToDB } from '@utils/db';
import Message from '@models/messages';
import User from '@models/user';
import Conversation from '@models/conversation';

export const GET = async (req, { params }) => {
    // const { conversationId } = params.id;
    try {
        await connectToDB();
        
        const chekMessages = async (conversationId) =>{
            const messages = await Message.find({conversationId});
            const messageUserData = Promise.all(messages.map(async (message) => {
                const user = await User.findById(message.senderId);
                return { user: { id: user._id, email: user.email, username: user.username, image: user.image }, message: message.message }
            }));
            return new Response(JSON.stringify(await messageUserData) , {status :200})
        }
        const conversationId = params.id
        console.log(conversationId);
        if(conversationId === 'new'){
            const chekConversation = await Conversation.find({ members: { $all: [req.json().senderId, req.json().receiverId] } })
            if(chekConversation.length > 0 ){
                chekMessages(chekConversation[0]._id);
            }else {
                return new Response(JSON.stringify([]), {status : 200})
            }
        }else{
           return chekMessages(conversationId)
        }
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch messages" + " " + error, { status: 500 });
    }
}