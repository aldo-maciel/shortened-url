import { Component, Vue } from 'vue-property-decorator';

import Paginate from '@/shared/components/paginate/paginate.vue';
import AlButton from '@/shared/components/button/button.vue';
import { ShortenedUrlService } from '@/app/shortened-url/shortened-url.service';
import { ShortenedUrl } from '@/app/shortened-url/shortened-url';
import { Pagination } from '@/shared/components/paginate/paginate.type';

@Component({
    components: {
        Paginate,
        AlButton
    }
})
export default class ShortenedUrlController extends Vue {
    private readonly service: ShortenedUrlService = new ShortenedUrlService();
    pagination: Pagination = { start: 0 } as Pagination;
    rows: ShortenedUrl[] = [];
    counter = 0;

    private async callServer(pagination: Pagination) {
        this.pagination = pagination;
        const { data, count } = await this.service.findAll(pagination);

        this.rows = data;
        this.counter = count;
    }
}
