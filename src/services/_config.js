import Axios from 'axios';
import IdentityProxy from './IdentityProxy';
import UserProxy from './UserProxy';
import ClientProxy from '@/services/ClientProxy'
import RestaurantOwnerProxy from '@/services/RestaurantOwnerProxy'
import RestaurantProxy from '@/services/RestaurantProxy'
import CategoryProxy from '@/services/CategoryProxy'
import ProductProxy from '@/services/ProductProxy'
import ProductTypeProxy from '@/services/ProductTypeProxy'
import OrderProxy from '@/services/OrderProxy'

Axios.defaults.headers.common.Accept = 'application/json';

Axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

//TODO: Test
Axios.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;

        if (status === 401) {
            localStorage.removeItem('access_token');
            window.location.reload(true);
        }

        return Promise.reject(error);
    }
);

let url = 'https://pointfood20201125235317.azurewebsites.net/swagger/v1/index.html';

export default {
    identityProxy: new IdentityProxy(Axios,url),
    userProxy: new UserProxy(Axios, url),
    clientProxy: new ClientProxy(Axios, url),
    restaurantOwnerProxy: new RestaurantOwnerProxy(Axios, url),
    restaurantProxy: new RestaurantProxy(Axios, url),
    categoryProxy: new CategoryProxy(Axios, url),
    productProxy: new ProductProxy(Axios, url),
    productTypeProxy: new ProductTypeProxy(Axios, url),
    orderProxy: new OrderProxy(Axios, url)
}

