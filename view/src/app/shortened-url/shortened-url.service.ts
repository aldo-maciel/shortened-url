import { ShortenedUrl } from '@/app/shortened-url/shortened-url';
import { ServiceFacade } from '@/shared/service/facade.service';
import { Pagination } from '@/shared/components/paginate/paginate.type';

interface ResultType {
    data: ShortenedUrl[];
    count: number;
}

export class ShortenedUrlService extends ServiceFacade {
    private get URL(): string {
        return 'shortened-url';
    }

    create(originalUrl: string): Promise<ShortenedUrl> {
        return this.doPost<ShortenedUrl>(this.URL, { originalUrl });
    }

    findAll(pagination: Pagination): Promise<ResultType> {
        return this.doGet<ResultType>(this.URL, pagination);
    }
}
