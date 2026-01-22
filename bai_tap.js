// --- Câu 1: Khai báo constructor function Product ---
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// --- Câu 2: Khởi tạo mảng products (ít nhất 5 sp, 2 danh mục) ---
const products = [
    new Product(1, "Laptop Dell", 1200, 10, "Electronics", true),
    new Product(2, "Mouse Logitech", 25, 50, "Accessories", true),
    new Product(3, "Keyboard Keychron", 80, 0, "Accessories", false), // Hết hàng, không bán
    new Product(4, "Monitor LG", 300, 5, "Electronics", true),
    new Product(5, "USB Hub", 15, 100, "Accessories", true)
];

console.log("--- Câu 2: Danh sách sản phẩm khởi tạo ---");
console.log(products);


// --- Câu 3: Tạo mảng mới chỉ chứa name, price ---
// Sử dụng .map() để biến đổi mảng
const namePriceList = products.map(product => {
    return { name: product.name, price: product.price };
});
console.log("\n--- Câu 3: Mảng chỉ chứa name và price ---");
console.log(namePriceList);


// --- Câu 4: Lọc các sản phẩm còn hàng (quantity > 0) ---
// Sử dụng .filter()
const availableProducts = products.filter(product => product.quantity > 0);
console.log("\n--- Câu 4: Các sản phẩm còn hàng (quantity > 0) ---");
console.log(availableProducts);


// --- Câu 5: Kiểm tra có ít nhất 1 sản phẩm giá trên 30 ---
// Sử dụng .some() - trả về true nếu có ít nhất 1 phần tử thỏa mãn
const hasExpensiveProduct = products.some(product => product.price > 30);
console.log("\n--- Câu 5: Có sản phẩm giá trên 30 không? ---");
console.log(hasExpensiveProduct); // Kết quả: true


// --- Câu 6: Kiểm tra tất cả sp danh mục 'Accessories' có đang bán (isAvailable = true) ---
// Bước 1: Lấy ra các sp Accessories
// Bước 2: Dùng .every() để kiểm tra tất cả phải true
const accessories = products.filter(p => p.category === "Accessories");
const allAccessoriesAvailable = accessories.every(p => p.isAvailable === true);

console.log("\n--- Câu 6: Tất cả Accessories đều đang bán? ---");
console.log(allAccessoriesAvailable); 
// Kết quả: false (vì có Keyboard Keychron đang false)


// --- Câu 7: Tính tổng giá trị kho hàng (price * quantity) ---
// Sử dụng .reduce()
const totalStockValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
}, 0);

console.log("\n--- Câu 7: Tổng giá trị kho hàng ---");
console.log(totalStockValue);


// --- Câu 8: Dùng for...of duyệt mảng và in thông tin ---
console.log("\n--- Câu 8: Duyệt mảng bằng for...of ---");
for (const product of products) {
    // Sử dụng Template String (backticks) để in đẹp hơn
    console.log(`Tên: ${product.name} - Danh mục: ${product.category} - Trạng thái: ${product.isAvailable}`);
}


// --- Câu 9: Dùng for...in để in thuộc tính và giá trị ---
// for...in dùng để duyệt qua các KEY của OBJECT
console.log("\n--- Câu 9: Duyệt thuộc tính bằng for...in (Ví dụ với sản phẩm đầu tiên) ---");
const firstProduct = products[0];

for (const key in firstProduct) {
    console.log(`Thuộc tính: ${key} - Giá trị: ${firstProduct[key]}`);
}


// --- Câu 10: Lấy danh sách TÊN các sp ĐANG BÁN và CÒN HÀNG ---
// Kết hợp filter (lọc điều kiện) và map (chỉ lấy tên)
const namesSellingInStock = products
    .filter(p => p.isAvailable === true && p.quantity > 0)
    .map(p => p.name);

console.log("\n--- Câu 10: Tên SP đang bán và còn hàng ---");
console.log(namesSellingInStock);