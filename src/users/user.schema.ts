import { Schema, Document } from 'mongoose';

export interface User extends Document {
    googleId: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
}

export const UserSchema = new Schema<User>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});
