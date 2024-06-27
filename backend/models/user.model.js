import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    status: {
      type: String,
      enum: ['admin', 'vip', 'regular'],
      default: 'regular',
    },
    ban: {
      type: {
        isBanned: { type: Boolean, default: false },
        expiryDate: { type: Date, default: null },
      },
      default: {},
    },

    userAvatar: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    profileText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
