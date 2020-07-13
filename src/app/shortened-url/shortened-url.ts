import { Document } from 'mongoose';

export interface ShortenedUrl extends Document {
    readonly createAt: Date,
    readonly updateAt: Date,
    originalUrl: string,
    shortUrl: string
}
