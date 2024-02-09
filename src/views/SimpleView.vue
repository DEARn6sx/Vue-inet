<template>
  <div>
    <h1>{{name}}</h1>

    <v-img 
      width="300" 
      height="250"
      :src="imgUrl"
    />

    <v-img 
      width="300" 
      height="250" 
      :src="imgset"
    />

  </div>
</template>

<script>
export default {
    data() {
        return{
            name: "DEAR",
            imgUrl: 'https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg',
            imgset: require('../assets/profile.png')
        }
    }
}
</script>

<style>

</style>