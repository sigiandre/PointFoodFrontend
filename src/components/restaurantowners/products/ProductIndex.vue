<template>
  <div>
    <h1 class="title">Módulo de productos</h1>
    <h2 class="subtitle">Desde aquí puede gestionar tus productos.</h2>

    <Loader v-if="isLoading" />
    <template v-else>
      <div class="field has-text-right">
        <b-button class="button is-dark" @click="$router.push(`/products/create`)">Agregar nuevo producto</b-button>
      </div>
      <table class="table is-striped is-fullwidth">
        <thead>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Tipo</th>
          <th style="width:150px;">Operaciones</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.id">
            <td>{{item.name}}</td>
            <td>{{item.description}}</td>
            <td>S/. {{item.price.toFixed(2)}}</td>
            <td>{{item.productTypeName}}</td>
            <td>
              <b-button icon-right="pencil" @click="$router.push(`/products/${item.productId}/edit`)"></b-button>
              <a style="color:#FFFFFF">-</a>
              <b-button icon-right="delete" @click="remove(item.productId)"></b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>

<script src="./ProductIndex.js"></script>