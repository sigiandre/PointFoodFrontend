export default class CategoryProxy {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    getAll(page, take) {
        return this.axios.get(this.url + `categories?page=${page}&take=${take}`);
    }
}
