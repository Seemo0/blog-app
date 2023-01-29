import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("User", PostSchema);
export default PostModel;
