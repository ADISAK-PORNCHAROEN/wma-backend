# ---------------------------------------------------
# Stage 1: Build (เตรียมของและแปลงไฟล์)
# ---------------------------------------------------
FROM node:18-alpine AS builder

# กำหนดพื้นที่ทำงาน
WORKDIR /app

# Copy ไฟล์ Package เพื่อเตรียมลง Library
COPY package*.json ./

# ลง Library ทั้งหมด (รวม devDependencies เพื่อใช้ Build)
RUN npm install

# Copy โค้ดทั้งหมด
COPY . .

# สั่ง Build (TypeScript -> JavaScript) ไฟล์จะไปอยู่ที่โฟลเดอร์ dist
RUN npm run build

# ---------------------------------------------------
# Stage 2: Production (เอาเฉพาะของที่ใช้จริงมารัน)
# ---------------------------------------------------
FROM node:18-alpine

WORKDIR /app

# Copy ไฟล์ Package มาอีกครั้ง
COPY package*.json ./

# ลง Library เฉพาะที่ต้องใช้รันจริง (ตัด devDependencies ออกเพื่อลดขนาดไฟล์)
RUN npm install --only=production

# Copy โฟลเดอร์ dist ที่ Build เสร็จแล้วจาก Stage 1 มา
COPY --from=builder /app/dist ./dist

# เปิด Port 
EXPOSE 4003

# คำสั่งรันโปรแกรม (ชี้ตรงไปที่ไฟล์ main.js)
CMD ["node", "dist/main"]