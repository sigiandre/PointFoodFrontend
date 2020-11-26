export default class ProductProxy { 

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    create(params) {
        return this.axios.post(this.url + `products/create`, params);
    }

    update(id, params) {
        return this.axios.put(this.url + `products/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `products/${id}`);
    }

    get(id) {
        return this.axios.get(this.url + `products/${id}`);
    }

    getAll(id, page, take){
        return this.axios.get(this.url + `products/restaurants/restaurantowners/${id}?page=${page}&take=${take}`);
    }

}