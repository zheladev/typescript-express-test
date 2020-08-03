import { Document } from "mongoose";

interface User extends Document {
    name: string,
    mail: string,
    password: string
}

export default User;