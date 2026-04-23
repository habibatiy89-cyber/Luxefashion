/* PRODUCT DATA */
const products = [
  {id:1,name:"Classic Watch",price:120},
  {id:2,name:"Leather Bag",price:90},
  {id:3,name:"Sneakers",price:150}
];

/* CART STATE MANAGEMENT */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* STORAGE HANDLER */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* PRODUCT RENDERING ENGINE */
function renderProducts(){
  const grid = document.getElementById("products");
 grid.innerHTML = products.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <button onclick="addToCart(${p.id})">Add</button>
    </div>
  `).join("");
}

/* CART LOGIC - ADD ITEMS */
function addToCart(id){
  const item = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);

  if(existing){
    existing.qty++;
  } else {
    cart.push({...item, qty:1});
  }

  saveCart();
  updateCart();
}
/* CART UI UPDATE SYSTEM */
function updateCart(){
  document.getElementById("cartCount").textContent = 
    cart.reduce((a,b)=>a+b.qty,0);

  document.getElementById("cartTotal").textContent = 
    cart.reduce((a,b)=>a+b.price*b.qty,0);

  document.getElementById("cartItems").innerHTML = cart.map(i=>`
    <p>${i.name} x ${i.qty}</p>
  `).join("");
}

/* CHECKOUT FLOW */
function checkout(){
  cart = [];
  saveCart();
  updateCart();
  alert("Order placed successfully");
}
/* CART TOGGLE INTERACTION */
function toggleCart(){
  const cartEl = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  const isOpen = cartEl.style.display === "block";

  cartEl.style.display = isOpen ? "none" : "block";
  overlay.style.display = isOpen ? "none" : "block";
}

/* EVENT BINDING */
document.getElementById("cartBtn").onclick = toggleCart;
document.getElementById("shopBtn").onclick = () => 
  document.getElementById("products").scrollIntoView({behavior:"smooth"});

/* INITIAL RENDER */
renderProducts();
updateCart();