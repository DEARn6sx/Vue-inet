<template>
  <div>
    <h1>{{name}}</h1>

    <v-img 
      width="300" 
      height="250"
      :src="imgUrl"
    />

    <v-img v-if="show"
      width="300"
      height="250"
      :src="imgset"
    />
    <v-btn color="success" @click="show = !show">switch</v-btn>
    <h1>Loop zone</h1>
    <v-row>
        <v-col cols="3" v-for="(item,index) in items" :key="index">
            <v-card>
                <v-img    
                    width="300" 
                    height="250"
                    :src="item.img"
                />
                <v-card-title primary-title>
                    {{item.meassage}}
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
    

  </div>
</template>

<script>
export default {
    data() {
        return{
            name: "DEAR",
            imgUrl: 'https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg',
            imgset: require('../assets/profile.png'),
            show: false,
            items: [
                {
                    meassage: 'Dooo',
                    img: 'https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg'
                },
                {
                    meassage: 'Cooo',
                    img: 'https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg'
                },
                {
                    meassage: 'Zooo',
                    img: 'https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg'
                },
            ]
        }
    }
}
</script>

<style>

</style>