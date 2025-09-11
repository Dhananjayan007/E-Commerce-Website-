const products = [
  { id: 1, name: "Samsung S24 Ultra", price: 79999, category: "electronics", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQpt0DwfqtMuYFw8BIdeEYNkhtpx43k_eqL2RpOjX3uEAz3zeXdHxnkrZbWjfovzl2VsJGVq-ZnDCA-VGvgF6GFLJe-VuDXoCiTP4ahEF-RbzDshzGrxlHsLw", desc: "6.8-inch Dynamic AMOLED display, Snapdragon 8 Gen 3, 200MP camera." },
  { id: 2, name: "iPhone 15 Pro", price: 134900, category: "electronics", img: "https://i.ytimg.com/vi/CREM-mFuyyo/hq720.jpg", desc: "Titanium build, A17 Pro chip, 48MP camera, iOS 17." },
  { id: 3, name: "Acer Laptop", price: 75999, category: "electronics", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSYN907BZUH0Z5yYM0z3Jxm0jgCIst3vBF39AtJzmzkt5yIhurHD-j21JhZpPV9kIpqyaYOiFa_gQ7cWtW29Ezymdliq8Rr505vkMSV8g4ufw6xVYfb9SX-", desc: "Intel i7, 16GB RAM, 512GB SSD, NVIDIA RTX graphics." },
  { id: 4, name: "T-Shirt", price: 400, category: "clothing", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLnStfkiPTTYurLWWKbHwARYpnIlZ1xGuL2eZDeEuoim1tTSoYVKy1KpM1Inj2g0Sy_T5UyQFHR4zVMYTx7dtNrrQz9Q7tzrzirRjZN4aX1TLNHxAhW5p7", desc: "Cotton casual T-shirt, available in multiple colors." },
  { id: 5, name: "Jeans", price: 500, category: "clothing", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRfHHIpvLEXag8rxgmgytAKImMIteyR5ALfjoDU6c3uWwpiwnTKFJA1Go80BdhxEz5_UH3Ovbls95l3k6HdD--5TinOSjZByVsK_tCtvUce", desc: "Slim-fit denim jeans, dark blue, stretchable fabric." },
  { id: 6, name: "Harry Potter Book", price: 1500, category: "books", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSTfG7Un5KacsnNPR3kXknhD8UUasN4BIBv_6CL_xgr-jLk2oa3EwvCOfC8nJ3mNmUTzQm_qXt-I6Lkt3G2RUhYKX7Y2IxgHhqeoFBkqfuK-L1LjG555gY0_Ow", desc: "Harry Potter and the Philosopher’s Stone, fantasy novel." },
  { id: 7, name: "Cooking Pan", price: 1000, category: "kitchen items", img: "https://www.theindusvalley.in/cdn/shop/files/27.jpg?v=1730730102&width=493", desc: "Non-stick cooking pan, durable and easy to clean." },
  { id: 8, name: "car toy", price: 100, category: "toys", img:"https://www.funcorp.in/cdn/shop/files/HOTWHEELS_HW_EV_CUPRA_E-RACER_GREY.jpg?v=1750928862", desc: "Fun car toy for kids." },
];

let cart = [];
let currentCategory = "all";
let currentSearch = "";

function displayProducts(category = "all") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  currentCategory = category;

  // Filter by category first
  let filtered = category === "all" ? products : products.filter(p => p.category === category);

  // Further filter by search term if present
  if (currentSearch.trim() !== "") {
    const searchLower = currentSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.desc.toLowerCase().includes(searchLower)
    );
  }

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p><strong>₹${p.price}</strong></p>
      <p class="desc">${p.desc}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function filterProducts(category) {
  displayProducts(category);
}

function searchProducts() {
  const query = document.getElementById("search-input").value;
  currentSearch = query;
  displayProducts(currentCategory);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  alert(product.name + " added to cart!");
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">X</button>`;
    cartItems.appendChild(div);
  });

  totalEl.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const cartEl = document.getElementById("cart");
  cartEl.style.display = cartEl.style.display === "block" ? "none" : "block";
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
  } else {
    alert("✅ Checkout successful! (Simulation Only)");
    cart = [];
    updateCart();
    toggleCart();
  }
}

// Initial display
displayProducts();
