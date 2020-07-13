import mongoose from 'mongoose';

import { properties } from '@/properties';
import logger from '@/shared/logger.service';

export class MongoConfig {
    private mongo = properties.mongo;
    private mongoUrl: string = `mongodb://${ this.mongo.host }:${ this.mongo.port }/${ this.mongo.base }`;

    constructor() {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
    }

    public async mongoSetup() {
        try {
            const connect = () => {
                mongoose
                    .connect(this.mongoUrl, {
                        useNewUrlParser: true,
                        useFindAndModify: false,
                        useUnifiedTopology: true
                    })
                    .then(() => {
                        logger.debug('Connected on MongoDB:', this.mongoUrl);
                    })
                    .catch((err) => {
                        logger.error('Error connecting to database:', err);
                        return process.exit(1);
                    });
            };

            connect();

            mongoose.connection.on('disconnected', connect);
        } catch (error) {
            logger.error(error);
        }
    }
}
