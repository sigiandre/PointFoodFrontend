export default class RestaurantOwnerProxy{

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    register(params) {
        return this.axios.post(this.url + 'restaurantowners/register', params);
    }
}