<template>
  <div>
    <h1 class="title">{{model.productId ? 'Actualiza el producto' : 'Registra un nuevo producto'}}</h1>

    <Loader v-if="isLoading" />
    <form v-else @submit.prevent="create">
      <section>
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="field">
              <input
                :class="{error: validation.hasError('model.name')}"
                v-model="model.name"
                class="input is-dark-passive"
                type="text"
                placeholder="Ingrese el nombre"
              />
              <p class="help is-danger">{{validation.firstError('model.name')}}</p>
            </div>
            <div class="field">
              <input
                v-model.number="model.price"
                class="input is-dark-passive"
                type="text"
                placeholder="Ingrese el precio"
              />
            </div>
            <div class="field">
              <textarea
                :class="{error: validation.hasError('model.description')}"
                v-model="model.description"
                class="textarea is-dark-passive"
                rows="3"
                placeholder="Ingrese la descripción"
              ></textarea>
              <p class="help is-danger">{{validation.firstError('model.description')}}</p>
            </div>
          </div>
          <div class="column">
            <b-field class="field has-text-centered">
              <b-select
                placeholder="Selecciona un tipo de producto"
                expanded
                class="select is-dark-passive"
                v-model="model.productTypeId"
              >
                <option
                  v-for="item of collection.items"
                  :key="item.id"
                  :value="item.productTypeId"
                >{{item.name}}</option>
              </b-select>
            </b-field>
            <div class="column" style="height: 65px;"></div>
            <div class="field has-text-centered">
            <button type="submit" class="button is-dark">Guardar</button>
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script src="./ProductCreateOrUpdate.js"></script>