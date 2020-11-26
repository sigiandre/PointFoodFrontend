export default class ProductTypeProxy { 

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    getAll(page, take){
        return this.axios.get(this.url + `producttypes?page=${page}&take=${take}`);
    }

}