# ✨ HoloCraft

<p align="center">
  Khám phá các kỳ quan, động cơ và phương tiện 3D từ hạt ánh sáng — điều khiển bằng bàn tay ngay trên trình duyệt.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 18+">
  <img src="https://img.shields.io/badge/WebGL-2-990000?style=for-the-badge&logo=webgl&logoColor=white" alt="WebGL 2">
  <img src="https://img.shields.io/badge/MediaPipe-Hand%20Tracking-00A67E?style=for-the-badge&logo=google&logoColor=white" alt="MediaPipe">
  <img src="https://img.shields.io/badge/Camera-Optional-4B8BBE?style=for-the-badge&logo=webcam&logoColor=white" alt="Camera optional">
</p>

## Chạy dự án

Yêu cầu: Node.js 18 trở lên.

```bash
npm install
npm start
```

Mở [http://localhost:5173](http://localhost:5173) bằng Chrome hoặc Edge. Chọn **Start with camera** để dùng cử chỉ, hoặc **Continue without camera** để dùng bàn phím và chuột.

> Camera chỉ hoạt động khi chạy qua `localhost` hoặc HTTPS. Có thể đổi cổng bằng `npm start -- 8080`.

## Công nghệ

| Công nghệ | Vai trò |
|---|---|
| MediaPipe Tasks Vision | Theo dõi bàn tay trực tiếp trên thiết bị |
| WebGL2 | Hiển thị và mô phỏng hạt bằng GPU |
| Node.js | Static server cục bộ, không cần framework |

Không có video hay dữ liệu cử chỉ nào được gửi ra khỏi trình duyệt.

## Danh mục mô hình

| Nhóm | Mô hình |
|---|---|
| 🏛️ Kỳ quan | Turtle Tower, Eiffel Tower, Statue of Liberty, Burj Khalifa, Great Pyramid, Colosseum, Leaning Tower of Pisa, Taj Mahal, Big Ben, Christ the Redeemer, Sydney Opera House |
| ✈️ Động cơ | Turbofan Jet Engine, Radial Aircraft Engine |
| 🚀 Phương tiện | Airliner, Saturn V Rocket |

## Cử chỉ và điều khiển

| Cử chỉ / phím | Tác dụng |
|---|---|
| Búng ngón tay / `Space` | Gọi hoặc làm tan mô hình |
| Nắm tay / `F` | Tạo mô hình |
| Xòe tay / `O` | Đổi kỳ quan tiếp theo; tách các bộ phận của động cơ/phương tiện |
| Chỉ ngón trỏ | Chọn bộ phận để xem thông tin |
| Chụm ngón cái và trỏ | Kéo bộ phận đã chọn ra hoặc đưa lại |
| Hai tay xa/gần nhau / `+` `-` | Phóng to, thu nhỏ |
| Dấu V / `V` | Sang mô hình tiếp theo |
| Kéo chuột | Xoay mô hình |
| `H` | Mở bảng trợ giúp đầy đủ |

## Tối ưu hiệu năng

- Giảm số hạt trên máy yếu: `http://localhost:5173/?n=100000&dpr=1`
- Tắt vệt hạt: thêm `&trails=0`
- Bắt đầu ở model cụ thể: thêm `&model=11`

## Cấu trúc tối giản

```text
index.html, styles.css  Giao diện
server.mjs              Server cục bộ
models/                 Model MediaPipe cho hand tracking
src/                    Ứng dụng, WebGL, cử chỉ và model 3D
```
