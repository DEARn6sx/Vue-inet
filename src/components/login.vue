<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h2>Login</h2>
        <h1>{{name}}</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Username" 
            prepend-icon="mdi-account-circle"
          />
          <v-text-field 
            :type="showPassword ? 'text' : 'password'" 
            label="Password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">Register</v-btn>
        <v-btn color="info">Login</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      
    <v-text-field
            name="childname"
            label="childname"
            id="childname"
            v-model="childname"
    ></v-text-field>
     <v-btn color="primary" @click="callMain()">callMain</v-btn>
     <v-btn color="primary" @click="callEventParams()">callEventParams</v-btn>
    </v-card>
  </v-app>
</template>

<script>
import { EventBus } from "@/EventBus"
export default {
  props: ['name'],
  methods: {
          callMain(){
              this.$emit('alertMessage2')
          },
          callEventParams(){
              EventBus.$emit('callEvent', this.childname)
          }
      },
  name: 'App',
  data () {
    return {
      showPassword: false,
      childname:''
    }
  },
}
</script>

<style>

</style>