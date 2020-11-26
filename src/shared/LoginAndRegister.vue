<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="has-text-centered">
        <img src="https://images.unsplash.com/photo-1605178975130-542c269e9e10?ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80" />
        <hr />
      </div>
      <div class="box">
        <div class="tabs is-boxed">
          <ul>
            <li :class="{'is-active': tab === 'login'}">
              <a @click="tab = 'login'">Iniciar sesión</a>
            </li>
            <li :class="{'is-active': tab === 'register'}">
              <a @click="tab = 'register'">Crear cuenta</a>
            </li>
          </ul>
        </div>

        <form @submit.prevent="authenticate" v-if="tab === 'login'">
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.email"
              required
              class="input"
              type="email"
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.password"
              required
              class="input"
              type="password"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div class="field">
            <button :disabled="login.loading" type="submit" class="button is-info">Ingresar</button>
          </div>
        </form>

        <form @submit.prevent="addNewUser" v-if="tab === 'register'">
          <div class="field">
            <b-radio v-model="role"
                type="is-info"
                native-value="client">
                Cliente
            </b-radio>
            <b-radio v-model="role"
                type="is-info"
                native-value="restaurantowner">
                Dueño de Restaurante
            </b-radio>
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.email"
              required
              autocomplete="false"
              class="input"
              type="email"
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.name"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="Ingrese su nombre"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.phonenumber"
              v-if="role==='client'"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="Ingrese su número de teléfono"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.password"
              required
              autocomplete="false"
              class="input"
              type="password"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div class="field">
            <button :disabled="register.loading" type="submit" class="button is-info">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginAndRegister",
  data() {
    return {
      tab: "login",
      role: "client",
      proxies: null,
      login: {
        email: null,
        password: null,
        loading: false
      },
      register: {
        email: null,
        password: null,
        phonenumber: null,
        name: null,
        loading: false
      }
    };
  },
  methods: {
    authenticate() {
      this.login.loading = true;
      this.$proxies.identityProxy
        .login(this.login)
        .then(x => {
          this.login.loading = false;
          this.$parent.isLoggedIn = true;

          this.$notify({
            group: "global",
            type: "is-success",
            text: "Su acceso ha sido validado correctamente."
          });

          localStorage.setItem("access_token", x.data);
          this.$user.initialize();
        })
        .catch(x => {
          if (x.response.status === 400) {
            this.$notify({
              group: "global",
              type: "is-warning",
              text: x.response.data
            });
          }

          this.login.loading = false;
        });
    },
    addNewUser() {
      this.register.loading = true;
      if(this.role == 'client'){
        this.proxies = this.$proxies.clientProxy;
      }
      if(this.role == 'restaurantowner'){
        this.proxies = this.$proxies.restaurantOwnerProxy;
      }
      this.proxies
        .register(this.register)
        .then(() => {
          this.register.email = null;
          this.register.password = null;
          this.register.phonenumber = null;
          this.register.name = null;

          this.$notify({
            group: "global",
            type: "is-success",
            text: "Su cuenta ha sido creada con éxito"
          });
          this.register.loading = false;
        })
        .catch(x => {
          if (x.response.status === 400) {
            this.$notify({
              group: "global",
              type: "is-warning",
              text: x.response.data
            });
          }
          this.register.loading = false;
        });
    }
  }
};
</script>