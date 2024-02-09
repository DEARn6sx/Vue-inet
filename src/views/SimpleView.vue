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
    <v-btn color="primary" @click="alertMessage()">alert</v-btn>
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
                <v-card-action>
                    <v-btn color="primary" @click="alertMParams(item.meassage)">alert</v-btn>
                </v-card-action>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-text-field
                name="name"
                label="label"
                id="id"
                v-model="name"
            >
            </v-text-field>
                <v-btn color="primary" @click="alertMParams(name)">alert</v-btn>
        </v-col>
        <v-col clos="12">
            <loginPage :name="name"  @alertMessage2="alertMessage" />
        </v-col>

    </v-row>
    

  </div>
</template>

<script>
import loginPage from "../components/login.vue";
import { EventBus } from "@/EventBus"
export default {
    components:{
        loginPage
    },
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
    },
    mounted() {
        EventBus.$on('callEvent', this.alertMParams)
    },
    methods: {
        alertMessage(){
            alert('Alert Meassage Method Main')
        },
        alertMParams(itemz){
            alert('Iput is : '+itemz)
        }
    }
}
</script>

<style>

</style>