import _ from 'lodash';

import logger from '@/shared/logger.service';
import { shortenedUrlModel } from './shortened-url.model';
import { ShortenedUrl } from '@/app/shortened-url/shortened-url';
import { properties } from '@/properties';
import { IPagination, Pagination } from '@/shared/pagination/pagination';

export class ShortenedUrlService {
    private readonly BASE_DOMAIN = 'pbid.io';

    /**
     * Get all records on database
     */
    @Pagination
    public async findAll(
        pagination: IPagination
    ): Promise<{ count: number; data: Array<ShortenedUrl> }> {
        logger.debug('pagination', pagination);

        const data: ShortenedUrl[] = await shortenedUrlModel
            .find()
            .skip(pagination.start)
            .limit(pagination.step)
            .sort(pagination.sort)
            .lean(true);

        const count = await shortenedUrlModel.countDocuments();

        logger.debug('count shortened urls', count);

        return { count, data };
    }

    /**
     * Create new data on the database
     */
    public create(originalUrl: string): Promise<ShortenedUrl> {
        const shortUrl = this.generateShortUrl();
        const record = { originalUrl, shortUrl };

        logger.debug('Creating comments: ', record);

        return shortenedUrlModel.create(record);
    }

    private generateShortUrl(): string {
        const codeLength = properties.general.masLengthUrl;
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const random = () => Math.ceil(Math.random() * alphabet.length);
        const initialKeys = new Date().getTime().toString(10);
        const codes = Array.from({ length: initialKeys.length }).map(() =>
            alphabet.charAt(random())
        );

        const list = [...initialKeys, ...codes];
        const hash = _.shuffle(list).slice(0, codeLength);

        return `https://${this.BASE_DOMAIN}/${hash.join('')}`;
    }
}
