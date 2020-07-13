import { model, Schema } from 'mongoose'

import { ModelEnum } from '@/app/enums/model.enum'
import { ShortenedUrl } from '@/app/shortened-url/shortened-url'

const schema = new Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        collection: ModelEnum.SHORTENED_URL,
        timestamps: true,
        versionKey: false
    }
)

export const shortenedUrlModel = model<ShortenedUrl>(
    ModelEnum.SHORTENED_URL,
    schema
)
