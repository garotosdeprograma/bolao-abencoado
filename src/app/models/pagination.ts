export class Pagination {
    count: number;
    offset: number;
    limit: number;

    constructor() {
        this.limit = 10;
        this.count = 0;
        this.offset = 0;
    }
}
