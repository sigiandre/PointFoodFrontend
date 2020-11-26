<template>
  <section id="app" class="hero is-light is-fullheight">
    <notifications group="global" position="top right" style="top:20px;right:20px;">
      <template slot="body" scope="props">
        <div :class="'notification ' + props.item.type">
          <button type="button" @click="props.close" class="delete"></button>
          <div v-html="props.item.text"></div>
        </div>
      </template>
    </notifications>
   
   <template>      
     <Header v-if="isLoggedIn" />
      <div class="hero-body">
        <div class="container">
          <router-view v-if="isLoggedIn" />
          <LoginAndRegister v-else />
        </div>
      </div>
      <Footer />
    </template>
    
  </section>
</template>


<script>
import Header from "./shared/Header.vue";
import Footer from "./shared/Footer.vue";
import LoginAndRegister from "./shared/LoginAndRegister.vue";
export default {
  name: "app",

  mounted() {
    this.__isLoggedIn();
  },

  components: {
    Header,
    Footer,
    LoginAndRegister
  },

  data() {
    return {
      isLoggedIn: false
    };
  },

  methods: {     
      __isLoggedIn() {
        if (localStorage.getItem("access_token") != null) {
          this.$user.initialize();
          this.isLoggedIn = true;
        }      
    }
  }
};
</script>