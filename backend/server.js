import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Kích hoạt đọc file .env
dotenv.config();

const app = express();
app.use(express.json()); // Phân tích dữ liệu JSON từ Admin gửi lên
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. NỐI CÁP VÀO MONGODB CLOUD
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('🟢 Đã kết nối thành công với Database SAM Matcha!'))
  .catch((err) => console.log('🔴 Lỗi kết nối MongoDB:', err));

// 2. KHAI BÁO KHUÔN MẪU CỦA MENU TRÊN DATABASE
const menuSchema = new mongoose.Schema({
  category: String,
  columns: [String],
  items: [
    {
      name: String,
      price: String,
      priceBottle: { type: String, default: "-" },
      isHot: { type: Boolean, default: false },
      rating: { type: Number, default: 0 }
    }
  ]
});

// Tạo một Bảng trong CSDL có tên là 'Menu'
const Menu = mongoose.model('Menu', menuSchema);

// 3. MENU "FULL TOPPING" (Dùng để bơm lên Đám mây)
const menuData = [
  {
    category: "Signature",
    items: [
      { name: "Matcha Coconut", price: "45K", isHot: false },
      { name: "Coco Matcha Latte", price: "45K", isHot: false },
      { name: "Matcha Oatmilk", price: "45K", isHot: false },
      { name: "Khoai Môn Coconut", price: "45K", isHot: false },
      { name: "Matcha Old Money Cafe", price: "45K", isHot: false },
      { name: "Matcha Baileys", price: "45K", isHot: false },
      { name: "Sen Dừa Matcha", price: "45K", isHot: false },
      { name: "Matcha Latte", price: "40K", isHot: false, rating: 5 },
      { name: "Matcha Dâu", price: "40K", isHot: false, rating: 5 },
      { name: "Matcha Xoài", price: "40K", isHot: false, rating: 5 },
      { name: "Matcha Cam Dứa", price: "40K", isHot: false, rating: 5 },
      { name: "Khoai Môn Latte", price: "40K", isHot: false },
      { name: "Houjicha Latte", price: "40K", isHot: false, rating: 5 },
      { name: "Genmaicha Latte", price: "40K", isHot: false, rating: 5 },
    ]
  },
  {
    category: "Cafe",
    columns: ["Cốc", "Chai"],
    items: [
      { name: "Cafe Đen / Nâu", price: "30K", priceBottle: "-", isHot: false },
      { name: "Cafe Bạc Hà", price: "40K", priceBottle: "-", isHot: false },
      { name: "Cafe Lá Dứa", price: "40K", priceBottle: "-", isHot: false },
      { name: "Cafe Bạc Sỉu", price: "35K", priceBottle: "55K", isHot: false },
      { name: "Cafe Cốt Dừa", price: "40K", priceBottle: "-", isHot: false },
      { name: "Cafe Kem Trứng", price: "40K", priceBottle: "60K", isHot: false, rating: 5 },
      { name: "Cafe Kem Muối", price: "40K", priceBottle: "60K", isHot: false, rating: 5 },
      { name: "Cafe Khoai Môn", price: "45K", priceBottle: "-", isHot: false },
    ]
  },
  {
    category: "Trà Trái Cây",
    items: [
      { name: "Trà Đào Olympus", price: "45K", isHot: false },
      { name: "Trà Lựu Vải Thiều", price: "45K", isHot: false, rating: 5 },
      { name: "Trà Mận Hà Nội", price: "45K", isHot: false, rating: 5 },
      { name: "Trà Táo Bạc Hà", price: "45K", isHot: false },
      { name: "Trà Sen Vàng", price: "45K", isHot: false, rating: 5 },
      { name: "Trà Vải Nhiệt Đới", price: "45K", isHot: false },
      { name: "Trà Xoài Kem Cheese", price: "45K", isHot: false, rating: 5 },
      { name: "Trà Dâu Kem Cheese", price: "45K", isHot: false, rating: 5 },
      { name: "Trà Dâu Tằm Ngọc Trai", price: "45K", isHot: false, rating: 5 },
      { name: "Trà Yuzu Bưởi Hồng", price: "45K", isHot: false },
    ]
  },
  {
    category: "Nước Khoái",
    items: [
      { name: "Khoái Xí Muội", price: "40K", isHot: false, rating: 5 },
      { name: "Chiều Hoàng Hôn", price: "40K", isHot: false },
      { name: "Khoái Dâu Tằm", price: "40K", isHot: false, rating: 5 },
    ]
  },
  {
    category: "Trà Nóng",
    items: [
      { name: "Trà Dưỡng Nhan", price: "35K", isHot: true },
      { name: "Trà Xí Muội Cam Thảo", price: "35K", isHot: true },
      { name: "Trà Cam Quế Mật Ong", price: "35K", isHot: true },
    ]
  },
  {
    category: "Matcha Premium",
    items: [
      { name: "Matcha Matsu", price: "55K", isHot: false, rating: 5 },
      { name: "Matcha Aki", price: "65K", isHot: false, rating: 5 },
      { name: "Matcha Fuji", price: "75K", isHot: false, rating: 5 },
    ]
  },
  {
    category: "Kem & Ăn Kèm",
    items: [
      { name: "Kem Cheese", price: "5K", isHot: false },
      { name: "Kem Muối", price: "5K", isHot: false },
      { name: "Kem Trứng", price: "5K", isHot: false },
      { name: "Kem Hạt Dẻ Cười", price: "5K", isHot: false },
      { name: "Hướng Dương", price: "10K", isHot: false },
    ]
  },
  {
    category: "Chocobomb",
    items: [
      { name: "Chocola Đen", price: "45K", isHot: true, rating: 5 },
      { name: "Matcha", price: "45K", isHot: true, rating: 5 },
    ]
  }
];

// 4. API BƠM DỮ LIỆU (Chỉ chạy 1 lần)
app.get('/api/seed', async (req, res) => {
  try {
    await Menu.deleteMany(); // Xóa sạch bảng cũ nếu có
    await Menu.insertMany(menuData); // Bơm cục dữ liệu ở trên vào Đám mây
    res.send('<h1>✅ Đã bơm toàn bộ Menu lên MongoDB thành công!</h1><p>Bạn có thể đóng tab này lại.</p>');
  } catch (error) {
    res.status(500).send('🔴 Lỗi bơm dữ liệu: ' + error.message);
  }
});

// 5. API CHÍNH: CUNG CẤP DỮ LIỆU TỪ MONGODB CHO FRONTEND
app.get('/api/menu', async (req, res) => {
  try {
    const menu = await Menu.find(); // Lấy trực tiếp từ MongoDB Atlas
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
});
app.post('/api/menu', async (req, res) => {
  try {
    const newCategory = new Menu(req.body); // Tạo cục dữ liệu mới từ Admin gửi lên
    const savedCategory = await newCategory.save(); // Lưu thẳng lên MongoDB
    res.status(201).json(savedCategory); // Báo cáo thành công
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm món mới", error });
  }
});

// 2. SỬA MÓN ĂN/GIÁ TIỀN (PUT)
app.put('/api/menu/:id', async (req, res) => {
  try {
    // Tìm cái id của món cần sửa, và đè dữ liệu mới lên
    const updatedCategory = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Lấy cục dữ liệu mới nhất sau khi sửa xong
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật giá/món", error });
  }
});

// 3. XÓA MÓN ĂN/DANH MỤC (DELETE)
app.delete('/api/menu/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id); // Trảm luôn trên mây
    res.status(200).json({ message: "Đã xóa thành công khỏi Menu!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa", error });
  }
});
app.get('/', (req, res) => {
  res.send('Server Backend của SAM đang chạy mượt mà!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

const app = express();
app.use(cors()); // Dòng này phải nằm NGAY DƯỚI dòng const app = express()