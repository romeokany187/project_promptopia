import mongoose, {Schema , model , models} from "mongoose";

const ConversationSchema = new Schema({
    members : {
        type : Array,
        required : true,
    },
    
});

const Conversation = models.Conversation || model('Conversation', ConversationSchema);
export default Conversation;