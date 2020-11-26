import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '../components/Default.vue';
import UserIndex from '../components/users/UserIndex.vue';
import store from '../store/index'
import RestaurantIndex from '@/components/restaurantowners/restaurants/RestaurantIndex.vue'
import RestaurantCreateOrUpdate from '@/components/restaurantowners/restaurants/RestaurantCreateOrUpdate.vue'
import ProductIndex from '@/components/restaurantowners/products/ProductIndex.vue'
import ProductCreateOrUpdate from '@/components/restaurantowners/products/ProductCreateOrUpdate.vue'
import OrderIndexOwner from '@/components/restaurantowners/orders/OrderIndexOwner.vue';
import OrderDetailOwner from '@/components/restaurantowners/orders/OrderDetailOwner.vue';
//CLIENTS
import OrderCreate from '@/components/clients/orders/OrderCreate.vue'
import OrderIndexClient from '@/components/clients/orders/OrderIndexClient.vue'
import OrderDetailClient from '@/components/clients/orders/OrderDetailClient.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'default',
      component: Default
    },
    
    //RESTAURANT OWNER
    {
      path: '/restaurants/create',
      name: 'restaurantscreate',
      component: RestaurantCreateOrUpdate
    },
    {
      path: '/restaurants/restaurantowners',
      name: 'restaurantsrestaurantowners',
      component: RestaurantIndex
    },
    {
      path: '/products',
      name: 'products',
      component: ProductIndex
    },
    {
      path: '/products/create',
      name: 'productscreate',
      component: ProductCreateOrUpdate
    },
    {
      path: '/products/:id/edit',
      name: 'productsedit',
      component: ProductCreateOrUpdate
    },
    {
      path: '/restaurantowners/orders',
      name: 'restaurantsownersorders',
      component: OrderIndexOwner
    },
    {
      path: '/restaurantowners/orders/:id/details',
      name: 'ownersordersdetails',
      component: OrderDetailOwner
    },
    

    //CLIENT
    {
      path: '/clients/orders/create',
      name: 'clientsorderscreate',
      component: OrderCreate
    },
    {
      path: '/clients/orders',
      name: 'clientsorders',
      component: OrderIndexClient
    },
    {
      path: '/clients/orders/:id/details',
      name: 'clientsordersdetails',
      component: OrderDetailClient
    },
    {
      path: '/users',
      name: 'users',
      component: UserIndex,
      beforeEnter: authorization
    }
  ]
  function authorization(to, from, next) {
    let user = store.state.user;
    
    if (user) {
      if (to.name === 'default' && user.roles.includes('RESTAURANTOWNER')) {
          return next('/restaurants/create');
      }
    }
    
    return next();
  }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
