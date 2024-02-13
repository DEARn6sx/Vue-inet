<template>
  <div>
    <v-row>
        <v-col clos="6">
            <v-btn color="primary" @click="newUser">New Users</v-btn>
        </v-col>
      <v-col v-for="(item, index) in apidata" :key="index" cols="3" style="height: 100%;">
        <v-card style="height: 100%;">
          <img :src="getImageUrl(item.img)" style="max-width: 100%; max-height: 100%; width: auto; height: auto;" />
          <v-card-title>{{ item.username }}</v-card-title>
          <v-card-subtitle>{{ item.firstName }} {{ item.lastName }} </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="editItem(item)">Detail</v-btn>
            <!-- <v-btn color="success" @click="editItem(item)">Edit</v-btn> -->
            <v-btn color="error" @click="deleteItem(item)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog 
    v-model="dialogEdit" 
    max-width="500px">

        <v-card>
            <v-card-title primary-title>
                {{savemode}}
            </v-card-title >
                <v-card-text>
                    <v-row>
                       
                        
                            <v-text-field 
                            name="username"
                            label="username"
                            id="username"
                            v-model="postdata.username"
                            >      
                            </v-text-field>
                      
                            <v-text-field 
                            name="password"
                            label="password"
                            id="password"
                            v-model="postdata.password"
                            >      
                            </v-text-field>
                        
                            <v-text-field 
                            name="firstName"
                            label="firstName"
                            id="firstName"
                            v-model="postdata.firstName"
                            >      
                            </v-text-field>
                        
                            <v-text-field 
                            name="lastName"
                            label="lastName"
                            id="lastName"
                            v-model="postdata.lastName"
                            >      
                            </v-text-field>
                           <v-text-field v-model="postdata.age" label="Age" outlined type="number" required></v-text-field>              
                        <v-col cols="3" v-if="savemode === 'New User'">
                          <v-file-input
                              v-model="postdata.imageFile"
                              label="Image"
                              accept="image/*"
                              @change="handleImageChange"
                              :multiple="false"
                          ></v-file-input>
                        </v-col>
                        <v-select v-model="postdata.gender" label="Gender" :items="postdata.genderOptions" outlined required></v-select>
                      
                    </v-row>
                </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="closeItem()">cancel</v-btn>
                <v-btn text color="info" @click="saveSelect()">save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

  </div>
  
</template>

<script>

export default {
  data() {
    return {
      apidata: [],
      id:'',
      dialogEdit: false,
      postdata: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: null,
        gender: '',
      },
      postdeFault: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: null,
        gender: '',
        genderOptions: ['Male', 'Female', 'Other'],
      },
    };
  },
  computed:{
    savemode(){
       return this.id == '' ? 'New User' : 'Edit User'
    }
  },
  created() {
    this.getData();
  },
  methods: {
     handleImageChange() {
        this.postdata.imageFile = event.target.files[0];
        // If you need to preview the image, you can convert it to a Data URL
        const reader = new FileReader();
        reader.onload = (e) => {
            this.postdata.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.postdata.imageFile);
    },
    newUser(){
        this.id = ''
        this.postdata = {...this.postdeFault}
        this.dialogEdit = true
    },
    editItem(item){
        this.id = item._id
        this.postdata = item
        this.dialogEdit = true
    },
    deleteItem(item){
        this.id = item._id
        this.deleteData(this.id)
    },
    closeItem(){
        this.id = ''
        this.postdata = {...this.postdeFault}
        this.dialogEdit = false
    },
    saveSelect(){
        if (this.id != '')  {
            this.editPutData()
        }
        else { this.registerUser() }
    },
    getData() {
      this.axios.get('http://localhost:3000/users/').then((response) => {
        console.log('ข้อมูลทั้งหมด', response);
        this.apidata = response.data.data;
        console.log('ข้อมูลทั้งหมด', response.data);
      });
    },
    async registerUser() {

       try {
            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            formData.append('firstName', this.firstName);
            formData.append('lastName', this.lastName);
            formData.append('age', this.age);
            formData.append('gender', this.gender);
            formData.append('img', this.postdata.imageFile); 

            const { data } = await this.axios.post('http://localhost:3000/register/', formData);
            alert(data.message);
            this.getData();
            this.closeItem();
        } catch (error) {
            console.error('Error Register:', error);
        }
    },
    async editPutData (){
        try {
           const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            formData.append('firstName', this.firstName);
            formData.append('lastName', this.lastName);
            formData.append('age', this.age);
            formData.append('gender', this.gender);
            const { data } = await this.axios.put(`http://localhost:3000/register/`+ this.id, formData);
            alert(data.message);
            this.getData();
            this.closeItem();
        } catch (error) {
            console.error('Edit Error:', error);
        }
    },
    async deleteData (){
        if (confirm("จะลบจริงหรอออ?")){
        try {
           
            const { data } = await this.axios.delete(`http://localhost:3000/products/`+ this.id, this.postdata);
            alert(data.message);
            this.getData();
            this.closeItem();
        } catch (error) {
            console.error('Error Delete Items:', error);
        } }else console.log('cancel');
    },
    getImageUrl(img) {
      // Construct the URL for the image from the backend
      return `http://localhost:3000/images/profile/${img}`;
    },
  },
};
</script>

<style>
</style>
