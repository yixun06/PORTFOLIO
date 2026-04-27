window.cart = JSON.parse(localStorage.getItem("cart")) || {};

window.products = [
  { id: 1, name: "Reusable Bamboo Toothbrush", price: 4.99, image: "pic/toothbrush.jpg", description: "Eco-friendly toothbrush" },
  { id: 2, name: "Reusable Shopping Bags", price: 8.99, image: "pic/reusableBegjpg.jpg", description: "Set of 3 bags" },
  { id: 3, name: "Air Purifier (HEPA Filter) ", price: 135.00, image: "pic/air purifier.png", description: "Removes pollutants, energy-efficient." },
  { id: 4, name: "Organic Cotton Tote Bag", price: 9.99, image: "pic/Organic Cotton Tote Bag.jpeg", description: "Durable tote bag" },
  { id: 5, name: "Compostable Phone Case", price: 14.99, image: "pic/Compostable Phone Case.webp", description: "Compostable case" },
  { id: 6, name: "Stainless Steel Straw Set", price: 6.99, image: "pic/Stainless Steel Straw Set.jpg", description: "Reusable straws" },
  { id: 7, name: "Eco-Friendly Notebook", price: 12.49, image: "pic/Eco-Friendly Notebook.jpeg", description: "Recycled paper" },
  { id: 8, name: "Solar-Powered Portable Charger", price: 49.99, image: "pic/charger.webp", description: "The portable battery pack is waterproof, shock-proof and has enough juice to power up an iPhone 14 more than twice" },
  { id: 9, name: "Organic Latex Pillow/Mattress", price: 189.00, image: "pic/Organic Latex Pillow Mattress.webp", description: "Hypoallergenic, eco-friendly materials." },


];

// add to cart
function addToCart(productId) {
  console.log('Adding product:', productId);
  productId = parseInt(productId);
  window.cart[productId] = (window.cart[productId] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(window.cart));

  updateCartIcon();
  updateAllQuantityDisplays();
}

// adjust quantity
function changeQty(id, diff) {
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === true){
    id = parseInt(id);
    let newQty = Math.max(0, (window.cart[id] || 0) + diff);
    if (newQty === 0) {
      delete window.cart[id];
    } else {
      window.cart[id] = newQty;
    }
    localStorage.setItem("cart", JSON.stringify(window.cart));
    updateCartIcon();
    updateAllQuantityDisplays();
  }
}

// update all quantity displays
function updateAllQuantityDisplays() {
  window.products.forEach(product => {
    const qtySpan = document.getElementById(`qty-${product.id}`);
    if (qtySpan) {
      qtySpan.textContent = window.cart[product.id] || 0;
    }
  });
}

// update cart icon
function updateCartIcon() {
  const totalItems = Object.values(window.cart).reduce((sum, qty) => sum + qty, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// show products based on filter
function showProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = window.products.filter(p => {
    if (filter === "under10") return p.price < 10;
    if (filter === "10to100") return p.price >= 10 && p.price <= 100;
    if (filter === "above100") return p.price > 100;
    return true;
  });

  filtered.forEach(p => {
    const currentQty = window.cart[p.id] || 0;
    const card = document.createElement("div");
    card.className = "product-card";
    card.id = `product${p.id}`;
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <p class="price">RM${p.price.toFixed(2)}</p>
      <div class="qty-control">
        <form class="product-form" id="productForm${p.id}" action="addToCart.php" method="POST">
          <input type="hidden" name="product-id" value="${p.id}">  
          <input type="hidden" name="img-id" value="product${p.id}">
          <input type="hidden" name="current-page" value="shop">
          <input type="hidden" name="product-name" value="${p.name}">
          <input type="hidden" name="product-price" value=${p.price.toFixed(2)}>
          <input type="hidden" name="product-img" value="${p.image}">

          <div class="userId"></div>
          <div id="quantityProduct${p.id}"></div>

          <button type="submit" onclick="setPreviousPlace('product${p.id}'); changeQty(${p.id}, -1); addQuantity('${p.id}', 'shop')">-</button>
          <span id="qty-${p.id}">${currentQty}</span>
          <button type="submit" onclick="setPreviousPlace('product${p.id}'); changeQty(${p.id}, 1); addQuantity('${p.id}', 'shop')">+</button>
        </form>    
      </div>
    `;
    grid.appendChild(card);
  });

  updateAllQuantityDisplays();
}

// show cart modal
function updateCartModal() {
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === true){
    const modal = document.getElementById("cart-modal");
    const itemsDiv = document.getElementById("cart-modal-items");
    const totalDiv = document.getElementById("cart-modal-total");

    if (!modal || !itemsDiv || !totalDiv) return;

    itemsDiv.innerHTML = "";
    let total = 0;

    Object.entries(window.cart).forEach(([id, qty]) => {
      const product = window.products.find(p => p.id === parseInt(id));
      if (product && qty > 0) {
        const item = document.createElement("div");
        item.textContent = `${product.name} x${qty} - RM${(product.price * qty).toFixed(2)}`;
        itemsDiv.appendChild(item);
        total += product.price * qty;
      }
    });

    totalDiv.textContent = `Total: RM${total.toFixed(2)}`;
    modal.style.display = "block";
  }
}

function openCart() {
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === false){
    alert("Please login to view the cart");
  }

  updateCartModal();
}

function closeCart() {
  const modal = document.getElementById("cart-modal");
  if (modal) modal.style.display = "none";
}

function openPaymentMethod(){
  const modal = document.getElementById("payment-method");
  if(modal) modal.style.display = "block";
}

function closePaymentMethod(){
  const modal = document.getElementById("payment-method");
  if(modal) modal.style.display = "none";
}

function clearAll() {
  window.cart = {};
  localStorage.setItem("cart", JSON.stringify(window.cart));
  updateCartIcon();
  updateAllQuantityDisplays();
  updateCartModal();

  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === true){
    alert("Your cart has been clear! Continue enjoying your shooping journey");
  }
}

function checkout() {
  const count = Object.values(window.cart).reduce((a, b) => a + b, 0);
  if (count === 0) {
    alert("Cart is empty!");
    return;
  }

  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus == null){
    alert("Please login to continue checkout.");
    window.location.href = "login.html";
  }
  else{
    if(loginStatus === false){
      alert("Please login to continue checkout.");
      window.location.href = "login.html";
    }
    else{
      openPaymentMethod();
    }
  }
}

// initialize cart on page load
function initializeCart() {
  if (window.cartInitialized) {
    updateCartIcon();
    updateAllQuantityDisplays();
    return;
  }

  updateCartIcon();

  // Cart icon click event
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon && !cartIcon.hasAttribute("data-cart-bound")) {
    cartIcon.addEventListener("click", openCart);
    cartIcon.setAttribute("data-cart-bound", "true");
  }

  const closeBtn = document.getElementById("close-cart-modal");
  if (closeBtn && !closeBtn.hasAttribute("data-cart-bound")) {
    closeBtn.addEventListener("click", closeCart);
    closeBtn.setAttribute("data-cart-bound", "true");
  }

  // Filter
  const filter = document.getElementById("priceFilter");
  if (filter && !filter.hasAttribute("data-cart-bound")) {
    filter.addEventListener("change", e => showProducts(e.target.value));
    filter.setAttribute("data-cart-bound", "true");
  }

  // Show products on page load
  if (document.getElementById("productGrid")) {
    showProducts();
  }


  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  addToCartBtns.forEach(btn => {

    const productId = btn.getAttribute("data-product-id");
    if (productId && !btn.hasAttribute("data-cart-bound")) {
      btn.addEventListener("click", e => {
        let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
        
        if(loginStatus === true){
          // e.preventDefault();
          // addToCart(productId);
        }
      });
      btn.setAttribute("data-cart-bound", "true");
    }
  });

  window.cartInitialized = true;
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCart);
} else {
  initializeCart();
}

window.addEventListener("load", () => {
  if (!window.cartInitialized) {
    initializeCart();
  }
});


function hideOrShowLogoutButtonShop(){
  let navigationLinksShop = document.querySelector("#nav-links-container-shop");
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === true){
    navigationLinksShop.innerHTML = 
      `<ul class="nav-links">
        <li><a href="main page.html" onclick="logout()">Logout</a></li>
        <li><a href="main page.html">Home</a></li>
        <li><a href="shop.html" class="active">Shop</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="register.html">Register</a></li>
      </ul>`;
  }
  else if(loginStatus === false){
    navigationLinksShop.innerHTML = 
      `<ul class="nav-links">
        <li><a href="main page.html">Home</a></li>
        <li><a href="shop.html" class="active">Shop</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="register.html">Register</a></li>
      </ul>`;
  }
}


function hideOrShowLogoutButtonMain(){
  let navigationLinksMain = document.querySelector("#nav-links-container-main");
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === true){
      navigationLinksMain.innerHTML = 
      `<ul class="nav-links">
        <li><a href="main page.html" onclick="logout()">Logout</a></li>
        <li><a href="main page.html" class="active">Home</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="register.html">Register</a></li>
      </ul>`;
  }
  else if(loginStatus === false){
      navigationLinksMain.innerHTML = 
        `<ul class="nav-links">
          <li><a href="main page.html" class="active">Home</a></li>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="login.html">Login</a></li>
          <li><a href="register.html">Register</a></li>
        </ul>`;
  }
}


function logout(){
  localStorage.setItem("loginStatus", "false");
  localStorage.removeItem("userId");
}


//payment method selection
function tick(id){
  let paymentMethodSelectionButton;
  let allPaymentMethodSelectionButton = document.querySelectorAll(".hidden-checkbox");

  for(let i = 0; i < allPaymentMethodSelectionButton.length; i++){
    allPaymentMethodSelectionButton[i].checked = false;
    allPaymentMethodSelectionButton[i].style.opacity = 0;
  }

  if(id === "1"){
    paymentMethodSelectionButton = document.querySelector("#payment-method1");
  }
  else if(id === "2"){
    paymentMethodSelectionButton = document.querySelector("#payment-method2");
  }
  else if(id === "3"){
    paymentMethodSelectionButton = document.querySelector("#payment-method3");
  }
  else if(id === "4"){
    paymentMethodSelectionButton = document.querySelector("#payment-method4");
  }

  paymentMethodSelectionButton.checked = !paymentMethodSelectionButton.checked;

  if(paymentMethodSelectionButton.checked){
      paymentMethodSelectionButton.style.opacity = 1;
    }
  else{
    paymentMethodSelectionButton.style.opacity = 0;
  }
}


//select payment method
function selectPaymentMethod(){
  let allPaymentMethodSelectionButton = document.querySelectorAll(".hidden-checkbox");

  for(let i = 0; i < allPaymentMethodSelectionButton.length; i++){
    if(allPaymentMethodSelectionButton[i].checked === true){
      closePaymentMethod();
      return;
    }
  }

  let paymentMethodForm = document.querySelectorAll(".payment-method-form");

  for(let i = 0; i < paymentMethodForm.length; i++){
      paymentMethodForm[i].addEventListener("submit", function(event){
      event.preventDefault();
    }, {once:true});
  }

  alert("Please choose a payment method.");
}


//get user id from localStorage
function getUserId(){
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  let userIdDiv = document.querySelectorAll(".userId");
  let userId;

  if(loginStatus === true){
    userId = JSON.parse(localStorage.getItem("userId"));
    
    for(let i = 0; i < userIdDiv.length; i++){
      userIdDiv[i].innerHTML = `<input type="hidden" name="user-id" value="${userId}"></input>`;
    }
  }
  else{
    for(let i = 0; i < userIdDiv.length; i++){
      userIdDiv[i].innerHTML = "";
    }
  }
}


//add quantity
function addQuantity(id, currentPage1){
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  if(loginStatus === false){
    alert("Please login to add to cart.");

    let allProductForm = document.querySelectorAll(".product-form");
    for(let i = 0; i < allProductForm.length; i++){
      allProductForm[i].addEventListener("submit", function(event){
        event.preventDefault();
      }, {once:true});
    }
    return;
  }

  if(currentPage1 === "main"){
    addToCart(id);
  }

  let productQuantity = document.querySelector(`#quantityProduct${id}`);
  let quantity = JSON.parse(localStorage.getItem("cart"));
  let currentPage = localStorage.getItem("currentPage");

  if(quantity[id] == null){
    if(currentPage === "main"){
      productQuantity.innerHTML = `<input type="hidden" name="product-quantity" value=1></input>`;
    }
    else{
      productQuantity.innerHTML = `<input type="hidden" name="product-quantity" value=0></input>`;
    }
  }
  else{
    productQuantity.innerHTML = `<input type="hidden" name="product-quantity" value=${quantity[id]}></input>`;
  }  
}


//clear the cart when not login
function clearCartWhenNotLogin(){
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

  if(loginStatus === false){
    clearAll(false);
  }
};