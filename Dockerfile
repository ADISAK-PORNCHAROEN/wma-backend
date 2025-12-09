# ---------------------------------------------------
# Stage 1: Dependencies (เตรียมลง Library ทั้งหมด)
# ---------------------------------------------------
FROM node:18-alpine AS deps
# ลง libc6-compat (บางครั้ง alpine ต้องการตัวนี้เพื่อให้ library บางตัวทำงานได้)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy เฉพาะไฟล์ package เพื่อให้ Docker Cache Layer นี้ไว้
COPY package*.json ./

# ใช้ npm ci (Clean Install) แทน npm install
RUN npm ci

# ---------------------------------------------------
# Stage 2: Builder (ทำการ Build Code)
# ---------------------------------------------------
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# สั่ง Build (TypeScript -> JavaScript)
RUN npm run build

# ---------------------------------------------------
# Stage 3: Production Deps (เตรียม Library สำหรับรันจริง)
# ---------------------------------------------------
FROM node:18-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./

# ลงเฉพาะของที่ใช้จริง (--omit=dev) และลบ Cache ทิ้งเพื่อลดขนาด
RUN npm ci --omit=dev && npm cache clean --force

# ---------------------------------------------------
# Stage 4: Runner (เอาทุกอย่างมารวมกันเพื่อรัน)
# ---------------------------------------------------
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# สร้าง User ใหม่ (เพื่อความปลอดภัย ไม่ควรใช้ root รัน)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy library ที่คลีนแล้วจาก Stage 3
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy โค้ดที่ Build เสร็จแล้วจาก Stage 2
COPY --from=builder /app/dist ./dist

# เปลี่ยนไปใช้ User ธรรมดา
USER nestjs

# เปิด Port (ต้องตรงกับใน main.ts)
EXPOSE 4003

CMD ["node", "dist/main"]