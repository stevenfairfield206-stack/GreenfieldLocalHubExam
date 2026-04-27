// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Admin JS loaded");

  initAdminNavigation();
  initModals();
  initData();
});

// NAV BAR

const loginModal = document.getElementById("loginModal");
const avatarButton = document.getElementById("avatarImg");
const accessibilityButton = document.getElementById("accessibilityImg")
const accessibilityModal = document.getElementById("accessibilityModal")
const closeLogin = document.querySelector(".closeLogin")
const closeAccessibility = document.querySelector(".closeAccessibility")
const loginButton = document.querySelector(".loginSubmit")
const learnMoreButton = document.getElementById("learnMoreButton")

// Logs whether the account button is found or gives an error message in the logs.
if (avatarButton) {
    console.log("Avatar Button Found");
    avatarButton.onclick = function() {
        console.log("Avatar Clicked");
        loginModal.style.display = "block"
    }
} else{
    console.error("Avatar button not found in the HTML.");
}

if (accessibilityButton) {
    console.log("Accessibility Button Found");
    accessibilityButton.onclick = function() {
        console.log("Accessibility options Clicked");
        accessibilityModal.style.display = "block"
    }
} else{
    console.error("Accessibility button not found in the HTML.");
}

// This function allows for the account image/button to have a smooth transition from white to green //
function updateAvatar(avatarGreenImg) {
    const img = document.getElementById("avatarImg");

    img.classList.add("fade-out");

    setTimeout(() => {
        img.src = avatarGreenImg;

        img.classList.remove("fade-out");
    }, 200);
}

// Lines 34-44 is connected to these two as the image changers
function changeAvatar1() {
    updateAvatar("Images/avatarGreen.png");
}

function changeAvatar2() {
    updateAvatar("Images/avatarWhite.png");
}

// When the avatar button is pressed, open the login modal
avatarButton.onclick = function() {
    loginModal.style.display = "flex";
}

// If the user clicks the X,the login modal will close
closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

// If the user clicks off of the login box, the login modal will close
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

// Form validation for username and password
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    let isUserValid = true;
    let isPasswordValid = true

    if (username == ""){
        usernameInput.classList.remove("inputValid");
        usernameInput.classList.add("inputInvalid");
        usernameError.textContent = "Please enter a username.";
        isUserValid = false;
    } else {
        usernameInput.classList.remove("inputInvalid");
        usernameInput.classList.add("inputValid");
        usernameError.textContent = "";
    }

    if (password.length < 8) {
        passwordInput.classList.remove("inputValid");
        passwordInput.classList.add("inputInvalid");
        passwordError.textContent = "Password must be at least 8 characters.";
        isPasswordValid = false;
    } else {
        passwordInput.classList.remove("inputInvalid");
        passwordInput.classList.add("inputValid");
        passwordError.textContent = "";
    }
    
    if (username === "Admin" && password === "GLHAdmin1"){
        window.location.href = "adminPage.html";
        return;
    }

    if (!isUserValid && !isPasswordValid)return;

    if (isUserValid && isPasswordValid) {
        sessionStorage.setItem("loggedInUser", username);
        window.location.href = "accountPage.html";
    }
    
    usernameInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
});

function updateAccessibility(accessibilityGreenImg) {
    const img = document.getElementById("accessibilityImg");

    img.classList.add("fade-out");

    setTimeout(() => {
        img.src = accessibilityGreenImg;

        img.classList.remove("fade-out");
    }, 200);
}

function changeAccessibility1() {
    updateAccessibility("Images/accessibilityGreen.png");
}

function changeAccessibility2() {
    updateAccessibility("Images/accessibilityWhite.png");
}

accessibilityButton.onclick = function() {
    accessibilityModal.style.display = "block";
}

closeAccessibility.onclick = function() {
    accessibilityModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === accessibilityModal) {
        accessibilityModal.style.display = "none";
    }
}

let fontSize = 1; // 1rem

function increaseSize() {
    fontSize += 0.1;
    document.documentElement.style.setProperty('--baseFontSize', fontSize + 'rem');
}

function decreaseSize() {
    fontSize = Math.max(0.8, fontSize - 0.1);
    document.documentElement.style.setProperty('--baseFontSize', fontSize + 'rem')
}

function toggleContrast() {
    document.body.classList.toggle("highContrast");
}

function toggleDyslexiaFont() {
    document.body.classList.toggle("dyslexiaFont")
}


// ================== DATA ==================

let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "Carrot", price: 0.4, stock: 120 },
  { id: 2, name: "Cabbage", price: 0.5, stock: 80 },
  { id: 3, name: "Broccoli", price: 0.6, stock: 10 }
];

let orders = JSON.parse(localStorage.getItem("orders")) || [
  { id: 101, customer: "J. Smith", status: "Pending" }
];

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("orders", JSON.stringify(orders));
}

// ================== DASHBOARD ==================

function updateDashboard() {
  document.getElementById("totalProducts").textContent = products.length;
  document.getElementById("lowStock").textContent =
    products.filter(p => p.stock <= 20).length;
  document.getElementById("ordersToday").textContent = orders.length;
}

// ================== STOCK ==================

function renderStock() {
  const table = document.getElementById("stockTable");
  table.innerHTML = "";

  products.forEach((product, index) => {
    table.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td class="${product.stock <= 20 ? "lowStock" : ""}">
          ${product.stock}
        </td>
        <td>
          <input type="number" min="0"
            value="${product.stock}"
            onchange="updateStock(${index}, this.value)">
        </td>
      </tr>
    `;
  });
}

function updateStock(index, value) {
  products[index].stock = parseInt(value);
  saveData();
  renderStock();
  updateDashboard();
}

// ================== PRODUCTS ==================

function renderProducts() {
  const table = document.getElementById("adminProductTable");
  table.innerHTML = "";

  products.forEach((product, index) => {
    table.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>
          <input type="number" step="0.01"
            value="${product.price}"
            onchange="updatePrice(${index}, this.value)">
        </td>
        <td>${product.stock}</td>
        <td>${product.stock > 0 ? "Available" : "Out of stock"}</td>
        <td>
          <button onclick="restock(${index})">+50</button>
        </td>
      </tr>
    `;
  });
}

function updatePrice(index, value) {
  products[index].price = parseFloat(value);
  saveData();
}

function restock(index) {
  products[index].stock += 50;
  saveData();
  renderProducts();
  renderStock();
  updateDashboard();
}

// ================== ORDERS ==================

function renderOrders() {
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  orders.forEach((order, index) => {
    table.innerHTML += `
      <tr>
        <td>#${order.id}</td>
        <td>${order.customer}</td>
        <td>
          <select onchange="updateOrderStatus(${index}, this.value)">
            <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${order.status === "Processing" ? "selected" : ""}>Processing</option>
            <option ${order.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
      </tr>
    `;
  });
}

function updateOrderStatus(index, status) {
  orders[index].status = status;
  saveData();
}

// ================== NAVIGATION ==================

function initAdminNavigation() {
  const buttons = document.querySelectorAll(".adminSidebar button");
  const sections = document.querySelectorAll(".adminSection");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      sections.forEach(s => s.classList.remove("active"));
      buttons.forEach(b => b.classList.remove("active"));

      document.getElementById(btn.dataset.section).classList.add("active");
      btn.classList.add("active");
    });
  });
}

// ================== MODALS ==================

function initModals() {
  const loginModal = document.getElementById("loginModal");
  const accessModal = document.getElementById("accessibilityModal");

  document.getElementById("avatarImg").onclick =
    () => loginModal.style.display = "flex";

  document.getElementById("accessibilityImg").onclick =
    () => accessModal.style.display = "flex";

  window.onclick = e => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === accessModal) accessModal.style.display = "none";
  };
}

// ================== FINAL INIT ==================

function initData() {
  renderProducts();
  renderStock();
  renderOrders();
  updateDashboard();
}