import mongoose from 'mongoose';
export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Todo')
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}