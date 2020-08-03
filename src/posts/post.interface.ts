import { Mongoose } from "mongoose";
import * as mongoose from 'mongoose';

interface Post extends mongoose.Document {
    author: string;
    content: string;
    title: string;
}

export default Post;