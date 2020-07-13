export interface ShortenedUrl {
    readonly _id: string;
    readonly updatedAt: Date;
    readonly createdAt: Date;
    originalUrl: string;
    shortUrl: string;
}
