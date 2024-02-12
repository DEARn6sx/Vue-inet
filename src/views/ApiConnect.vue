<template>
  <div>
    <h1>{{ apidata }}</h1>
    <v-row>
      <v-col v-for="(item, index) in apidata" :key="index" cols="3">
        <v-card>
            <img :src="getImageUrl(item.img)" height="150" />
          <v-card-title>{{ item.product_name }}</v-card-title>
          <v-card-subtitle>{{ item.price }}</v-card-subtitle>
          <!-- <v-card-actions>
            <v-btn color="success" @click="alertParam(item.message)">Alert</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>

  </div>
  
</template>

<script>
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      apidata: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get('http://localhost:3000/products/').then((response) => {
        console.log('ข้อมูลทั้งหมด', response);
        this.apidata = response.data.data;
        console.log('ข้อมูลทั้งหมด', response.data);
      });
    },
    getImageUrl(img) {
      // Construct the URL for the image from the backend
      return `http://localhost:3000/images/products/${img}`;
    },
  },
};
</script>

<style>
</style>
