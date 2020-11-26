<template>
  <div>
    <h1 class="title">Módulo de órdenes</h1>
    <h2 class="subtitle">Desde aquí puede gestionar tus órdenes.</h2>

    <Loader v-if="isLoading" />
    <template v-else>
      <table class="table is-striped is-fullwidth">
        <thead>
          <th>Id</th>
          <th>Restaurante</th>
          <th>Hora de registro</th>
          <th>Estado</th>
          <th style="width:200px;">Operaciones</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.id">
            <td>{{item.orderId}}</td>
            <td>{{item.restaurant.name}}</td>
            <td>{{item.registeredAt}}</td>
            <td>{{item.stateName}}</td>
            <td>
              <b-button icon-right="eye" @click.prevent="$router.push(`/clients/orders/${item.orderId}/details`)"></b-button>
              <a style="color:#FFFFFF">-</a>
              <b-button :disabled="item.stateName!='Pendiente'" icon-left="delete" @click.capture="cancelOrder(item.orderId)">Cancelar</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>

<script src="./OrderIndexClient.js"></script>