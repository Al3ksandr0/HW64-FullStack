// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGO_URI;
// const dbName = 'lesson64';

// const client = new MongoClient(uri);

// const connectDB = async () => {
//     await client.connectDB();
//     const myDB = client.db(dbName);
//     return myDB;
// }

// export default connectDB;


import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        process.exit(1);
    }
};

export default connectDB;