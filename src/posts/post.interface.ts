import { Mongoose } from "mongoose";
import * as mongoose from 'mongoose';

interface Post extends mongoose.Document {
    content: string;
    title: string;
    authorId: string,
}

export default Post;