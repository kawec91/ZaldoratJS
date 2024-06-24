import mangoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mangoose.connect(process.env.MONGO_URI);
    console.log(`DB successfully connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error DB connection: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
