import mongoose, {Schema , model , models} from "mongoose";

const MessageSchema = new Schema({
    conversationId : {
        type : String,
    },
    senderId : {
        type : String,
    },
    message : {
        type : String ,
    },
    date: {
        type: Date,
        default : Date.now() // Nouvelle propriété `date` de type `Date`
    },
    
});

const Message = models.Message || model('Message', MessageSchema);
export default Message;