import { connectToDB } from '@utils/db';
import Conversation from '@models/conversation';
import Message from '@models/messages';

export const POST = async (req , res) => {
    const { conversationId, senderId, message, receiverId = '' } =  await req.json();
    try {
        if(!senderId || !message) return new Response("please fill all required fields" ,{status: 400})
        if(conversationId === 'new' && receiverId){
            const newConversation = new Conversation({members : [senderId , receiverId]});
            await newConversation.save();
            const newMessage =  new Message({conversationId: newConversation._id, senderId , message});
            await newMessage.save();
            return new Response(JSON.stringify(newMessage), {status: 200})
        }
        const newMessage = new Message({ conversationId, senderId, message, receiverId });
        await newMessage.save();
        return new Response(JSON.stringify(newMessage), {status: 200})
    } catch (error) {
        console.log(error, 'Error');
        return new Response('conversationId or receiverId missed'+ " " +error, {status: 500})
    }
}