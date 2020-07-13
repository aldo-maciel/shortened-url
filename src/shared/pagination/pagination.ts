import logger from '@/shared/logger.service';

export interface IPagination {
    start: number,
    step: number,
    sort: object
}

const defaultValues = { step: 20, start: 0, sort: { createdAt: -1 } } as IPagination;

export const Pagination = function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (pagination: IPagination, ...args: any[]) {
        if (!pagination) {
            logger.error('Pagination parameter needs to be the first and cannot be null');
            throw new Error('Invalid parameter');
        }
        const paginateParam = Object.keys(pagination);

        let result = { ...defaultValues };
        if (paginateParam.length) {
            const { start, step, sort } = pagination;
            if (start) {
                result.start = parseInt(start.toString(), 10);
            }
            if (step) {
                result.step = parseInt(step.toString(), 10);
            }
            if (sort) {
                result.sort = JSON.parse(sort.toString());
            }
        }
        return originalMethod.apply(this, [ result, ...args ]);
    };
};

