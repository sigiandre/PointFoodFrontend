<template>
  <div>
    <Loader v-if="isLoading" />
    <template v-else>
      <h1 class="title">Cliente: {{ model.client.name}}</h1>
      <h2 class="subtitle">Order de compra</h2>

      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in model.products" :key="product.id">
            <td>{{product.productName}}</td>
            <td>{{product.quantity}}</td>
            <td>US$ {{product.productPrice}}</td>
            <td>US$ {{product.subTotal}}</td>
          </tr>
        </tbody>
        <tfoot class="has-text-weight-bold">
          <tr>
            <td colspan="3">Total</td>
            <td colspan="3">US$ {{model.total}}</td>
          </tr>
        </tfoot>
      </table>
    </template>
  </div>
</template>

<script src="./OrderDetailOwner.js"></script>