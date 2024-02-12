<template>
  <div class="register-container">
    <h2>Create your account</h2>
    <v-form @submit.prevent="registerUser">
      <v-text-field v-model="username" label="Username" outlined required></v-text-field>
      <v-text-field v-model="password" label="Password" outlined type="password" required></v-text-field>
      <v-text-field v-model="firstName" label="First Name" outlined required></v-text-field>
      <v-text-field v-model="lastName" label="Last Name" outlined required></v-text-field>
      <v-text-field v-model="age" label="Age" outlined type="number" required></v-text-field>
      <v-select v-model="gender" label="Gender" :items="genderOptions" outlined required></v-select>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      age: null,
      gender: '',
      genderOptions: ['Male', 'Female', 'Other'],
    };
  },
  methods: {
    async registerUser() {
      // Perform additional validation if needed
      if (!this.isValidAge()) {
        // Show error message or handle invalid age
        return;
      }

       try {
            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            formData.append('firstName', this.firstName);
            formData.append('lastName', this.lastName);
            formData.append('age', this.age);
            formData.append('gender', this.gender);

            const { data } = await this.axios.post('http://localhost:3000/register/', formData);
            alert(data.message);
            this.getData();
            this.closeItem();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    },
    isValidAge() {
      return this.age !== null && this.age >= 18; // Adjust the age validation as needed
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 50%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0; /* Light grey background color */
}

/* Add your custom styles to enhance the appearance */
</style>
