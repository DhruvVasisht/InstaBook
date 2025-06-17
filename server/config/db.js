import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        mongoose.connection.on("error", (error) => {
            console.log("MongoDB connection error", error);
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/bookmyshow`);
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}

export default connectDB;