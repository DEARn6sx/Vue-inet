<template>
  <div>
    <v-col cols="6" >
        <v-text-field v-model="searchProductId" label="Search Product ID" @input="searchProduct"></v-text-field>
      </v-col>
      <v-col clos="6">
            <v-btn color="success" @click="newItem">New item</v-btn>
        </v-col>
    <v-row v-if="!searchData || searchProductId === ''">
        
      <v-col v-for="(item, index) in apidata" :key="index" cols="3" style="height: 100%;">
        <v-card style="height: 100%;">
          <img :src="getImageUrl(item.img)" style="max-width: 100%; max-height: 100%; width: auto; height: auto;" />
          <v-card-title>{{ item.product_name }}</v-card-title>
          <v-card-text> {{ item._id }} </v-card-text>
          <v-card-subtitle>{{ item.price }} บาท</v-card-subtitle>
          <v-card-text>สินค้าที่เหลือ {{ item.amount-item.order }} ชิ้น</v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="editItem(item)">Edit</v-btn>
            <v-btn color="error" @click="deleteItem(item)">Delete</v-btn>
            <v-btn color="primary" @click="placeOrder(item)">Order</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
     <v-row v-else>
        
      <v-col v-for="(item, index) in filteredProducts" :key="index" cols="3" style="height: 100%;">
        <v-card style="height: 100%;">
          <img :src="getImageUrl(item.img)" style="max-width: 100%; max-height: 100%; width: auto; height: auto;" />
          <v-card-title>{{ item.product_name }}</v-card-title>
          <v-card-text> {{ item._id }} </v-card-text>
          <v-card-subtitle>{{ item.price }} บาท</v-card-subtitle>
          <v-card-text>สินค้าที่เหลือ {{ item.amount-item.order }} ชิ้น</v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="editItem(item)">Edit</v-btn>
            <v-btn color="error" @click="deleteItem(item)">Delete</v-btn>
            <v-btn color="primary" @click="placeOrder(item)">Order</v-btn>
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
                       
                        <v-col clos="6">
                            <v-text-field 
                            name="product_name"
                            label="product_name"
                            id="product_name"
                            v-model="postdata.product_name"
                            >      
                            </v-text-field>
                        </v-col>
                        <v-col clos="6">
                            <v-text-field 
                            name="price"
                            label="price"
                            id="price"
                            v-model="postdata.price"
                            >      
                            </v-text-field>
                        </v-col>
                        <v-col clos="6">
                            <v-text-field 
                            name="amount"
                            label="amount"
                            id="amount"
                            v-model="postdata.amount"
                            >      
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" v-if="savemode === 'New item'">
                          <v-file-input
                              v-model="postdata.imageFile"
                              label="Image"
                              accept="image/*"
                              @change="handleImageChange"
                              :multiple="false"
                          ></v-file-input>
                        </v-col>
                    </v-row>
                </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="closeItem()">cancel</v-btn>
                <v-btn text color="info" @click="saveSelect()">save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog 
    v-model="dialogOrder" 
    max-width="500px">

        <v-card>
            <v-card-title primary-title>
                Order
            </v-card-title >
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                        <div>
                            <strong>Name:</strong> {{ postdata.product_name }}
                        </div>
                        </v-col>
                        <v-col cols="6">
                        <div>
                            <strong>Price:</strong> {{ postdata.price }}
                        </div>
                        </v-col>
                        <v-col cols="6">
                        <div>
                            <strong>Remaining amount:</strong> {{ calculatedRAmount }}
                        </div>
                        </v-col>
                        <v-col cols="6" v-if="!orderSaved">
                        <v-text-field
                            name="order"
                            label="order"
                            id="order"
                            v-model="postdata.order"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="3" v-if="savemode === 'New item'">
                          <v-file-input
                              v-model="postdata.imageFile"
                              label="Image"
                              accept="image/*"
                              @change="handleImageChange"
                              :multiple="false"
                          ></v-file-input>
                        </v-col>
                    </v-row>
                </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="closeOrder()">cancel</v-btn>
                <v-btn text color="info" @click="saveOrder()">save</v-btn>
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
      dialogOrder: false,
      searchData: false,
      postdata: {
        product_name: '',
        price:null ,
        amount: null,
        order: 0,
      },
      postdeFault: {
        product_name: '',
        price:null ,
        amount: null,   
        order: 0
      },
    };
  },
  computed:{
    filteredProducts() {
    // Filter orders based on the entered order ID
    const filtered = this.apidata.filter(order => order._id.includes(this.searchProductId));
    return filtered.length > 0 ? [filtered[0]] : [];
    },
    savemode(){
       return this.id == '' ? 'New item' : 'Edit item'
    },
    calculatedRAmount() {
      if (this.postdata.amount !== null && this.postdata.order !== null) {
        return this.postdata.amount - this.postdata.order;
      }
      return null;
    },
    },
  created() {
    this.getData();
  },
  
  methods: {
    searchProduct(item) {
      this.id = ''
      this.postdata = item
      this.getData_id();
      this.searchData = true
    },
     handleImageChange() {
        this.postdata.imageFile = event.target.files[0];
        // If you need to preview the image, you can convert it to a Data URL
        const reader = new FileReader();
        reader.onload = (e) => {
            this.postdata.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.postdata.imageFile);
    },
    newItem(){
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
    placeOrder(item){
        this.id = item._id
        this.postdata = item
        this.dialogOrder = true
    },
    closeOrder(){
        this.id = ''
        this.postdata = {...this.postdeFault}
        this.dialogOrder = false
    },
    async saveOrder() {
    if (this.id !== '') {
      await this.savePostOrder();
    }
    this.getData();  // Refresh the data
    this.closeOrder();  // Close the dialog
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
        else { this.savePostData() }
    },
    async getData_id(){
        try {
           
            await this.axios.get(`http://localhost:3000/products/`+ this.id);

            this.getData();
        } catch (error) {
            console.error('Edit Error:', error);
        }
    },
    getData() {
      this.axios.get('http://localhost:3000/products/').then((response) => {
        console.log('ข้อมูลทั้งหมด', response);
        this.apidata = response.data.data;
        console.log('ข้อมูลทั้งหมด', response.data);
      });
    },
    async savePostOrder (){
        try {
          
            const _data ={
                'order': Number(this.postdata.order),
            }
            const { data } = await this.axios.post(`http://localhost:3000/products/orders/`+this.postdata._id, _data);
            alert(data.message);
            this.closeItem();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    },
    async savePostData (){
        try {
            const formData = new FormData();
            formData.append('product_name', this.postdata.product_name);
            formData.append('price', this.postdata.price);
            formData.append('amount', this.postdata.amount);
            formData.append('img', this.postdata.imageFile); // Use 'img' as the field name matching your backend

            const { data } = await this.axios.post('http://localhost:3000/products/', formData);
            alert(data.message);
            this.getData();
            this.closeItem();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    },
    async editPutData (){
        try {
           
            const { data } = await this.axios.put(`http://localhost:3000/products/`+ this.id, this.postdata);
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
      return `http://localhost:3000/images/products/${img}`;
    },
    
  
  },
};
</script>

<style>
</style>
