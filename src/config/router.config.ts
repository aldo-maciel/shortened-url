import { Application } from 'express';

import { ShortenedUrlRouter } from '@/app/shortened-url/shortened-url.router';

export class RoutesMiddleware {
    public shortenedUrlRouter = new ShortenedUrlRouter();

    public config(app: Application): void {
        const baseUrl = '/api/v1';

        app.use(baseUrl, this.shortenedUrlRouter.routes);
    }
}
