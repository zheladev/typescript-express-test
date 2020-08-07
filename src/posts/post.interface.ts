import { Mongoose } from "mongoose";
import * as mongoose from 'mongoose';

interface Post extends mongoose.Document {
    author: string;
    content: string;
    title: string;
    authorId: mongoose.Types.ObjectId,
}

export default Post;