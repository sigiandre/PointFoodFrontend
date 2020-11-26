<template>
  <div>
    <h1 class="title">Registra la información de tu restaurante</h1>
    <Loader v-if="isLoading" />
    <form v-else @submit.prevent="create">
      <section>
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="field">
              <input
                v-model="restaurant.name"
                required
                autocomplete="false"
                class="input"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div class="field">
              <input
                v-model="restaurant.address"
                required
                autocomplete="false"
                class="input"
                type="text"
                placeholder="Ingrese la dirección"
              />
            </div>
            <div class="field">
              <input
                v-model="restaurant.phonenumber"
                required
                autocomplete="false"
                class="input"
                type="text"
                placeholder="Ingrese el teléfono"
              />
            </div>
            <div class="column" style="height: 10px;"></div>
            <div class="field">
              <button type="submit" class="button is-dark">Registrar</button>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <b-select multiple native-size="8" v-model="restaurant.restaurantcategories">
                <option v-for="item of collection.items" :key="item.id" :value="item">{{item.name}}</option>
              </b-select>
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script src="./RestaurantCreateOrUpdate.js"></script>