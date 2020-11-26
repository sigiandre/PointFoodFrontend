<template>
  <div id="app" class="container">
    <form @submit.prevent="create">
      <section>
        <b-steps
          v-model="activeStep"
          :animated="isAnimated"
          :rounded="isRounded"
          :has-navigation="hasNavigation"
          :icon-prev="prevIcon"
          :icon-next="nextIcon"
          :label-position="labelPosition"
          :mobile-mode="mobileMode"
        >
          <b-step-item step="1" label="Restaurante" :clickable="isStepsClickable">
            <h1 class="title has-text-centered">Selecciona el restaurante</h1>

            <b-field class="field has-text-right">
              <b-select
                placeholder="Buscar por categoría"
                expanded
                class="select is-dark-passive"
                v-model="categorySelected"
              >
                <option
                  v-for="item of collectionCategory.items"
                  :key="item.id"
                  :value="item.categoryId"
                >{{item.name}}</option>
              </b-select>
              <b-field class="field has-text-right">
                <b-button @click.prevent="getAll(1)">Buscar</b-button>
              </b-field>
            </b-field>

            <section>
              <table class="table is-striped is-fullwidth">
                <thead>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th style="width:170px;">Operaciones</th>
                </thead>
                <tbody>
                  <tr v-for="item in collectionRestaurant.items" :key="item.id">
                    <td>{{item.name}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>
                      <b-button size="is-small" @click.prevent="selectRestaurant(item.restaurantId)">Seleccionar</b-button>
                      <a style="color:#FFFFFF">-</a>
                      <b-button
                        icon-right="check"
                        disabled
                        class="b-button is-black"
                        size="is-small"
                        type="is-text"
                        v-if="model.restaurantId === item.restaurantId"
                      ></b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pager
                :paging="p => getAll(p)"
                :page="collectionRestaurant.page"
                :pages="collectionRestaurant.pages"
              />
            </section>
          </b-step-item>

          <b-step-item
            step="2"
            label="Productos"
            :clickable="isStepsClickable"
            :type="{'is-success': isProfileSuccess}"
          >
            <h1 class="title has-text-centered">Selecciona los productos</h1>

            <div class="box">
              <table class="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th colspan="2" style="width:200px;">Producto</th>
                    <th class="has-text-right" style="width:150px;">Cantidad</th>
                    <th class="has-text-right" style="width:150px;">Precio Unitario</th>
                    <th class="has-text-right" style="width:150px;">IVA</th>
                    <th class="has-text-right" style="width:150px;">Sub Total</th>
                    <th class="has-text-right" style="width:150px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="2">
                      <div class="select is-fullwidth">
                        <b-select
                          placeholder="Productos"
                          @input="onChangeProductSelection"
                          @change="onChangeProductSelection"
                          v-model.number="product.productId"
                          expanded
                        >
                          <optgroup label="Platos">
                            <option
                              v-for="product in dishes"
                              :key="product.id"
                              :value="product.productId"
                            >{{product.name}}</option>
                          </optgroup>
                          <optgroup label="Extras">
                            <option
                              v-for="product in extras"
                              :key="product.id"
                              :value="product.productId"
                            >{{product.name}}</option>
                          </optgroup>
                        </b-select>
                      </div>
                    </td>
                    <td>
                      <input class="input" type="number" v-model.number="product.quantity" />
                    </td>
                    <td>
                      <input class="input" type="number" disabled v-model.number="product.price" />
                    </td>
                    <td class="has-text-right" colspan="3">
                      <button @click.prevent="addProduct" class="button">Agregar</button>
                    </td>
                  </tr>

                  <tr v-if="model.products.length === 0">
                    <td
                      class="has-text-centered is-size-5"
                      colspan="7"
                    >No ha seleccionado ningún producto</td>
                  </tr>
                  <tr v-else v-for="product in productsSelected" :key="product.productId">
                    <td class="has-text-centered" style="width:100px;">
                      <a
                        class="has-text-danger"
                        @click.prevent="removeProduct(product.productId)"
                      >Retirar</a>
                    </td>
                    <td>{{product.name}}</td>
                    <td class="has-text-right">{{product.quantity}}</td>
                    <td class="has-text-right">US$ {{product.price}}</td>
                    <td class="has-text-right">US$ {{product.iva}}</td>
                    <td class="has-text-right">US$ {{product.subTotal}}</td>
                    <td class="has-text-right">US$ {{product.total}}</td>
                  </tr>
                </tbody>
                <tfoot class="has-text-weight-bold">
                  <tr>
                    <td colspan="6" class="has-text-right">IVA</td>
                    <td class="has-text-right">US$ {{iva.toFixed(2)}}</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="has-text-right">Sub Total</td>
                    <td class="has-text-right">US$ {{subTotal.toFixed(2)}}</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="has-text-right">Total</td>
                    <td class="has-text-right">US$ {{total.toFixed(2)}}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </b-step-item>

          <b-step-item
            step="3"
            :visible="showExtra"
            label="Modo de entrega"
            :clickable="isStepsClickable"
          >
            <h1 class="title has-text-centered">Selecciona la modalidad de entrega</h1>

            <div class="columns">
              <div class="column is-half">
                <b-radio v-model="model.delivery" native-value="delivery">Delivery</b-radio>

                <div class="field">
                  <input
                    v-if="model.delivery"
                    v-model="model.address"
                    autocomplete="false"
                    class="input"
                    type="text"
                    placeholder="Ingrese su dirección"
                    :disabled="model.delivery==='restaurant'"
                  />
                </div>
              </div>
              <div class="column">
                <b-radio v-model="model.delivery" native-value="restaurant">Recoger en restaurante</b-radio>
              </div>
            </div>
            <button
              @click.prevent="create"
              :disabled="model.products.length === 0"
              class="button is-primary is-medium is-fullwidth"
            >Crear orden</button>
          </b-step-item>

          <template v-if="customNavigation" slot="navigation" slot-scope="{previous, next}">
            <b-button
              outlined
              type="is-danger"
              icon-left="backward"
              :disabled="previous.disabled"
              @click.prevent="previous.action"
            >Previous</b-button>
            <b-button
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
              :disabled="next.disabled"
              @click.prevent="next.action"
            >Next</b-button>
          </template>
        </b-steps>
      </section>
    </form>
  </div>
</template>

<script src="./OrderCreate.js"></script>
