import mongoose from 'mongoose'
const { MongoClient, ServerApiVersion } = require('mongodb');

let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            dbName : "Share_prompt"
        })
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}