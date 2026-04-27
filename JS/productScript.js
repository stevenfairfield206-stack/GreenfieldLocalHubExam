// Waits for the HTML to be fully loaded before running
document.addEventListener('DOMContentLoaded', () => {

    // Restore basket UI
    renderBasket();

    // Attach click events to Add to Cart buttons
    document.querySelectorAll(".addToCartBtn").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".productCard");
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            addToBasket(name, price);
            renderBasket();
        });
    });

    console.log("JavaScript is successfully linked!");

    // Alerts the user when a nav link is clicked
    const navLinks = document.querySelectorAll('.topbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(`You clicked on: ${link.innerText}`);
        });
    });
});

const loginModal = document.getElementById("loginModal");
const avatarButton = document.getElementById("avatarImg");
const accessibilityButton = document.getElementById("accessibilityImg")
const accessibilityModal = document.getElementById("accessibilityModal")
const closeLogin = document.querySelector(".closeLogin")
const closeAccessibility = document.querySelector(".closeAccessibility")
const loginButton = document.querySelector(".loginSubmit")
const basketButton = document.getElementById("basketBtn")
const basketModal = document.getElementById("basketModal")
const closeBasket = document.querySelector(".closeBasket")
const checkoutBtn = document.getElementById("checkoutBtn")

let basket = [];

//Remebers basket after refresh
const savedBasket = localStorage.getItem("basket");
if (savedBasket) {
    basket = JSON.parse(savedBasket);
    renderBasket();
}

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

if (basketButton) {
    console.log("Accessibility Button Found");
    basketButton.onclick = function() {
        console.log("Accessibility options Clicked");
        basketModal.style.display = "block"
    }
} else{
    console.error("Basket button not found in the HTML.");
}

document.addEventListener("DOMContentLoaded", () => {
// Attach click events to Add to Cart buttons
    document.querySelectorAll(".addToCartBtn").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".productCard");
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            addToBasket(name, price);
            renderBasket();
        });
    });

    document.querySelectorAll(".productCard").forEach(card => {
        const price = parseFloat(card.dataset.price);
        const priceEl = card.querySelector(".productPrice");

        if (priceEl && !isNaN(price)) {
            priceEl.textContent = `£${price.toFixed(2)}`;
        }
    });
});

// ================== LOAD PRODUCTS FROM ADMIN ==================

let products = JSON.parse(localStorage.getItem("products")) || [];

function addToBasket(name, price) {
    const item = basket.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        basket.push({ name, price, quantity: 1 });
    }
}


function renderBasket() {
    const basketItemsDiv = document.getElementById("basketItems");
    const basketTotalP = document.getElementById("basketTotal");

    basketItemsDiv.innerHTML = "";
    let total = 0;

    basket.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.className = "basketItem";

        itemDiv.innerHTML = `
            <div class="basketItemInfo">
                <div class="basketItemImage"></div>
                <div>
                    <p class="basketItemName">${item.name}</p>
                    <p class="basketItemPrice">£${item.price.toFixed(2)}</p>
                </div>
            </div>

            <div class="basketItemControls">
                <div class="qtyControl">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span class="qty">${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <button class="removeBtn" onclick="removeItem(${index})">🗑</button>
            </div>
        `;

        basketItemsDiv.appendChild(itemDiv);

        //This line stores the basket's content for the checkout page
    });
    localStorage.setItem("basket", JSON.stringify(basket));

    basketTotalP.textContent = `Total: £${total.toFixed(2)}`;
}

function changeQuantity(index, change) {
    basket[index].quantity += change;

    if (basket[index].quantity <= 0) {
        basket.splice(index, 1);
    }

    renderBasket();
}

function removeItem(index) {
    basket.splice(index, 1);
    renderBasket();
}

function attachBasketControlHandlers() {
    document.querySelectorAll(".qtyBtn").forEach(btn => {
        btn.onclick = () => {
            const index = btn.dataset.index;
            const action = btn.dataset.action;

            if (action === "increase") {
                basket[index].quantity++;
            } else if (action === "decrease") {
                basket[index].quantity--;
                if (basket[index].quantity === 0) {
                    basket.splice(index, 1);
                }
            }

            renderBasket();
        };
    });

    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.onclick = () => {
            basket.splice(btn.dataset.index, 1);
            renderBasket();
        };
    });
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

// When the basket button is pressed, open the basket modal
basketButton.onclick = function() {
    basketModal.style.display = "flex";
}

// If the user clicks the X,the basket modal will close
closeBasket.onclick = function() {
    basketModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target === basketModal) {
        basketModal.style.display = "none";
    }
    if (event.target === accessibilityModal) {
        accessibilityModal.style.display = "none";
    }
};

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

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (basket.length > 0){
            window.location.href = "checkoutPage.html";
        } else {
            alert("Your basket is empty, please add at least one item to checkout.")
        } 
    });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  products.forEach(product => {
    if (product.stock <= 0) return; // hide out-of-stock items

    const card = document.createElement("div");
    card.className = "productCard";
    card.dataset.name = product.name;
    card.dataset.price = product.price;

    card.innerHTML = `
      <div class="productImage"></div>
      <p class="productName">${product.name}</p>
      <p class="productPrice">£${product.price.toFixed(2)}</p>
      <button class="addToCartBtn">Add to Cart</button>
      <p class="stockInfo">Stock: ${product.stock}</p>
    `;

    grid.appendChild(card);
  });

  attachAddToCartHandlers();
}

function attachAddToCartHandlers() {
  document.querySelectorAll(".addToCartBtn").forEach(button => {
    button.onclick = e => {
      const card = e.target.closest(".productCard");
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      addToBasket(name, price);
      renderBasket();
    };
  });
}

renderProducts();