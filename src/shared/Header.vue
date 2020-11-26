<template>
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="../assets/logo.png" alt="POINTFOOD" />
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end">
            <router-link
              :class="{'is-active': $route.name === 'default'}"
              class="navbar-item"
              to="/"
            >Inicio</router-link>


            <router-link
              :class="{'is-active': $route.path.startsWith('/restaurants/create')}"
              v-if="user.roles.includes('RESTAURANTOWNER')"
              class="navbar-item"
              to="/restaurants/create"
            >Tu Restaurante</router-link>
            <router-link
              :class="{'is-active': $route.path.startsWith('/products')}"
              v-if="user.roles.includes('RESTAURANTOWNER')"
              class="navbar-item"
              to="/products"
            >Tus Productos</router-link>
            <router-link
              :class="{'is-active': $route.path.startsWith('/restaurantowners/orders')}"
              v-if="user.roles.includes('RESTAURANTOWNER')"
              class="navbar-item"
              to="/restaurantowners/orders"
            >Historial de Ordenes</router-link>
            <router-link
              :class="{'is-active': $route.path.startsWith('/users')}"
              v-if="user.roles.includes('RESTAURANTOWNER')"
              class="navbar-item"
              to="/users"
            >Usuarios</router-link>


            <router-link
              :class="{'is-active': $route.path.startsWith('/clients/orders/create')}"
              v-if="user.roles.includes('CLIENT')"
              class="navbar-item"
              to="/clients/orders/create"
            >Realiza tu Orden</router-link>
            <router-link
              :class="{'is-active': $route.path.startsWith('/clients/orders')}"
              v-if="user.roles.includes('CLIENT')"
              class="navbar-item"
              to="/clients/orders"
            >Historial de Ordenes</router-link>


            <span class="navbar-item">
              <a @click="logout" class="button is-danger is-inverted">
                <span class="icon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Cerrar Sesión</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: this.$store.state.user
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$parent.isLoggedIn = false;
    }
  }
};
</script>