import { Request, Response } from 'express';

import logger from '@/shared/logger.service';
import { ShortenedUrlService } from './shortened-url.service';
import { handleError } from '@/shared/errors/error.service';
import { IPagination } from '@/shared/pagination/pagination';
import { MandatoryParamError } from '@/shared/errors/mandatory-param.error';

export class ShortenedUrlController {
    private readonly service: ShortenedUrlService = new ShortenedUrlService();

    public async findAll(req: Request, res: Response): Promise<void> {
        logger.debug('finding shorted urls');

        try {
            const params = (req.query as unknown) as IPagination;

            const { data, count } = await this.service.findAll(params);

            res.json({ data, count });
        } catch (error) {
            handleError(req, res, error);
        }
    }

    /**
     * Create new data on the database
     *
     * @param req
     * @param res
     */
    public async create(req: Request, res: Response) {
        try {
            const { originalUrl } = req.body;

            if (!originalUrl) {
                throw new MandatoryParamError('originalUrl param is mandatory');
            }

            const obj = await this.service.create(originalUrl);

            res.json(obj);
        } catch (error) {
            handleError(req, res, error);
        }
    }
}
