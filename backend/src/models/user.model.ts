import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
}

const userSchema = new Schema<IUser>({
  googleId: String,
  displayName: String,
  email: String,
  image: String,
}, { timestamps: true });

const userDb = mongoose.model<IUser>('users', userSchema);

export default userDb;