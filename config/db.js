import mongoose from "mongoose"

export const connectDb = async () => {
  try {
    await await mongoose.connect(process.env.MONGO_URL)

    console.log("db connect")
  } catch (error) {
    console.log("db error" + error)
  }
}
