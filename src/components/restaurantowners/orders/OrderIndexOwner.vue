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
          <th>Ver detalle</th>
          <th style="width:190px;">Operaciones</th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.id">
            <td>{{item.orderId}}</td>
            <td>{{item.restaurant.name}}</td>
            <td>{{item.registeredAt}}</td>
            <td>{{item.stateName}}</td>
            <td>
              <b-button
                icon-right="eye"
                @click.prevent="$router.push(`/restaurantowners/orders/${item.orderId}/details`)"
              ></b-button>
            </td>
            <td>
              <b-button
                v-if="item.stateName==='Pendiente'" size="is-small"
                @click.capture="attendOrder(item.orderId)"
              >Atender</b-button>
              <b-button
                v-if="item.stateName==='En proceso'" size="is-small"
                @click.capture="readyOrder(item.orderId)"
              >Pedido Listo</b-button>
              <a style="color:#FFFFFF">-</a>
              <b-button
                v-if="item.stateName!='Tu orden está lista' && item.stateName!='Cancelado'" size="is-small"
                @click.capture="cancelOrder(item.orderId)"
              >Cancelar</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pager :paging="p => getAll(p)" :page="collection.page" :pages="collection.pages" />
    </template>
  </div>
</template>
<script src="./OrderIndexOwner.js"></script>