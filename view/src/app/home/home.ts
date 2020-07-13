import { Component, Vue } from 'vue-property-decorator';

import AlButton from '@/shared/components/button/button.vue';
import AlInput from '@/shared/components/forms/input/al-input.vue';
import { ShortenedUrlService } from '@/app/shortened-url/shortened-url.service';
import { onError, onSuccess } from '@/shared/utils/error';
import { ShortenedUrl } from '@/app/shortened-url/shortened-url';

@Component({
    components: {
        AlButton,
        AlInput
    }
})
export default class Home extends Vue {
    private readonly service: ShortenedUrlService = new ShortenedUrlService();
    private originalUrl = '';
    private readonly urlPattern = '^(https?|ftp|torrent|image|irc):\\/\\/(-\\.)?([^\\s\\/?\\.#]+\\.?)+(\\/[^\\s]*)?$';
    private record: ShortenedUrl = {} as ShortenedUrl;

    async generate(): Promise<void> {
        try {
            this.record = await this.service.create(this.originalUrl);

            onSuccess();
        } catch (error) {
            onError(error.message);
        }
    }

    copy(): void {
        navigator.clipboard.writeText(this.record.shortUrl);
    }
}
