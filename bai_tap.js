const http = require('http');

// --- PHẦN 1: LOGIC XỬ LÝ DỮ LIỆU ---
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

const products = [
    new Product(1, "Laptop Dell", 1200, 10, "Electronics", true),
    new Product(2, "Mouse Logitech", 25, 50, "Accessories", true),
    new Product(3, "Keyboard Keychron", 80, 0, "Accessories", false),
    new Product(4, "Monitor LG", 300, 5, "Electronics", true),
    new Product(5, "USB Hub", 15, 100, "Accessories", true)
];

const q3_namePrice = products.map(p => ({ name: p.name, price: p.price }));
const q4_available = products.filter(p => p.quantity > 0);
const q5_expensive = products.some(p => p.price > 30);
const q6_accessories = products.filter(p => p.category === "Accessories").every(p => p.isAvailable);
const q7_total = products.reduce((total, p) => total + (p.price * p.quantity), 0);
const q10_selling = products.filter(p => p.isAvailable && p.quantity > 0).map(p => p.name);

// --- PHẦN 2: TẠO GIAO DIỆN HTML HIỆN ĐẠI ---
function createTable(data, title, id) {
    if (data.length === 0) return `<p class="no-data">Không có dữ liệu</p>`;
    
    const keys = Object.keys(data[0]); 
    
    let tableHtml = `
        <div class="card fade-in" id="${id}">
            <div class="card-header">
                <h3>${title}</h3>
                <span class="badge">${data.length} items</span>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>${keys.map(k => `<th>${k.toUpperCase()}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${data.map((item, idx) => `
                            <tr class="table-row" style="animation-delay: ${idx * 0.05}s">
                                ${keys.map(k => `<td>${item[k]}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    return tableHtml;
}

const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management System - Phan Manh Tan</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
            animation: slideDown 0.6s ease;
        }
        
        .header h1 {
            font-size: 2.5em;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            animation: fadeIn 0.6s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.2);
        }
        
        .stat-card .icon {
            font-size: 2em;
            margin-bottom: 10px;
        }
        
        .stat-card .value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
            margin: 10px 0;
        }
        
        .stat-card .label {
            color: #666;
            font-size: 0.9em;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 25px;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        
        .card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .card-header h3 {
            font-size: 1.3em;
            font-weight: 600;
        }
        
        .badge {
            background: rgba(255,255,255,0.2);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
        }
        
        .table-container {
            overflow-x: auto;
            padding: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background: #f8f9fa;
            color: #495057;
            font-weight: 600;
            padding: 15px;
            text-align: left;
            border-bottom: 2px solid #dee2e6;
        }
        
        td {
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .table-row {
            transition: background-color 0.3s ease;
            opacity: 0;
            animation: fadeInRow 0.5s ease forwards;
        }
        
        .table-row:hover {
            background-color: #f8f9ff;
        }
        
        .result-box {
            display: inline-block;
            padding: 8px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 25px;
            font-weight: 600;
            margin-left: 10px;
            animation: pulse 2s ease infinite;
        }
        
        .info-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .info-card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
        
        .info-card p {
            line-height: 1.8;
            margin-bottom: 12px;
            font-size: 1.05em;
        }
        
        .info-card ul {
            list-style: none;
            padding: 0;
        }
        
        .info-card li {
            padding: 12px;
            margin: 8px 0;
            background: #f8f9ff;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            transition: transform 0.3s ease;
        }
        
        .info-card li:hover {
            transform: translateX(5px);
            background: #e8ebff;
        }
        
        .product-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .product-tag {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 500;
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        
        .product-tag:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRow {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease;
        }
        
        @media (max-width: 768px) {
            .header h1 { font-size: 1.8em; }
            .stats-grid { grid-template-columns: 1fr; }
            table { font-size: 0.9em; }
            th, td { padding: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📦 PRODUCT MANAGEMENT SYSTEM</h1>
            <p>Sinh viên: 2280602871 - Phan Mạnh Tân</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card" onclick="scrollToSection('all-products')">
                <div class="icon">📦</div>
                <div class="value">${products.length}</div>
                <div class="label">Tổng sản phẩm</div>
            </div>
            
            <div class="stat-card" onclick="scrollToSection('available-products')">
                <div class="icon">✅</div>
                <div class="value">${q4_available.length}</div>
                <div class="label">Còn hàng</div>
            </div>
            
            <div class="stat-card" onclick="scrollToSection('total-value')">
                <div class="icon">💰</div>
                <div class="value">$${q7_total.toLocaleString()}</div>
                <div class="label">Giá trị kho</div>
            </div>
        </div>

        ${createTable(products, "📋 Câu 2: Danh sách tất cả sản phẩm", "all-products")}

        ${createTable(q3_namePrice, "🏷️ Câu 3: Tên và Giá sản phẩm", "name-price")}

        ${createTable(q4_available, "✅ Câu 4: Sản phẩm còn hàng (Quantity > 0)", "available-products")}

        <div class="info-card fade-in" id="total-value">
            <h3>📊 Kết quả phân tích</h3>
            <p><strong>Câu 5:</strong> Có sản phẩm giá trên $30? 
                <span class="result-box">${q5_expensive ? '✅ CÓ' : '❌ KHÔNG'}</span>
            </p>
            <p><strong>Câu 6:</strong> Tất cả phụ kiện đều đang bán? 
                <span class="result-box">${q6_accessories ? '✅ CÓ' : '❌ KHÔNG'}</span>
            </p>
            <p><strong>Câu 7:</strong> Tổng giá trị kho hàng: 
                <span class="result-box">$${q7_total.toLocaleString()}</span>
            </p>
        </div>

        <div class="info-card fade-in">
            <h3>📑 Câu 8: Danh sách chi tiết (For...of)</h3>
            <ul>
                ${products.map(p => `
                    <li>
                        <strong>${p.name}</strong> - ${p.category} - 
                        ${p.isAvailable ? '🟢 Đang bán' : '🔴 Dừng bán'}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="info-card fade-in">
            <h3>🛒 Câu 10: Sản phẩm đang bán và còn hàng</h3>
            <div class="product-list">
                ${q10_selling.map(name => `<span class="product-tag">${name}</span>`).join('')}
            </div>
        </div>
    </div>

    <script>
        // Smooth scroll khi click vào stat card
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }

        // Thêm hiệu ứng khi scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .info-card').forEach(card => {
            observer.observe(card);
        });

        // Log thông tin khi trang load
        console.log('%c🎉 Product Management System Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;');
        console.log('Total Products:', ${products.length});
        console.log('Total Value: $${q7_total.toLocaleString()}');
    </script>
</body>
</html>
`;

// --- PHẦN 3: KHỞI TẠO SERVER ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
});

server.listen(3000, () => {
    console.log('🚀 Server đang chạy!');
    console.log('🌐 Bấm Ctrl + Click vào link: http://localhost:3000');
    console.log('📊 Tổng sản phẩm:', products.length);
    console.log('💰 Giá trị kho: $' + q7_total.toLocaleString());
});
