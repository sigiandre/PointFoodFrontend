export default class ClientProxy{

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    register(params) {
        return this.axios.post(this.url + 'clients/register', params);
    }

    get(id) {
        return this.axios.get(this.url + `clients/${id}`);
    }
}