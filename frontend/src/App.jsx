import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';

// HÀM TẠO SLUG
const createSlug = (text) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// DỮ LIỆU CỬA HÀNG (ĐÃ FIX LINK BẢN ĐỒ CHUẨN)
const storesData = [
  {
    id: 1,
    name: "SAM TRẦN QUỐC HOÀN",
    address: "163 P. Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    phone: "037 327 6088",
    hours: "08:00 - 23:00",
    mapUrl: "https://maps.google.com/maps?q=163%20Trần%20Quốc%20Hoàn,%20Hà%20Nội&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: 2,
    name: "SAM VĂN QUÁN",
    address: "587 Đ. Nguyễn Trãi, P. Văn Quán, Thanh Xuân, Hà Nội",
    phone: "037 327 6088",
    hours: "08:00 - 23:00",
    mapUrl: "https://maps.google.com/maps?q=587%20Nguyễn%20Trãi,%20Thanh%20Xuân,%20Hà%20Nội&t=&z=16&ie=UTF8&iwloc=&output=embed"
  }
];

// --- CÁC TRANG CON ---

function Home() {
  useEffect(() => { document.title = "Trang Chủ - sammatchalovers"; }, []);
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105" style={{ backgroundImage: `url('/hero-sam.jpg')` }}></div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 max-w-3xl mt-16">
        <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-2 tracking-tighter">Sam</h2>
        <p className="text-sam-gold font-bold italic text-lg md:text-xl mb-8 tracking-[0.2em] uppercase">matchalovers</p>
        <p className="text-white/90 text-lg md:text-2xl font-light mb-10 italic">"Vị Matcha nguyên bản giữa lòng Hà Nội."</p>
        <Link to="/menu" className="inline-block bg-sam-dark/80 hover:bg-sam-matcha border border-white/20 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 shadow-2xl">
          Khám Phá Menu
        </Link>
      </div>
    </section>
  );
}

function Menu({ menuData }) {
  const { categorySlug } = useParams();

  // Lọc dữ liệu
  const displayData = categorySlug ? menuData.filter(cat => createSlug(cat.category) === categorySlug) : menuData;
  const pageTitle = categorySlug && displayData.length > 0 ? displayData[0].category : "Thực Đơn Tổng";

  useEffect(() => { document.title = `${pageTitle} - sammatchalovers`; }, [pageTitle]);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-[70vh]">
      <div className="text-center mb-16">
        <h3 className="text-3xl font-display font-bold text-sam-dark uppercase tracking-widest border-b-4 border-sam-matcha inline-block pb-2">
          {pageTitle}
        </h3>
      </div>

      {displayData.length === 0 ? (
        <p className="text-center text-gray-500">Đang tải thực đơn từ đám mây...</p>
      ) : (
        <div className={displayData.length === 1 ? "max-w-2xl mx-auto w-full" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          {displayData.map((category, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-bold text-sam-matcha mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sam-gold"></span>
                {category.category}
              </h4>

              {/* DÒNG TIÊU ĐỀ: CỐC | CHAI DÀNH RIÊNG CHO MỤC CAFE */}
              {category.columns && (
                <div className="flex justify-end gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                  <span className="w-12 text-center">{category.columns[0]}</span>
                  <span className="w-12 text-center">{category.columns[1]}</span>
                </div>
              )}

              <div className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between items-start border-b border-dashed border-gray-200 pb-3 last:border-0">

                    {/* Phần tên món ăn */}
                    <div className="flex flex-col gap-1 pr-4 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[16px] text-sam-dark">{item.name}</span>
                        {item.rating === 5 && <span className="text-sam-gold text-sm">★</span>}
                      </div>
                      {item.isHot && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider w-max">Hot</span>}
                    </div>

                    {/* Phần hiển thị Giá (Tự động tách 2 cột nếu có giá Chai) */}
                    {category.columns ? (
                      <div className="flex gap-2 shrink-0">
                        <span className="font-bold text-sam-dark w-12 text-center">{item.price}</span>
                        <span className={`font-bold w-12 text-center ${item.priceBottle !== '-' ? 'text-sam-matcha' : 'text-gray-300'}`}>
                          {item.priceBottle}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sam-dark whitespace-nowrap shrink-0">{item.price}</span>
                    )}

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function Stores() {
  useEffect(() => { document.title = "Cửa Hàng - sammatchalovers"; }, []);
  const [activeStore, setActiveStore] = useState(storesData[0]);

  return (
    <main className="pt-20 flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-[420px] bg-sam-cream overflow-y-auto p-6 md:p-8 border-r border-gray-200 shadow-xl z-10">
        <h2 className="text-3xl font-display font-bold text-sam-dark mb-1">Hệ thống cửa hàng</h2>
        <p className="text-sam-matcha mb-8 italic text-sm">Tìm được {storesData.length} quán</p>
        <div className="space-y-6">
          {storesData.map((store) => (
            <div key={store.id} onClick={() => setActiveStore(store)} className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${activeStore.id === store.id ? 'border-sam-matcha shadow-lg bg-white transform scale-[1.02]' : 'border-transparent bg-white/50 hover:bg-white hover:shadow-md'}`}>
              <h3 className="font-black text-sam-dark text-lg mb-3 tracking-wide">{store.name}</h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{store.address}</p>
              <div className="space-y-2 mb-5">
                <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="text-sm text-gray-600 flex items-center gap-3 hover:text-sam-matcha transition-colors"><span className="text-sam-gold">📞</span> {store.phone}</a>
                <p className="text-sm text-gray-600 flex items-center gap-3"><span className="text-sam-gold">🕒</span> {store.hours}</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">Open</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-gray-200 relative min-h-[50vh] md:min-h-0">
        <iframe src={activeStore.mapUrl} className="absolute inset-0 w-full h-full border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bản đồ"></iframe>
      </div>
    </main>
  );
}

function Space() {
  useEffect(() => { document.title = "Không Gian - sammatchalovers"; }, []);
  const [zoomedImage, setZoomedImage] = useState(null);
  const images = { col1: ["/space-1.jpg", "/space-5.jpg", "/space-2.jpg"], col2: ["/space-3.jpg"], col3: ["/space-7.jpg", "/space-4.jpg", "/space-6.jpg"] };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-display font-black text-sam-dark uppercase tracking-widest border-b-4 border-sam-matcha inline-block pb-2">Không Gian Quán</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="flex flex-col gap-6">
          <img onClick={() => setZoomedImage(images.col1[0])} src={images.col1[0]} alt="SAM Space" className="w-full h-[450px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
          <img onClick={() => setZoomedImage(images.col1[1])} src={images.col1[1]} alt="SAM Space" className="w-full h-[300px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
          <img onClick={() => setZoomedImage(images.col1[2])} src={images.col1[2]} alt="SAM Space" className="w-full h-[380px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-sam-dark text-sam-cream p-10 rounded-3xl shadow-xl flex flex-col justify-center text-center transform hover:-translate-y-2 transition-transform duration-500 border border-gray-700">
             <span className="text-4xl mb-4">✨</span>
             <h4 className="text-2xl font-bold text-sam-matcha mb-4 font-display">Trạm sạc cảm xúc</h4>
             <p className="text-sm md:text-base leading-relaxed opacity-90 italic">Mang tone màu xám đen trầm mặc lẩn khuất dưới ánh đèn vàng ấm áp, SAM mở ra một góc trú ẩn tách biệt hoàn toàn với xô bồ ngoài kia. Dù bạn cần một góc chạy deadline, hay một chốn tâm tình, SAM luôn có một chiếc bàn đợi bạn.</p>
          </div>
          <img onClick={() => setZoomedImage(images.col2[0])} src={images.col2[0]} alt="SAM Space" className="w-full h-[550px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
        <div className="flex flex-col gap-6">
          <img onClick={() => setZoomedImage(images.col3[0])} src={images.col3[0]} alt="SAM Space" className="w-full h-[350px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
          <img onClick={() => setZoomedImage(images.col3[1])} src={images.col3[1]} alt="SAM Space" className="w-full h-[280px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
          <img onClick={() => setZoomedImage(images.col3[2])} src={images.col3[2]} alt="SAM Space" className="w-full h-[400px] object-cover rounded-3xl shadow-md cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </div>
      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out" onClick={() => setZoomedImage(null)}>
          <button className="absolute top-6 right-6 text-white text-4xl font-light hover:text-sam-matcha transition-colors z-[101]">×</button>
          <img src={zoomedImage} alt="Zoomed Space" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]" />
        </div>
      )}
    </main>
  );
}

function Order() {
  useEffect(() => { document.title = "Đặt Hàng - sammatchalovers"; }, []);
  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-display font-bold text-sam-dark uppercase tracking-widest border-b-4 border-sam-matcha inline-block pb-2 mb-4">Liên Hệ Đặt Hàng</h3>
        <p className="text-gray-500 text-lg max-w-xl">Chọn cơ sở gần bạn nhất để thưởng thức hương vị Matcha chuẩn vị giao tận nơi nhé!</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl hover:border-sam-matcha/50 transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-sam-matcha/10 rounded-full flex items-center justify-center mb-4"><span className="text-3xl">🍵</span></div>
          <h4 className="text-2xl font-black text-sam-dark mb-3">SAM Trần Quốc Hoàn</h4>
          <p className="text-sm text-gray-500 mb-8 flex-grow">163 P. Trần Quốc Hoàn, Cầu Giấy</p>
          <a href="https://shopeefood.vn/now-food/shop/1000075926?shareChannel=copy_link&stm_medium=referral&stm_source=https%3A%2F%2Fbeacons.ai%2F-rw&uls_trackid=555v1mmr07g5" target="_blank" rel="noopener noreferrer" className="w-full bg-[#ee4d2d] hover:bg-[#d74325] text-white font-bold py-4 rounded-xl transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-3 uppercase tracking-wide">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center"><span className="text-[#ee4d2d] text-xs font-black">SF</span></div>Đặt trên ShopeeFood
          </a>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl hover:border-sam-matcha/50 transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-sam-matcha/10 rounded-full flex items-center justify-center mb-4"><span className="text-3xl">🍰</span></div>
          <h4 className="text-2xl font-black text-sam-dark mb-3">SAM Văn Quán</h4>
          <p className="text-sm text-gray-500 mb-8 flex-grow">587 Đ. Nguyễn Trãi, P. Văn Quán, Thanh Xuân</p>
          <a href="https://shopeefood.vn/now-food/shop/1277283?shareChannel=copy_link&stm_medium=referral&stm_source=https%3A%2F%2Fbeacons.ai%2F-rw&uls_trackid=555v20sk07g5" target="_blank" rel="noopener noreferrer" className="w-full bg-[#ee4d2d] hover:bg-[#d74325] text-white font-bold py-4 rounded-xl transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-3 uppercase tracking-wide">
             <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center"><span className="text-[#ee4d2d] text-xs font-black">SF</span></div>Đặt trên ShopeeFood
          </a>
        </div>
      </div>
    </main>
  );
}
// ==========================================
// 🛡️ TRANG QUẢN TRỊ ADMIN (PHIÊN BẢN TỐI THƯỢNG - QUẢN LÝ TỪNG MÓN)
// ==========================================
function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminMenu, setAdminMenu] = useState([]);

  // --- STATE CHO BẢNG NHẬP LIỆU (MODAL) ---
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ category: '', items: [] });

  // 1. Đăng nhập & Lấy dữ liệu
  const handleLogin = () => {
    if (password === 'sam123') {
      setIsAuthenticated(true);
      fetchMenuAdmin();
    } else { alert('Sai mật khẩu! Có kẻ xâm nhập!!! 🚨'); }
  };

  const fetchMenuAdmin = () => {
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => setAdminMenu(data))
      .catch(err => console.log(err));
  };

  // 2. Xóa cả 1 Danh mục to
  const handleDelete = async (id, categoryName) => {
    if (!window.confirm(`⚠️ CHÚ Ý: Xóa vĩnh viễn danh mục "${categoryName}" cùng toàn bộ món bên trong?`)) return;
    try {
      await fetch(`http://localhost:5000/api/menu/${id}`, { method: 'DELETE' });
      alert('✅ Đã xóa!');
      fetchMenuAdmin();
    } catch (error) { alert('Lỗi khi xóa!'); }
  };

  // 3. Mở bảng Thêm/Sửa
  const handleOpenAdd = () => {
    setEditId(null);
    setFormData({ category: '', items: [] }); // Khởi tạo mảng items rỗng
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditId(cat._id);
    setFormData(JSON.parse(JSON.stringify(cat))); // Copy sâu dữ liệu cũ ném vào form
    setShowModal(true);
  };

  // 4. CÁC HÀM XỬ LÝ TỪNG MÓN ĂN BÊN TRONG (PHÉP THUẬT NẰM Ở ĐÂY)
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleAddItemInside = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', price: '', priceBottle: '-', isHot: false, rating: 0 }]
    });
  };

  const handleRemoveItemInside = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  // 5. Lưu toàn bộ cục dữ liệu lên mây
  const handleSave = async () => {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:5000/api/menu/${editId}` : 'http://localhost:5000/api/menu';

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('✅ Đã cập nhật lên Đám Mây thành công!');
      setShowModal(false);
      fetchMenuAdmin();
    } catch (error) { alert('Lỗi khi lưu!'); }
  };

  // --- GIAO DIỆN CHƯA ĐĂNG NHẬP ---
  if (!isAuthenticated) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center bg-sam-dark text-white">
        <span className="text-6xl mb-6">🔒</span>
        <h2 className="text-3xl font-bold mb-8 tracking-widest uppercase">Khu Vực Tuyệt Mật</h2>
        <div className="flex gap-2">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật mã..." className="px-4 py-3 rounded-lg text-black outline-none w-64"/>
          <button onClick={handleLogin} className="bg-sam-matcha hover:bg-green-600 px-6 py-3 rounded-lg font-bold">Mở Cửa</button>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH ---
  return (
    <div className="pt-28 max-w-5xl mx-auto min-h-screen px-6 pb-20 relative">
      <div className="flex justify-between items-center border-b-4 border-sam-dark pb-4 mb-8">
        <h2 className="text-3xl font-black text-sam-dark uppercase tracking-widest">🛠️ Trung Tâm Chỉ Huy</h2>
        <button onClick={handleOpenAdd} className="bg-sam-dark text-white px-6 py-2 rounded-full font-bold hover:bg-sam-matcha transition-colors shadow-lg">
          + Thêm Danh Mục Mới
        </button>
      </div>

      {/* DANH SÁCH MENU */}
      <div className="space-y-4">
        {adminMenu.map((cat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl text-sam-matcha uppercase">{cat.category}</h3>
              <p className="text-sm text-gray-500 mt-1">Gồm {cat.items.length} món ăn</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleOpenEdit(cat)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded font-bold hover:bg-gray-200">✎ Quản Lý Món</button>
              <button onClick={() => handleDelete(cat._id, cat.category)} className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold hover:bg-red-500 hover:text-white transition-colors">🗑️ Xóa Mục Này</button>
            </div>
          </div>
        ))}
      </div>

      {/* BẢNG QUẢN LÝ MÓN ĂN (MODAL) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col relative shadow-2xl">

            {/* Header của Bảng */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-2xl font-black text-sam-dark uppercase tracking-wide">
                {editId ? '✎ CHỈNH SỬA DANH MỤC' : '+ TẠO DANH MỤC MỚI'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 font-bold text-2xl">×</button>
            </div>

            {/* Nội dung cuộn được */}
            <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Danh Mục (VD: Trà Trái Cây, Cà Phê...)</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-sam-matcha text-lg font-bold text-sam-dark" />
              </div>

              <div className="flex justify-between items-end border-b pb-2 mb-4">
                <label className="block text-sm font-bold text-gray-700">Danh Sách Món Ăn Bấm ⬇️</label>
                <button onClick={handleAddItemInside} className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                  + Thêm 1 Món Mới
                </button>
              </div>

              {/* Vòng lặp hiển thị từng món ăn */}
              <div className="space-y-4">
                {formData.items.length === 0 && <p className="text-center text-gray-400 italic py-4">Chưa có món nào. Hãy bấm thêm món mới!</p>}

                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-sam-matcha transition-colors">
                    <div className="flex-1">
                      <input type="text" placeholder="Tên món (VD: Matcha Đá Xay)" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="w-full border border-gray-300 rounded md:rounded-lg px-3 py-2 outline-none focus:border-sam-matcha mb-2 text-sam-dark font-semibold" />
                      <div className="flex gap-2">
                         <input type="text" placeholder="Giá Cốc (VD: 45K)" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} className="w-1/2 border border-gray-300 rounded px-3 py-1.5 outline-none text-sm" />
                         <input type="text" placeholder="Giá Chai (Nhập - nếu ko có)" value={item.priceBottle || '-'} onChange={(e) => handleItemChange(index, 'priceBottle', e.target.value)} className="w-1/2 border border-gray-300 rounded px-3 py-1.5 outline-none text-sm" />
                      </div>
                    </div>

                    <button onClick={() => handleRemoveItemInside(index)} className="bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 p-3 rounded-lg transition-colors" title="Xóa món này">
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer của Bảng (Các nút lưu) */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-200 transition-colors">Hủy bỏ</button>
              <button onClick={handleSave} className="bg-sam-matcha text-white px-8 py-3 rounded-lg font-black tracking-widest hover:bg-green-600 shadow-md transform hover:-translate-y-1 transition-all">
                💾 LƯU LÊN MÂY
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
// --- GIAO DIỆN TỔNG (KHUNG XƯƠNG) ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // --- BẮT ĐẦU ĐOẠN CODE THÊM MỚI ---
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(response => response.json())
      .then(data => {
        setMenuData(data);
      })
      .catch(error => console.log("Lỗi hút Menu:", error));
  }, []);
  // --- KẾT THÚC ĐOẠN CODE THÊM MỚI ---

  const getLinkClass = (path) => {
    const isActive = path === '/menu' ? location.pathname.startsWith('/menu') : location.pathname === path;
    return `font-bold tracking-widest uppercase text-sm transition-colors duration-300 ${
      isActive ? 'text-sam-matcha' : 'text-gray-300 hover:text-sam-matcha'
    }`;
  };

  const isStoresPage = location.pathname === '/stores';

  return (
    <div className="min-h-screen flex flex-col bg-sam-cream text-sam-dark font-sans selection:bg-sam-matcha selection:text-white">

      {/* HEADER CỐ ĐỊNH */}
      <header className="fixed w-full z-50 bg-sam-dark/95 backdrop-blur-sm text-white border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col justify-center cursor-pointer hover:opacity-80 transition-opacity">
            <h1 className="font-display font-black text-3xl tracking-tighter text-white leading-none">Sam</h1>
            <span className="font-bold text-sam-gold italic text-xs tracking-widest">matchalovers</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 h-full">
            <div className="relative group h-full flex items-center">
              <Link to="/menu" className={getLinkClass('/menu')}>Thực Đơn</Link>
              <div className="absolute top-full left-0 w-56 bg-white rounded-b-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden border border-gray-100 translate-y-2 group-hover:translate-y-0 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <Link to="/menu" className="block px-5 py-3 text-sm font-bold text-sam-dark hover:text-sam-matcha hover:bg-green-50 transition-colors">
                  TẤT CẢ ĐỒ UỐNG
                </Link>
                {menuData.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={`/menu/${createSlug(cat.category)}`}
                    className="block px-5 py-3 text-sm font-bold text-gray-500 hover:text-sam-matcha hover:bg-green-50 transition-colors border-t border-gray-50"
                  >
                    {cat.category}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/stores" className={getLinkClass('/stores')}>Cửa Hàng</Link>
            <Link to="/space" className={getLinkClass('/space')}>Không Gian</Link>
            <Link to="/order" className={getLinkClass('/order')}>Đặt Hàng</Link>
          </nav>

          <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
             </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-sam-dark border-t border-gray-700 absolute w-full left-0 shadow-xl max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/menu')}>Thực Đơn</Link>
              <div className="flex flex-col pl-4 space-y-3 border-l border-gray-700">
                {menuData.map((cat, idx) => (
                  <Link key={idx} to={`/menu/${createSlug(cat.category)}`} onClick={() => setIsMobileMenuOpen(false)} className="text-left font-bold text-xs text-gray-400 hover:text-sam-matcha uppercase">
                    - {cat.category}
                  </Link>
                ))}
              </div>
              <Link to="/stores" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/stores')}>Cửa Hàng</Link>
              <Link to="/space" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/space')}>Không Gian</Link>
              <Link to="/order" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/order')}>Đặt Hàng</Link>
            </nav>
          </div>
        )}
      </header>

      {/* VÙNG CHỨA NỘI DUNG */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ĐÃ NỐI DÂY DỮ LIỆU Ở ĐÂY 👇 */}
          <Route path="/menu" element={<Menu menuData={menuData} />} />
          <Route path="/menu/:categorySlug" element={<Menu menuData={menuData} />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/space" element={<Space />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin-control" element={<Admin />} />
        </Routes>
      </div>

      {/* FOOTER */}
      {!isStoresPage && (
        <footer className="bg-sam-dark text-gray-300 py-16 mt-auto">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <h1 className="font-display font-black text-4xl text-white mb-1">Sam</h1>
              <p className="text-sam-gold font-bold italic mb-6">matchalovers</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-gray-700 pb-2">Vị Trí & Giờ Mở Cửa</h4>
              <p className="mb-3">📍 587 Đ. Nguyễn Trãi, P. Văn Quán<br/>Thanh Xuân, Hà Nội</p>
              <p className="mb-4">🕒 08:00 - 23:00</p>
              <p className="text-sm text-sam-matcha font-bold bg-sam-matcha/10 px-4 py-2 rounded-full inline-block">✓ Ăn tại chỗ · ✓ Mang đi</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
               <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-gray-700 pb-2 w-full text-center md:text-left">Liên Hệ</h4>
               <a href="tel:0373276088" className="flex items-center gap-3 text-xl font-black text-sam-matcha hover:text-white transition-colors mb-6 drop-shadow-md cursor-pointer"><span className="text-2xl animate-pulse">📞</span> 037 327 6088</a>
               <div className="flex gap-4">
                  <a href="https://www.facebook.com/sam.matchalovers/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] hover:scale-110 transition-all duration-300 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></a>
                  <a href="https://www.instagram.com/sam_matchalovers" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:scale-110 transition-all duration-300 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
                  <a href="https://www.tiktok.com/@sam_matchalovers" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all duration-300 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg></a>
                  <a href="https://www.threads.com/@sam_matchalovers" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-86.6 52.3-146.7 44.8c-28.7-3.6-56.1-13.8-79.9-28.9c-24-15.2-43-35.3-54.6-58.4c-12-23.7-18.4-51.4-18.4-80.1c0-43.1 12.8-82.6 35.3-112.5c23-30.6 55.4-49.4 92.2-53.5c1.4-.2 2.8-.2 4.3-.3c18.5 0 36.2 4.1 51.5 11.5c17.5 8.5 32 21.6 42.1 38.3c7.5 12.3 11.9 26 12.9 40.5c.3 3.8 .3 7.8 .1 11.6c-1.3 22-11.4 41.2-27.4 55c-15.5 13.4-35.9 20.6-56.6 20.6c-20 0-38.6-6.6-53.5-19.1c-13.9-11.6-21.7-27.7-21.7-44.5c0-11.9 4.4-23.8 12.8-34.6c8.5-11 20-19.8 33-25.5c2.3-1 4.9-1.9 7.4-2.6c1-.3 2.1-.5 3.1-.7c6-1.3 12.5-1.5 19.3-1c3 .2 6 .6 9.1 1.2c-1.6 11.1-1.3 22.1 2.2 32.7c3.9 12 11.2 22.1 20.9 29.5c8.9 6.9 20 10.6 31.9 10.6c13.7 0 26.5-5 36.1-13.3c8.9-7.8 13.8-19.3 14.2-31.5c.3-8.8-1.5-17.5-5.5-25.7c-5.7-11.7-15-20.7-26.6-26.2c-11.3-5.3-24.3-8.1-37.8-8.1c-1.3 0-2.6 0-3.9 .1c-29.6 3.4-55.9 18.9-74.8 44.1c-18.9 25.1-29.8 58.7-29.8 95.6c0 24.3 5.4 47.9 15.6 68.2c9.8 19.5 25.8 36.5 46.1 49.3c19.9 12.6 43 21.1 66.8 24.1c50 6.2 92.4-7.1 122.4-37c40-40 37.1-90.1 24-120.4c-8.9-20.6-25.6-37.4-49.1-48.8c-1.7-.8-3.4-1.6-5.1-2.4l-6.3-2.8zm-113.6-118.8c-28.7 0-56 6-80 16.5c-24.5 10.7-46 25.6-62.7 42.9C58.3 193.8 43.6 213.9 31.9 236c-.4 .8-.8 1.6-1.2 2.3c-28.2 55.4-30.8 116.3-30.8 119.6c0 5 .8 10 2.5 14.8c4 11.4 15.4 19.1 27.6 19.1c3.8 0 7.6-.8 11.1-2.4c14.2-6.5 20.4-23.3 13.9-37.5c-4-9.4-7.5-19.4-9.6-30c-5.6-28.6-3.8-59.5 5.5-88.7c8.5-26.7 22.8-51.5 41.5-72.2c16.6-18.4 36.5-33.8 57.7-44.6c20.3-10.4 42.9-16.7 65.5-18.3c21-.8 42.1 .6 61.9 5.8c18.5 4.8 35.6 12.9 50.3 23.3c13.4 9.5 24.9 21.5 33.7 34.6c9.7 14.3 16.4 30.5 19.4 47.1c.3 1.9 .6 3.9 .8 5.8c3.2 23 1.5 46.9-5.1 68.3c-6.1 20-15.6 38.6-27.4 54c-12.8 16.6-28.1 30.3-44.1 39.8c-16 9.5-33.3 15.6-49.9 17.6c-4.4 .5-8.8 .8-13.3 .8c-21.2 0-41.2-5.9-58.4-16.5c-15.1-9.4-27.5-21.9-36.4-36.3c-9.2-15-14.7-32.5-15.8-50.6c-.2-3.1 .1-6.2 .6-9.3c2-12.3 8.3-23.7 18-32.3c9.3-8.3 21-13.4 33-14.7c1.7-.2 3.4-.3 5.1-.3c18.6 0 36.5 7.1 50.3 20.1c11.9 11.3 19 26.5 20.5 42.6c1.1 12-2.1 24-8.8 34.1c-6.2 9.4-14.7 16.7-24.5 21.1c-10 4.5-21 5.9-31.9 4.3c-6.8-1-13.5-3.5-19.5-7.3c-5.2-3.3-9.8-7.5-13.7-12.2c-4-4.8-7.2-10-9.6-15.4c-9.2 21.5-10.4 44.9-3.4 66.8c6 18.7 16 35.3 28.8 48.5c11.6 11.9 25.5 21.6 40.5 28.2c16 7 33.7 11 51.5 11.4c2.5 .1 5.1 .1 7.6 .1c20.5 0 41.1-3.6 60.1-10.8c18-6.8 34.5-16.5 48.7-28.2c15.1-12.4 27.8-27.6 37-44.1c10.3-18.4 17.5-38.6 20.7-59.5c.3-2 .5-4 .7-6.1c3.1-23.4 1.4-48-5.1-70.8c-6.1-21.2-15.8-41-27.9-57.9c-12.8-18.1-28.4-33.5-45.3-45c-17.6-12-37.5-20.9-58.2-25.8c-22.3-5.2-45.7-6.5-68.5-5.2z"/></svg></a>
               </div>
               <p className="mt-6 text-sm italic opacity-70">Follow Sam để nhận ưu đãi nhé!</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}