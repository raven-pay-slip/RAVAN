const STORE_KEYS = {
  products: "raven_store_products_v1",
  users: "raven_store_users_v1",
  session: "raven_store_session_v1",
  cart: "raven_store_cart_v1",
  orders: "raven_store_orders_v1",
};

const deliveryCharge = 90;
const defaultProducts = [
  {
    id: "tee-oversized-black",
    name: "RAVEN Oversized Black Tee",
    price: 950,
    stock: 18,
    category: "Oversized",
    badge: "Best Seller",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
    description: "Heavy cotton oversized fit with a soft washed finish.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tee-graphic-rust",
    name: "RAVEN Rust Graphic Tee",
    price: 850,
    stock: 22,
    category: "Graphic",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rust", "Black"],
    description: "Street graphic print with breathable 180 GSM jersey.",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tee-core-white",
    name: "RAVEN Core White Tee",
    price: 650,
    stock: 30,
    category: "Minimal",
    badge: "Core",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Cream"],
    description: "Clean daily essential with a structured neck rib.",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tee-urban-green",
    name: "RAVEN Urban Green Tee",
    price: 780,
    stock: 14,
    category: "Premium",
    badge: "Limited",
    sizes: ["M", "L", "XL"],
    colors: ["Green", "Black"],
    description: "Premium cotton tee with relaxed shoulders and clean logo hit.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tee-washed-gray",
    name: "RAVEN Washed Gray Tee",
    price: 890,
    stock: 11,
    category: "Washed",
    badge: "Drop 02",
    sizes: ["M", "L", "XL"],
    colors: ["Gray", "Charcoal"],
    description: "Garment-washed finish for a broken-in vintage feel.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tee-stripe-cream",
    name: "RAVEN Cream Stripe Tee",
    price: 720,
    stock: 16,
    category: "Minimal",
    badge: "Fresh",
    sizes: ["S", "M", "L"],
    colors: ["Cream", "Navy"],
    description: "Soft stripe tee for a cleaner casual look.",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=900&q=80",
  },
];

const els = {
  productGrid: document.getElementById("productGrid"),
  categoryFilter: document.getElementById("categoryFilter"),
  sortSelect: document.getElementById("sortSelect"),
  searchInput: document.getElementById("searchInput"),
  openSearchBtn: document.getElementById("openSearchBtn"),
  cartToggleBtn: document.getElementById("cartToggleBtn"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartDrawer: document.getElementById("cartDrawer"),
  overlay: document.getElementById("overlay"),
  cartCount: document.getElementById("cartCount"),
  cartItems: document.getElementById("cartItems"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  cartGrandTotal: document.getElementById("cartGrandTotal"),
  cartTotalStat: document.getElementById("cartTotalStat"),
  productTotal: document.getElementById("productTotal"),
  stockTotal: document.getElementById("stockTotal"),
  orderTotal: document.getElementById("orderTotal"),
  authActionBtn: document.getElementById("authActionBtn"),
  authModal: document.getElementById("authModal"),
  authForm: document.getElementById("authForm"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  authEyebrow: document.getElementById("authEyebrow"),
  authTitle: document.getElementById("authTitle"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  switchAuthModeBtn: document.getElementById("switchAuthModeBtn"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  checkoutModal: document.getElementById("checkoutModal"),
  checkoutForm: document.getElementById("checkoutForm"),
  checkoutName: document.getElementById("checkoutName"),
  checkoutPhone: document.getElementById("checkoutPhone"),
  checkoutAddress: document.getElementById("checkoutAddress"),
  checkoutPayment: document.getElementById("checkoutPayment"),
  accountPage: document.getElementById("accountPage"),
  adminPage: document.getElementById("adminPage"),
  accountContent: document.getElementById("accountContent"),
  productForm: document.getElementById("productForm"),
  productFormTitle: document.getElementById("productFormTitle"),
  productId: document.getElementById("productId"),
  productName: document.getElementById("productName"),
  productPrice: document.getElementById("productPrice"),
  productStock: document.getElementById("productStock"),
  productCategory: document.getElementById("productCategory"),
  productBadge: document.getElementById("productBadge"),
  productSizes: document.getElementById("productSizes"),
  productColors: document.getElementById("productColors"),
  productDescription: document.getElementById("productDescription"),
  productImage: document.getElementById("productImage"),
  resetProductFormBtn: document.getElementById("resetProductFormBtn"),
  exportProductsBtn: document.getElementById("exportProductsBtn"),
  adminProducts: document.getElementById("adminProducts"),
  adminOrders: document.getElementById("adminOrders"),
  toast: document.getElementById("toast"),
};

let authMode = "login";

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeedData() {
  if (!localStorage.getItem(STORE_KEYS.products)) {
    write(STORE_KEYS.products, defaultProducts);
  }

  const users = read(STORE_KEYS.users, []);
  if (!users.some((user) => user.email === "admin@raven.test")) {
    users.push({
      id: "admin",
      name: "RAVEN Admin",
      email: "admin@raven.test",
      password: "admin123",
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    write(STORE_KEYS.users, users);
  }
}

function products() {
  return read(STORE_KEYS.products, []);
}

function saveProducts(nextProducts) {
  write(STORE_KEYS.products, nextProducts);
}

function cart() {
  return read(STORE_KEYS.cart, []);
}

function saveCart(nextCart) {
  write(STORE_KEYS.cart, nextCart);
}

function orders() {
  return read(STORE_KEYS.orders, []);
}

function saveOrders(nextOrders) {
  write(STORE_KEYS.orders, nextOrders);
}

function session() {
  return read(STORE_KEYS.session, null);
}

function saveSession(user) {
  write(STORE_KEYS.session, user);
}

function clearSession() {
  localStorage.removeItem(STORE_KEYS.session);
}

function money(value) {
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  setTimeout(() => els.toast.classList.remove("show"), 2100);
}

function filteredProducts() {
  const query = els.searchInput.value.trim().toLowerCase();
  const category = els.categoryFilter.value;
  const sort = els.sortSelect.value;

  let list = products().filter((product) => {
    const text = [
      product.name,
      product.category,
      product.badge,
      product.description,
      (product.sizes || []).join(" "),
      (product.colors || []).join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return (!query || text.includes(query)) && (category === "all" || product.category === category);
  });

  if (sort === "low") {
    list = list.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "high") {
    list = list.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === "stock") {
    list = list.sort((a, b) => Number(b.stock) - Number(a.stock));
  }

  return list;
}

function renderCategoryOptions() {
  const current = els.categoryFilter.value || "all";
  const categories = [...new Set(products().map((product) => product.category).filter(Boolean))];
  els.categoryFilter.innerHTML = `<option value="all">All Categories</option>${categories
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("")}`;
  els.categoryFilter.value = categories.includes(current) ? current : "all";
}

function renderProducts() {
  renderCategoryOptions();
  const list = filteredProducts();

  if (!list.length) {
    els.productGrid.innerHTML = `<div class="empty-state">No T-shirts found for this search.</div>`;
    return;
  }

  els.productGrid.innerHTML = list
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
            ${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ""}
          </div>
          <div class="product-body">
            <div>
              <h3>${escapeHtml(product.name)}</h3>
              <p class="product-desc">${escapeHtml(product.description || "")}</p>
            </div>
            <div class="size-list">${(product.sizes || []).map((size) => `<span class="size-pill">${escapeHtml(size)}</span>`).join("")}</div>
            <div class="swatches">${(product.colors || []).map((color) => `<span class="swatch">${escapeHtml(color)}</span>`).join("")}</div>
            <div class="price-row">
              <strong>${money(product.price)}</strong>
              <span class="stock-note">${Number(product.stock) > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
            </div>
            <div class="product-actions">
              <button class="ghost-btn" type="button" data-action="details" data-id="${product.id}">Details</button>
              <button class="solid-btn" type="button" data-action="cart" data-id="${product.id}" ${Number(product.stock) <= 0 ? "disabled" : ""}>Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function addToCart(productId) {
  const product = products().find((item) => item.id === productId);
  if (!product || Number(product.stock) <= 0) {
    toast("This item is out of stock");
    return;
  }

  const nextCart = cart();
  const existing = nextCart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    nextCart.push({ productId, quantity: 1 });
  }

  saveCart(nextCart);
  renderCart();
  toast("Added to cart");
}

function cartDetails() {
  const catalog = products();
  return cart()
    .map((item) => {
      const product = catalog.find((candidate) => candidate.id === item.productId);
      return product ? { ...item, product, total: Number(product.price) * Number(item.quantity) } : null;
    })
    .filter(Boolean);
}

function renderCart() {
  const items = cartDetails();
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const grandTotal = subtotal > 0 ? subtotal + deliveryCharge : 0;
  const count = items.reduce((sum, item) => sum + Number(item.quantity), 0);

  els.cartCount.textContent = count;
  els.cartSubtotal.textContent = money(subtotal);
  els.cartGrandTotal.textContent = money(grandTotal);
  els.cartTotalStat.textContent = money(grandTotal);

  if (!items.length) {
    els.cartItems.innerHTML = `<div class="empty-state">Your cart is empty.</div>`;
    return;
  }

  els.cartItems.innerHTML = items
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${escapeHtml(item.product.image)}" alt="${escapeHtml(item.product.name)}">
          <div>
            <h4>${escapeHtml(item.product.name)}</h4>
            <p class="product-desc">${money(item.product.price)} each</p>
            <div class="qty-controls">
              <button type="button" data-cart-action="dec" data-id="${item.productId}">-</button>
              <strong>${item.quantity}</strong>
              <button type="button" data-cart-action="inc" data-id="${item.productId}">+</button>
            </div>
          </div>
          <button class="icon-btn" type="button" data-cart-action="remove" data-id="${item.productId}" aria-label="Remove item">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `
    )
    .join("");
  lucide.createIcons();
}

function updateCartQuantity(productId, action) {
  let nextCart = cart();
  const item = nextCart.find((entry) => entry.productId === productId);
  if (!item) {
    return;
  }

  if (action === "inc") {
    item.quantity += 1;
  } else if (action === "dec") {
    item.quantity -= 1;
  } else if (action === "remove") {
    nextCart = nextCart.filter((entry) => entry.productId !== productId);
  }

  nextCart = nextCart.filter((entry) => entry.quantity > 0);
  saveCart(nextCart);
  renderCart();
}

function openCart() {
  els.cartDrawer.classList.add("open");
  els.cartDrawer.setAttribute("aria-hidden", "false");
  els.overlay.hidden = false;
}

function closeCart() {
  els.cartDrawer.classList.remove("open");
  els.cartDrawer.setAttribute("aria-hidden", "true");
  els.overlay.hidden = true;
}

function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";
  els.authName.parentElement.hidden = !signup;
  els.authEyebrow.textContent = signup ? "Create account" : "Login";
  els.authTitle.textContent = signup ? "Join RAVEN" : "Welcome back";
  els.authSubmitBtn.textContent = signup ? "Sign Up" : "Login";
  els.switchAuthModeBtn.textContent = signup ? "Use login" : "Create account";
}

function openAuth(mode = "login") {
  setAuthMode(mode);
  els.authForm.reset();
  els.authModal.showModal();
}

function handleAuth(event) {
  event.preventDefault();
  const users = read(STORE_KEYS.users, []);
  const email = els.authEmail.value.trim().toLowerCase();
  const password = els.authPassword.value;

  if (authMode === "signup") {
    if (password.length < 4) {
      toast("Password must be at least 4 characters");
      return;
    }
    if (users.some((user) => user.email === email)) {
      toast("This email already has an account");
      return;
    }
    const user = {
      id: `user-${Date.now()}`,
      name: els.authName.value.trim() || email.split("@")[0],
      email,
      password,
      role: "customer",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    write(STORE_KEYS.users, users);
    saveSession({ id: user.id, name: user.name, email: user.email, role: user.role });
  } else {
    const user = users.find((candidate) => candidate.email === email && candidate.password === password);
    if (!user) {
      toast("Wrong email or password");
      return;
    }
    saveSession({ id: user.id, name: user.name, email: user.email, role: user.role });
  }

  els.authModal.close();
  renderSession();
  renderAccount();
  renderAdmin();
  toast("Logged in");
}

function logout() {
  clearSession();
  renderSession();
  renderAccount();
  renderAdmin();
  toast("Logged out");
}

function renderSession() {
  const user = session();
  const isAdmin = user?.role === "admin";
  document.querySelectorAll("[data-admin-link], [data-admin-hero]").forEach((el) => {
    el.hidden = !isAdmin;
  });

  els.authActionBtn.textContent = user ? "Logout" : "Login";
  if (!isAdmin && location.hash === "#admin") {
    location.hash = "#shop";
  }
}

function placeOrder(event) {
  event.preventDefault();
  const items = cartDetails();
  if (!items.length) {
    toast("Cart is empty");
    return;
  }

  const user = session();
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const order = {
    id: `RAVEN-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(orders().length + 1).padStart(4, "0")}`,
    userId: user?.id || "guest",
    customerName: els.checkoutName.value.trim(),
    phone: els.checkoutPhone.value.trim(),
    address: els.checkoutAddress.value.trim(),
    paymentMethod: els.checkoutPayment.value,
    status: "Pending",
    items: items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.total,
    })),
    subtotal,
    deliveryCharge,
    total: subtotal + deliveryCharge,
    createdAt: new Date().toISOString(),
  };

  saveOrders([order, ...orders()]);
  saveCart([]);
  els.checkoutModal.close();
  closeCart();
  renderCart();
  renderStats();
  renderAccount();
  renderAdmin();
  toast("Order placed");
}

function renderStats() {
  const list = products();
  els.productTotal.textContent = list.length;
  els.stockTotal.textContent = list.reduce((sum, product) => sum + Number(product.stock || 0), 0);
  els.orderTotal.textContent = orders().length;
}

function renderAccount() {
  const user = session();
  if (!user) {
    els.accountContent.innerHTML = `
      <div class="panel">
        <h3>Please login</h3>
        <p class="product-desc">Login or create an account to see your saved orders.</p>
        <div class="form-actions">
          <button class="solid-btn" type="button" data-auth-open="login">Login</button>
          <button class="ghost-btn" type="button" data-auth-open="signup">Create Account</button>
        </div>
      </div>
    `;
    return;
  }

  const userOrders = orders().filter((order) => order.userId === user.id || user.role === "admin");
  const orderHtml = userOrders.length
    ? userOrders
        .map(
          (order) => `
            <div class="admin-item">
              <div class="admin-item-head">
                <strong>${order.id}</strong>
                <span>${money(order.total)}</span>
              </div>
              <p>${order.customerName} | ${order.phone} | ${order.status}</p>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state">No orders yet.</div>`;

  els.accountContent.innerHTML = `
    <div class="panel">
      <h3>${escapeHtml(user.name)}</h3>
      <p class="product-desc">${escapeHtml(user.email)} | ${escapeHtml(user.role)}</p>
    </div>
    <div class="panel">
      <h3>Orders</h3>
      <div class="admin-list">${orderHtml}</div>
    </div>
  `;
}

function resetProductForm() {
  els.productForm.reset();
  els.productId.value = "";
  els.productFormTitle.textContent = "Add Product";
}

function handleProductSave(event) {
  event.preventDefault();
  const id = els.productId.value || `product-${Date.now()}`;
  const nextProduct = {
    id,
    name: els.productName.value.trim(),
    price: Number(els.productPrice.value || 0),
    stock: Number(els.productStock.value || 0),
    category: els.productCategory.value.trim() || "T-Shirt",
    badge: els.productBadge.value.trim(),
    sizes: splitList(els.productSizes.value),
    colors: splitList(els.productColors.value),
    description: els.productDescription.value.trim(),
    image: els.productImage.value.trim() || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  };

  const list = products();
  const existingIndex = list.findIndex((product) => product.id === id);
  if (existingIndex >= 0) {
    list[existingIndex] = nextProduct;
  } else {
    list.unshift(nextProduct);
  }
  saveProducts(list);
  resetProductForm();
  renderAll();
  toast("Product saved");
}

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function editProduct(id) {
  const product = products().find((item) => item.id === id);
  if (!product) {
    return;
  }
  els.productId.value = product.id;
  els.productName.value = product.name;
  els.productPrice.value = product.price;
  els.productStock.value = product.stock;
  els.productCategory.value = product.category;
  els.productBadge.value = product.badge || "";
  els.productSizes.value = (product.sizes || []).join(", ");
  els.productColors.value = (product.colors || []).join(", ");
  els.productDescription.value = product.description || "";
  els.productImage.value = product.image || "";
  els.productFormTitle.textContent = "Edit Product";
  window.scrollTo({ top: els.adminPage.offsetTop, behavior: "smooth" });
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) {
    return;
  }
  saveProducts(products().filter((product) => product.id !== id));
  renderAll();
  toast("Product deleted");
}

function renderAdmin() {
  const user = session();
  if (user?.role !== "admin") {
    els.adminPage.hidden = true;
    return;
  }

  const productHtml = products()
    .map(
      (product) => `
        <div class="admin-item">
          <div class="admin-item-head">
            <strong>${escapeHtml(product.name)}</strong>
            <span>${money(product.price)}</span>
          </div>
          <p>${escapeHtml(product.category)} | Stock: ${product.stock}</p>
          <div class="form-actions">
            <button class="ghost-btn small" type="button" data-admin-action="edit" data-id="${product.id}">Edit</button>
            <button class="ghost-btn small" type="button" data-admin-action="delete" data-id="${product.id}">Delete</button>
          </div>
        </div>
      `
    )
    .join("");

  const orderHtml = orders().length
    ? orders()
        .map(
          (order) => `
            <div class="admin-item">
              <div class="admin-item-head">
                <strong>${order.id}</strong>
                <span>${money(order.total)}</span>
              </div>
              <p>${escapeHtml(order.customerName)} | ${escapeHtml(order.paymentMethod)} | ${escapeHtml(order.status)}</p>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state">No orders yet.</div>`;

  els.adminProducts.innerHTML = productHtml || `<div class="empty-state">No products yet.</div>`;
  els.adminOrders.innerHTML = orderHtml;
}

function route() {
  const hash = location.hash || "#shop";
  const user = session();
  const isAdmin = user?.role === "admin";

  els.accountPage.hidden = hash !== "#account";
  els.adminPage.hidden = hash !== "#admin" || !isAdmin;

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });

  if (hash === "#account") {
    renderAccount();
  }
  if (hash === "#admin" && isAdmin) {
    renderAdmin();
  }
}

function exportProducts() {
  const data = JSON.stringify(products(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "raven-products.json";
  link.click();
  URL.revokeObjectURL(url);
}

function renderAll() {
  renderProducts();
  renderCart();
  renderStats();
  renderSession();
  renderAccount();
  renderAdmin();
  route();
  lucide.createIcons();
}

function attachEvents() {
  els.searchInput.addEventListener("input", renderProducts);
  els.categoryFilter.addEventListener("change", renderProducts);
  els.sortSelect.addEventListener("change", renderProducts);
  els.openSearchBtn.addEventListener("click", () => els.searchInput.focus());
  els.cartToggleBtn.addEventListener("click", openCart);
  els.closeCartBtn.addEventListener("click", closeCart);
  els.overlay.addEventListener("click", closeCart);

  els.productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }
    if (button.dataset.action === "cart") {
      addToCart(button.dataset.id);
    }
    if (button.dataset.action === "details") {
      const product = products().find((item) => item.id === button.dataset.id);
      if (product) {
        toast(`${product.name} | ${money(product.price)} | ${product.stock} in stock`);
      }
    }
  });

  els.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-cart-action]");
    if (!button) {
      return;
    }
    updateCartQuantity(button.dataset.id, button.dataset.cartAction);
  });

  els.authActionBtn.addEventListener("click", () => {
    if (session()) {
      logout();
      return;
    }
    openAuth("login");
  });

  els.switchAuthModeBtn.addEventListener("click", () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  });
  els.authForm.addEventListener("submit", handleAuth);

  els.accountContent.addEventListener("click", (event) => {
    const button = event.target.closest("[data-auth-open]");
    if (button) {
      openAuth(button.dataset.authOpen);
    }
  });

  els.checkoutBtn.addEventListener("click", () => {
    if (!cartDetails().length) {
      toast("Cart is empty");
      return;
    }
    const user = session();
    els.checkoutName.value = user?.name || "";
    els.checkoutModal.showModal();
  });
  els.checkoutForm.addEventListener("submit", placeOrder);

  els.productForm.addEventListener("submit", handleProductSave);
  els.resetProductFormBtn.addEventListener("click", resetProductForm);
  els.exportProductsBtn.addEventListener("click", exportProducts);

  els.adminProducts.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-admin-action]");
    if (!button) {
      return;
    }
    if (button.dataset.adminAction === "edit") {
      editProduct(button.dataset.id);
    }
    if (button.dataset.adminAction === "delete") {
      deleteProduct(button.dataset.id);
    }
  });

  window.addEventListener("hashchange", route);
}

function init() {
  ensureSeedData();
  attachEvents();
  renderAll();
}

init();
