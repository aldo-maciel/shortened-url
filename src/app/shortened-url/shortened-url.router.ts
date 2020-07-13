import { Router } from 'express';
import { ShortenedUrlController } from './shortened-url.controller';

export class ShortenedUrlRouter {
    private router: Router = Router();
    private path: string = '/shortened-url';
    private readonly ctrl: ShortenedUrlController = new ShortenedUrlController();

    constructor() {
        this.createRoutes();
    }

    get routes(): Router {
        return this.router;
    }

    private createRoutes(): void {
        this.router
            .get(this.path, this.ctrl.findAll.bind(this.ctrl))
            .post(this.path, this.ctrl.create.bind(this.ctrl));
    }
}
