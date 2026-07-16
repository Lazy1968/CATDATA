# แผนงานระบบบันทึกข้อมูลแมว (Moew Data Management System)

**วัตถุประสงค์:** พัฒนาระบบสำหรับบันทึกและจัดการข้อมูลแมว (CRUD) โดยไม่ต้องมีระบบ Login หรือ Authentication ใดๆ เน้นการทำงานจัดการข้อมูลเป็นหลัก

## Tech Stack
### Frontend
- **Framework:** Vue.js + Vite
- **Styling:** Tailwind CSS + DaisyUI
- **Features:**
  - แสดงผลข้อมูลในรูปแบบ Card และ Table
  - มีฟอร์มสำหรับ เพิ่ม (Create) และแก้ไข (Update) ข้อมูลแมว
  - มีระบบค้นหาและฟิลเตอร์ข้อมูล (Search & Filter)

### Backend
- **Framework:** Express.js (Node.js)
- **API:** RESTful API สำหรับการจัดการข้อมูลแมว (CRUD: Create, Read, Update, Delete)
- **Database:** PostgreSQL (หรือ MySQL)

## ฟีเจอร์ของระบบ (System Features)
1. **การจัดการข้อมูลแมว (CRUD)**
   - **Create:** เพิ่มข้อมูลแมวตัวใหม่
   - **Read:** ดูรายการแมวทั้งหมด และดูรายละเอียดของแมวแต่ละตัว
   - **Update:** แก้ไขข้อมูลแมวที่มีอยู่
   - **Delete:** ลบข้อมูลแมวออกจากระบบ
2. **การแสดงผลและค้นหา**
   - รูปแบบการแสดงผลเลือกได้ 2 แบบคือ Grid (Card) และ List (Table)
   - ฟิลเตอร์ข้อมูลตาม:
     - เพศ (Sex)
     - สี (Color)
     - อายุ (Age)
     - สายพันธุ์ (Breed)
     - ที่อยู่ (Location)
     - สถานะ (Status)
   - ค้นหาข้อมูลด้วยข้อความ (Text Search)

## โครงสร้างข้อมูล (Data Model - Cat)
- `id`: Primary Key
- `name`: ชื่อแมว
- `gender`: เพศ
- `color`: สี
- `age`: อายุ
- `breed`: สายพันธุ์
- `location`: ที่อยู่/พิกัด
- `status`: สถานะ (เช่น ว่าง, มีเจ้าของแล้ว, ต้องการความช่วยเหลือ)
- `image_url`: รูปภาพแมว
- `created_at`: วันที่บันทึกข้อมูล
- `updated_at`: วันที่แก้ไขข้อมูลล่าสุด

## DevOps & Deployment
- **Containerization:** ใช้ Docker และ Docker Compose
- มีการเขียน `Dockerfile` สำหรับทั้ง Frontend และ Backend
- มี `docker-compose.yml` สำหรับรัน service ทั้งหมด (Frontend, Backend, Database) ได้ในคำสั่งเดียว

## Workflow การทำงานเป็นทีม (GitHub Collaboration)
- **สมาชิก:** 2 คน
- **รูปแบบการทำงาน:**
  - สร้างและแบ่ง Branch ในการทำงานตามฟีเจอร์ (Feature Branches) เช่น `feature/frontend-ui`, `feature/backend-api`
  - ทำ Pull Request (PR) เพื่อรีวิวโค้ดก่อน Merge เข้าสู่ `main` branch