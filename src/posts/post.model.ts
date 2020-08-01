import * as mongoose from 'mongoose';
import Post from './post.interface';

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    title: String,
});

/** https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html#intersection-types
 * <Post & mongoose.Document> represents an entity that is both of type Post and type mongoose.Document
 * mongoose.model accepts objects which extend from mongoose.Document. By passing Post intersected with
 * mongoose.Document, we make typescript aware of the parameters we defined in Post's interface. 
 */
const postModel = mongoose.model<Post>('Post', postSchema);

export default postModel;