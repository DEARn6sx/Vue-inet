FROM node:20.10.0

# ตั้งค่าไดเร็กทอรี่ทำงาน
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json เข้าไปใน image
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกทั้งหมดของโค้ดของคุณเข้าไปใน image
COPY . .

# สร้างโปรเจกต์ Vue.js
RUN npm run build

# เริ่มต้นแอปพลิเคชัน
CMD ["npm", "run", "serve"]

