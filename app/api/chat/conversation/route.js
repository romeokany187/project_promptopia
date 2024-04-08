import { connectToDB } from '@utils/db';
import Conversation from '@models/conversation';

export const POST = async (req , res) =>{
    const {senderId , receiverId} = await req.json();
    try {
        const newConversation = new Conversation({members : [senderId , receiverId]});
        await newConversation.save();
        return new Response(JSON.stringify(newConversation),{status : 201})
    } catch (error) {
        return new Response("Failled to create a conversation " +" " + error , {status: 500})
    }
}

