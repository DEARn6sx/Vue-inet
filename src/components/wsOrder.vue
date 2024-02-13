<template>
  <div>
    <v-col cols="6" >
        <v-text-field v-model="searchOrderID" label="Search Order ID" @input="searchOrders"></v-text-field>
      </v-col>
    <v-row v-if="!searchData || searchOrderID === ''">
      <v-col v-for="(item, index) in apidata" :key="index" cols="3" style="height: 100%;">
        <v-card style="height: 100%;">
          <v-card-title>{{ item.product_name }}</v-card-title>
          <v-card-subtitle>{{ item._id }} </v-card-subtitle>
          <v-card-text> Amount : {{ item.amount }} </v-card-text>
          <v-card-text> Total Price : {{ item.totalprice }} </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="editItem(item)">Edit</v-btn>
            <v-btn color="error" @click="deleteItem(item)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="(item, index) in filteredOrders" :key="index" cols="3" style="height: 100%;">
        <v-card style="height: 100%;">
          <v-card-title>{{ item.product_name }}</v-card-title>
          <v-card-subtitle>{{ item._id }} </v-card-subtitle>
          <v-card-text> Amount {{ item.amount }} </v-card-text>
          <v-card-text> TotalPrice {{ item.totalprice }} </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="editItem(item)">Edit</v-btn>
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
                       
                        <v-col cols="6">
                        <div>
                            <strong>Name:</strong> {{ postdata.product_name }}
                        </div>
                        </v-col>
                        <v-col cols="6">
                        <div>
                            <strong>Amount:</strong> {{ postdata.amount }}
                        </div>
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
      dialogOrder: false,
      searchData: false,
      postdata: {
        product_id: '',
        product_name:'null' ,
        amount: null,
        totalprice: null,
      },
      postdeFault: {
        product_id: '',
        product_name:'null' ,
        amount: null,
        totalprice: null,
      },
    };
  },
  computed:{
    savemode(){
       return this.id == '' ? 'New order' : 'Edit order'
    },
    
     filteredOrders() {
    // Filter orders based on the entered order ID
    const filtered = this.apidata.filter(order => order._id.includes(this.searchOrderID));
    return filtered.length > 0 ? [filtered[0]] : [];
    },
    },
  created() {
    this.getData();
  },
  
  methods: {
    searchOrders(item) {
      this.id = ''
      this.postdata = item
      this.getData_id();
      this.searchData = true
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
    getData() {
        this.axios.get('http://localhost:3000/orders/').then((response) => {
        console.log('ข้อมูลทั้งหมด', response);
        this.apidata = response.data.data;
        console.log('ข้อมูลทั้งหมด', response.data);
      });
    },
    async getData_id(){
        try {
           
            await this.axios.get(`http://localhost:3000/orders/`+ this.id);

            this.getData();
        } catch (error) {                         
            console.error('Edit Error:', error);
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
           
            const { data } = await this.axios.put(`http://localhost:3000/orders/`+ this.id, this.postdata);
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
           
            const { data } = await this.axios.delete(`http://localhost:3000/orders/`+ this.id, this.postdata);
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
