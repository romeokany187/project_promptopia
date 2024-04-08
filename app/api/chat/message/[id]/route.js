import { connectToDB } from '@utils/db';
import Message from '@models/messages';

export const GET = async (req, { params }) => {
    const { conversationId } = params;
    try {
        await connectToDB();
        // Récupérer les messages de la conversation
        const messages = await Message.find(conversationId );
        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch messages" + " " + error, { status: 500 });
    }
}