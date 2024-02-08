
<template >
  <div ref="fullPageDiv" :style="{ backgroundColor: '#2b2b29' }">
    <v-col class="mb-5" cols="12">
  
    <div class="self-presentation" style="background-color: #c4c4c2">
    <div class="image-container">    
    <div class="image-container">
        <v-card>
          <v-img :src="profileImageUrl" />
        </v-card>
      </div>
    </div>
    <div class="text-container" >
        <div v-if="!isEditMode">
            <h1>{{ name }}</h1>
            <p ><b>จบจาก : </b>{{ description }}</p>
            <p><b>งานอดิเรกที่ชอบ : </b>{{ hobby }}</p>
            <p><b>สิ่งที่ไม่ชอบ : </b>{{ disklike }}</p>
            <p><b>ทีมกีฬาที่ชอบ : </b>{{ favsportteam }}</p>
            <p><b>จุดแข็ง : </b>{{ strength }}</p>
            <p><b>จุดอ่อน : </b>{{ weakness }}</p>
        </div>
        <div v-else>
          <input v-model="editedData.name" :style="{ fontSize: '32px', marginBottom: '5px', width: '120%' }" />
          <p><b>จบจาก : </b><input v-model="editedData.description" :style="{ width: '120%' }" /></p>
          <p><b>งานอดิเรกที่ชอบ : </b><input v-model="editedData.hobby" :style="{ width: '120%' }" /></p>
          <p><b>สิ่งที่ไม่ชอบ : </b><input v-model="editedData.disklike" :style="{ width: '120%' }" /></p>
          <p><b>ทีมกีฬาที่ชอบ : </b><input v-model="editedData.favsportteam" :style="{ width: '120%' }" /></p>
          <p><b>จุดแข็ง : </b><input v-model="editedData.strength" :style="{ width: '120%' }" /></p>
          <p><b>จุดอ่อน : </b><input v-model="editedData.weakness" :style="{ width: '120%' }" /></p>
        </div>
      <ul v-if="links.length">
          <li v-for="(link, index) in links" :key="index">
            <a :href="link.url" :target="link.target" :title="link.title"><v-img :src="link.imageUrl" :width="30"  /></a>
          </li>
      </ul>
      <button @click="toggleEditMode">
      {{ isEditMode ? 'Save' : 'Edit' }}
    </button>
    </div>
  </div>

  </v-col>
 </div> 
</template>

<script>

import IG_icon from '@/assets/Instagram_icon.png';
import fb_icon from '@/assets/facebook.png';
export default {
    data() {
    return {
      name: 'นันทวัฒน์ เสนานาม (เดียร์)',
      description: 'มหาวิทยาลัยขอนแก่น สาขาวิทยาการคอมพิวเตอร์',
      hobby: 'กินเบียร์',
      disklike: 'แฮงค์',
      favsportteam: 'Aurora (Dota)...กำลังจะตกรอบแล้ว',
      strength: 'อยู่ง่ายกินง่าย',
      weakness: 'ขี้ลืม',
      profileImageUrl: require('@/assets/profile.png'),
      links: [
        {
          imageUrl: fb_icon, // Change this line to use the image URL from your folder
          url: 'https://www.facebook.com/dear207rw',
          target: '_blank',
          title: 'Visit my website',
        },
        {
          imageUrl: IG_icon, // Change this line to use the image URL from your folder
          url: 'https://www.instagram.com/dears.n?fbclid=IwAR1D1L_x2jt1L09S-RN1bouaYF4IN5jKDw7gnBC9OlbAnsw0b_nVdxwi8o8',
          target: '_blank',
          title: 'Visit my website',
        },
      ],
        isEditMode: false,
        editedData: {
        name: '',
        description: '',
        hobby: '',
        disklike: '',
        favsportteam: '',
        strength: '',
        weakness: '',
        links: [],
        },
    };
  },
   mounted() {
    // Ensure consistent height across browsers (optional)
    this.$nextTick(() => {
      const vh = window.innerHeight;
      if (this.$refs.fullPageDiv.clientHeight < vh) {
        this.$refs.fullPageDiv.style.height = vh + 'px';
      }
    });
  },
  methods: {
    toggleEditMode() {
      if (this.isEditMode) {
        // Save changes and exit edit mode
        this.name = this.editedData.name;
        this.description = this.editedData.description;
        this.hobby = this.editedData.hobby;
        this.disklike = this.editedData.disklike;
        this.favsportteam = this.editedData.favsportteam;
        this.strength = this.editedData.strength;
        this.weakness = this.editedData.weakness;
        // ... (save other properties)
      } else {
        // Enter edit mode
        this.editedData.name = this.name;
        this.editedData.description = this.description;
        this.editedData.hobby = this.hobby;
        this.editedData.disklike = this.disklike;
        this.editedData.favsportteam = this.favsportteam;
        this.editedData.strength = this.strength;
        this.editedData.weakness = this.weakness;
        // ... (save other properties)
      }

      this.isEditMode = !this.isEditMode;
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap');


.self-presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px; /* Adjust as needed */
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(26, 24, 24, 0.2);
  min-height: 100vh;
}

.image-container {
  width: 250px; /* Adjust as needed */
  height: 250px;
  border-radius: 50%; /* Use circle for image */
  overflow: hidden;
  margin-bottom: 20px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.text-container h1 {
  font-size: 32px;
  margin-bottom: 5px;
}

.text-container p {
  font-size: 19px;
  margin-bottom: 10px;
}

.text-container ul {
  list-style: none;
  padding: 0;
}

.text-container ul li {
  display: inline-block;
  margin-right: 10px;
}

.text-container ul li a {
  text-decoration: none;
  color: #007bff;
}

.text-container ul li a:hover {
  color: #005c9e;
}

.mb-5 {
  font-family: 'Prompt', sans-serif;
}

</style>

