import mongoose from 'mongoose'
const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODBURI + '/bookStore')
        console.log(`Database Connected Successfully: `,connectionInstance.connection.host);
    } catch (error) {
        console.log('Database Connection Failed: ',error);
    }
}

export default connectDB;