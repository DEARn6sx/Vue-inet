<template>
  <div>
    <div class="self-presentation" style="background-color: #edede8">
    <div class="image-container">    
    <v-card  >
        <v-img src="../assets/profile.png" />        
    </v-card>
    </div>
    <div class="text-container" >
      <h1 >{{ name }}</h1>
      <p >จบจาก : {{ description }}</p>
      <p>งานอดิเรกที่ชอบ : {{ hobby }}</p>
      <p>สิ่งที่ไม่ชอบ : {{ disklike }}</p>
      <p>ทีมกีฬาที่ชอบ : {{ favsportteam }}</p>
      <p>จุดแข็ง : {{ strength }}</p>
      <p>จุดอ่อน : {{ weakness }}</p>
      <ul v-if="links.length">
        <li v-for="(link, index) in links" :key="index">
          <a :href="link.url" :target="link.target" :title="link.title">{{ link.text }}</a>
        </li>
      </ul>
    </div>
  </div>
  </div>
  
  
</template>

<script>
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
      links: [
        {
          text: 'FaceBook', // Link text
          url: 'https://www.facebook.com/dear207rw', // Link URL
          target: '_blank', // Optional link target (e.g., '_blank' for new tab)
          title: 'Visit my website', // Optional link title
        },
        {
          // Add more links as needed
        },
      ],
    };
  },
    components:{
        
    }
}
</script>

<style scoped>
.self-presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px; /* Adjust as needed */
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(26, 24, 24, 0.2);
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
  font-size: 18px;
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
</style>

