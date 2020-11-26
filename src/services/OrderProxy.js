export default class OrderProxy{

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    create(params) {
        return this.axios.post(this.url + 'orders/create', params);
    }

    get(id) {
        return this.axios.get(this.url + `orders/${id}`);
    }

    getAllByClient(id, page, take) {
        return this.axios.get(this.url + `orders/clients/${id}?page=${page}&take=${take}`);
    }

    getAllByRestaurantOwner(id, page, take) {
        return this.axios.get(this.url + `orders/restaurantowners/${id}?page=${page}&take=${take}`);
    }

    attendOrder(id) {
        return this.axios.put(this.url + `orders/update/attend/${id}`);
    }

    readyOrder(id) {
        return this.axios.put(this.url + `orders/update/ready/${id}`);
    }

    cancelOrder(id) {
        return this.axios.put(this.url + `orders/update/cancel/${id}`);
    }
}