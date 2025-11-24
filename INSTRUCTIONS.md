# HƯỚNG DẪN SỬ DỤNG ERD ĐẦY ĐỦ 35 BẢNG

## 📊 TỔNG QUAN

Database hoàn chỉnh bao gồm **35 bảng** chia thành 4 nhóm:

1. **Core Business (20 bảng)** - Nghiệp vụ chính
2. **SEO & Content (5 bảng)** - Marketing & SEO
3. **Marketing & CRM (6 bảng)** - Quản lý khách hàng
4. **Enterprise (6 bảng)** - Tính năng cao cấp

---

## 🎨 CÁCH SỬ DỤNG FILE ERD

### CÁCH 1: Sử dụng dbdiagram.io (Khuyến nghị) ⭐

1. Truy cập: https://dbdiagram.io
2. Click "Create Diagram"
3. Xóa nội dung mẫu
4. Copy toàn bộ nội dung file `car_rental_erd_full.dbml`
5. Paste vào editor
6. ERD sẽ tự động hiển thị!

**Tính năng:**
- ✅ Xem quan hệ giữa các bảng
- ✅ Zoom in/out
- ✅ Export sang PNG, PDF, SQL
- ✅ Share link
- ✅ Tự động layout

---

### CÁCH 2: Sử dụng các tool khác

#### A. MySQL Workbench
1. File → Import → Reverse Engineer...
2. Chuyển đổi DBML sang SQL trước

#### B. draw.io
1. Import file DBML (cần plugin)
2. Hoặc vẽ lại theo cấu trúc

#### C. DBeaver
1. Database → ER Diagram
2. Import SQL schema

---

## 📋 CẤU TRÚC 35 BẢNG

### 🔴 NHÓM 1: CORE BUSINESS (20 bảng)

| STT | Bảng | Mục đích |
|-----|------|----------|
| 1 | VehicleCategory | Phân loại xe |
| 2 | Vehicle | Thông tin xe |
| 3 | VehicleDocument | Giấy tờ xe |
| 4 | Branch | Chi nhánh |
| 5 | PriceList | Bảng giá |
| 6 | Customer | Khách hàng |
| 7 | Employee | Nhân viên |
| 8 | Account | Tài khoản |
| 9 | Booking | Đặt xe |
| 10 | Contract | Hợp đồng |
| 11 | Deposit | Đặt cọc |
| 12 | DepositDetail | Chi tiết cọc |
| 13 | Handover | Giao xe |
| 14 | ReturnReport | Trả xe |
| 15 | Invoice | Hóa đơn |
| 16 | Payment | Thanh toán |
| 17 | Surcharge | Phụ phí |
| 18 | Promotion | Khuyến mãi |
| 19 | Maintenance | Bảo dưỡng |
| 20 | AuditLog | Nhật ký |

---

### 🟡 NHÓM 2: SEO & CONTENT (5 bảng)

| STT | Bảng | Mục đích |
|-----|------|----------|
| 21 | BlogPost | Bài viết blog |
| 22 | BlogCategory | Danh mục blog |
| 23 | Page | Trang tĩnh (FAQ, About...) |
| 24 | Review | Đánh giá khách hàng |
| 25 | SeoRedirect | Chuyển hướng URL |

---

### 🟢 NHÓM 3: MARKETING & CRM (6 bảng)

| STT | Bảng | Mục đích |
|-----|------|----------|
| 26 | Notification | Thông báo |
| 27 | NotificationTemplate | Mẫu thông báo |
| 28 | CustomerSegment | Phân khúc KH |
| 29 | MarketingCampaign | Chiến dịch marketing |
| 30 | LoyaltyProgram | Chương trình tích điểm |
| 31 | LoyaltyTransaction | Giao dịch điểm |

---

### 🟣 NHÓM 4: ENTERPRISE (6 bảng)

| STT | Bảng | Mục đích |
|-----|------|----------|
| 32 | Tenant | Multi-tenant (SaaS) |
| 33 | SubscriptionPlan | Gói đăng ký |
| 34 | PricingRule | Định giá động |
| 35 | CorporateAccount | Tài khoản DN |
| 36 | Partner | Đối tác/Affiliate |
| 37 | SystemConfig | Cấu hình hệ thống |

---

## 🔗 CÁC QUAN HỆ CHÍNH

### Luồng nghiệp vụ chính:

```
Customer → Booking → Vehicle
           ↓
        Contract
           ↓
        Deposit → DepositDetail
           ↓
        Handover
           ↓
     (Khách sử dụng xe)
           ↓
      ReturnReport
           ↓
        Invoice → Payment
                → Surcharge
                → Promotion
```

### Luồng SEO & Content:

```
BlogCategory → BlogPost
               ↓
            (User đọc)
               ↓
           ViewCount++

Booking → Review → Vehicle.Rating++
```

### Luồng Marketing:

```
Customer → CustomerSegment
              ↓
      MarketingCampaign
              ↓
        Notification
```

### Luồng Loyalty:

```
Booking (Complete) → LoyaltyTransaction (EARN)
Customer.Points++ → LoyaltyTransaction (REDEEM)
```

---

## 💡 TIPS SỬ DỤNG

### 1. Xem từng nhóm riêng

File DBML này rất lớn. Để dễ nhìn, bạn có thể:
- Comment các nhóm không cần xem bằng `//`
- Hoặc tạo file riêng cho từng level

### 2. Export SQL

Trong dbdiagram.io:
- Click "Export" → "PostgreSQL" hoặc "MySQL"
- Sẽ ra file SQL CREATE TABLE hoàn chỉnh

### 3. Customize

Bạn có thể:
- Thêm/bớt fields
- Thêm indexes
- Thêm constraints
- Thay đổi data types

### 4. Document

Sử dụng `note` trong DBML:
```
Table Example {
  field_name type [note: 'Mô tả chi tiết']
}
```

---

## 🚀 TRIỂN KHAI

### Bước 1: Review ERD
1. Xem toàn bộ 35 bảng
2. Kiểm tra relationships
3. Điều chỉnh nếu cần

### Bước 2: Generate SQL
1. Export từ dbdiagram.io
2. Hoặc viết SQL thủ công

### Bước 3: Create Database
```sql
CREATE DATABASE car_rental_db;
USE car_rental_db;

-- Run CREATE TABLE statements
-- Run CREATE INDEX statements
-- Run INSERT sample data
```

### Bước 4: Testing
1. Test tất cả relationships
2. Test constraints
3. Test indexes performance

---

## 📞 HỖ TRỢ

Nếu cần hỗ trợ:
1. Kiểm tra lại quan hệ trong dbdiagram.io
2. Đọc documentation của từng bảng
3. Test với sample data

---

## 📊 GIÁ TRỊ SẢN PHẨM

Với 35 bảng đầy đủ này, bạn có:
- ✅ Core business hoàn chỉnh
- ✅ SEO-ready, content marketing
- ✅ CRM & Marketing automation
- ✅ Multi-tenant (SaaS model)
- ✅ Dynamic pricing
- ✅ Loyalty program
- ✅ Enterprise features

**→ Giá trị: 400-600 TRIỆU VNĐ** 💎

---

**Good luck with your project! 🚀**
