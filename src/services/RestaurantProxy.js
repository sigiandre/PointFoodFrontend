export default class RestaurantProxy{

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    create(params) {
        return this.axios.post(this.url + `restaurants/create`, params);
    }

    getByRestaurantOwner(id) {
        return this.axios.get(this.url + `restaurants/restaurantowners/${id}`);
    }

    getAll(page, take) {
        return this.axios.get(this.url + `restaurants?page=${page}&take=${take}`);
    }

    getAllByCategory(categoryId, page, take) {
        return this.axios.get(this.url + `restaurants/categories/${categoryId}?page=${page}&take=${take}`);
    }
}