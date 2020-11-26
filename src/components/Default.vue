<template>
  <div>
    <h1 class="title">POINT FOOD APP</h1>
    <h2 class="subtitle">Tu APP de compras en restaurantes</h2>

    <p>¡Bienvenido, <b>{{user.name}}</b>!</p>
  </div>
</template>

<script>
export default {
  name: "Default",
  data() {
    return {
      user: this.$store.state.user
    }
  }
};
</script>