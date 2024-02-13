<template>
  <div>
    <h2>Orders</h2>
    <v-row>
      <v-col v-for="(order, index) in orders" :key="index" cols="12">
        <v-card>
          <v-card-title>{{ order.buyerName }}</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in order.items" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{ item.productName }}</v-list-item-title>
                  <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Price: {{ item.price }} บาท</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-card-subtitle>Total Price: {{ order.totalPrice }} บาท</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        const response = await this.axios.get('http://localhost:3000/orders/');
        this.orders = response.data.data;
      } catch (error) {
        console.error('Error getting orders:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
