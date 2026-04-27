// --------------------------------------------
// | Checkout Initialisation & Event Handlers |
// --------------------------------------------

// Waits for the HTML to be fully loaded before running
document.addEventListener("DOMContentLoaded", () => {
    loadOrderSummary();

    const continueToPaymentBtn = document.getElementById("continueToPayment");
    const continueToConfirmBtn = document.getElementById("continueToConfirm");

    if (continueToPaymentBtn) {
        continueToPaymentBtn.onclick = function () {
            
        continueToConfirmBtn.disabled = true;
        setTimeout(() => continueToConfirmBtn.disabled = false, 500);

            const step1Error = document.getElementById("step1Error");

            if (validateStep1()) {
                if (step1Error) step1Error.textContent = "";
                showStep(2);
            } else {
                if (step1Error) {
                    step1Error.textContent =
                        "Please complete all required fields before continuing.";
                }
            }
        };
    }


    if (continueToConfirmBtn) {
        continueToConfirmBtn.onclick = function () {
            if (!validateCardDetails()) return;

            continueToConfirmBtn.disabled = true;
            setTimeout(() => continueToConfirmBtn.disabled = false, 500);

            showStep(3);   

            //Updates confirmation text and order reference
            const deliveryMethod = document.querySelector(
                'input[name="deliveryMethod"]:checked'
            )?.value;

            const confirmationText = document.getElementById("confirmationText");
            const orderReferenceEl = document.getElementById("orderReference");

            if (confirmationText) {
                confirmationText.textContent =
                    deliveryMethod === "collection"
                        ? "Order confirmed! Please collect your order from our store."
                        : "Order confirmed! Below is a preview of your delivery location.";
            }

            localStorage.removeItem("basket");

            if (orderReferenceEl) {
                orderReferenceEl.textContent = "GLH-" + Date.now();
            }

            // Disables step navigation after confirmation
            steps.forEach(step => {
                step.style.pointerEvents = "none";
                step.style.opacity = "0.5";
            });

            setTimeout(showDeliveryMap, 300);
        };
    }
    
    const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
    const addressFields = document.querySelectorAll(
        '#shippingAddress, #city, #postcode'
    );

    deliveryRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const isCollection = radio.value === "collection";

            addressFields.forEach(input => {
                input.disabled = isCollection;
                input.parentElement.style.opacity = isCollection ? "0.5" : "1";
            });
        });
    });

    
    document.querySelectorAll(
        '.checkoutStepContent[data-step="1"] input'
    ).forEach(input => {
        input.addEventListener("input", () => {
            const step1Error = document.getElementById("step1Error");
            if (step1Error) step1Error.textContent = "";
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

// ----------------------------------------------
// | Global UI – Login & Accessibility Controls |
// ----------------------------------------------

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

//------------------------------------------------
//| Checkout Step Navigation & Progress Tracking |
//------------------------------------------------

let currentStep = 1;

const steps = document.querySelectorAll(".step");
const stepContents = document.querySelectorAll(".checkoutStepContent");
const progressFill = document.getElementById("progressFill");

function showStep(step) {

    if (steps.length === 0 || stepContents.length === 0) {
        return;
    }

    currentStep = step;

    stepContents.forEach(content => {
        content.classList.remove("active");
        if (parseInt(content.dataset.step) === step) {
            content.classList.add("active");
        }
    });

    steps.forEach(s => {
        s.classList.toggle(
            "active",
            parseInt(s.dataset.step) === step
        );
    });

    /* Progress Animation */
    const progressPercent = ((step - 1) / 2) * 100;
    progressFill.style.width = progressPercent + "%";

    
    const firstInput = document
        .querySelector('.checkoutStepContent.active input');
    firstInput?.scrollIntoView({ behavior: "smooth", block: "center" });

}

//---------------------------------------------
//| Step 1 Validation – Shipping / Collection |
//---------------------------------------------

/* Basic validation for Step 1 */
function validateStep1() {

    const deliveryMethod = document.querySelector(
        'input[name="deliveryMethod"]:checked'
    ).value;

    if (deliveryMethod === "collection") {
        return true;
    }

    // Existing address validation
    const step1Inputs = document.querySelectorAll(
        '.checkoutStepContent[data-step="1"] input[required]:not(:disabled)'
    );

    let valid = true;

    step1Inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("inputInvalid");
            valid = false;
        } else {
            input.classList.remove("inputInvalid");
            input.classList.add("inputValid");
        }
    });

    return valid;
}

//---------------------------------------------------
//| Step 2 Validation – Payment Details (Simulated) |
//---------------------------------------------------

function validateCardDetails() {

    const cardName = document.getElementById("cardName");
    const cardNumber = document.getElementById("cardNumber");
    const expiry = document.getElementById("expiryDate");
    const cvv = document.getElementById("cvv");

    const nameError = document.getElementById("cardNameError");
    const numberError = document.getElementById("cardNumberError");
    const expiryError = document.getElementById("expiryError");
    const cvvError = document.getElementById("cvvError");

    let valid = true;

    /* Cardholder Name */
    if (cardName.value.trim().length < 3) {
        nameError.textContent = "Please enter the cardholder name.";
        cardName.classList.add("inputInvalid");
        valid = false;
    } else {
        nameError.textContent = "";
        cardName.classList.remove("inputInvalid");
        cardName.classList.add("inputValid");
    }

    /* Card Number */
    const digits = cardNumber.value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) {
        numberError.textContent = "Card number must be 16 digits.";
        cardNumber.classList.add("inputInvalid");
        valid = false;
    } else {
        numberError.textContent = "";
        cardNumber.classList.remove("inputInvalid");
        cardNumber.classList.add("inputValid");
    }

    /* Expiry */
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value)) {
        expiryError.textContent = "Use MM/YY format.";
        expiry.classList.add("inputInvalid");
        valid = false;
    } else {
        expiryError.textContent = "";
        expiry.classList.remove("inputInvalid");
        expiry.classList.add("inputValid");
    }

    /* CVV */
    if (!/^\d{3}$/.test(cvv.value)) {
        cvvError.textContent = "CVV must be 3 digits.";
        cvv.classList.add("inputInvalid");
        valid = false;
    } else {
        cvvError.textContent = "";
        cvv.classList.remove("inputInvalid");
        cvv.classList.add("inputValid");
    }

    return valid;
}

const cardNumberInput = document.getElementById("cardNumber");

cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);

    let formatted = value.match(/.{1,4}/g);
    e.target.value = formatted ? formatted.join(" ") : value;
});

//------------------------------------------
//| Order Summary Rendering & Calculations |
//------------------------------------------

function loadOrderSummary() {

    const orderItemsList = document.getElementById("orderItems");
    const orderSubtotalEl = document.getElementById("orderSubtotal");

    if (!orderItemsList || !orderSubtotalEl) return;

    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    orderItemsList.innerHTML = "";
    let subtotal = 0;

    basket.forEach(item => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} — £${lineTotal.toFixed(2)}`;

        orderItemsList.appendChild(li);
    });

    orderSubtotalEl.textContent = `£${subtotal.toFixed(2)}`;
}

//---------------------------------------
//| Delivery / Collection Map Rendering |
//---------------------------------------

function showDeliveryMap() {

    const deliveryMethod = document.querySelector(
        'input[name="deliveryMethod"]:checked'
    ).value;

    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    //Store location (example: Liverpool)
    if (deliveryMethod === "collection") {

        const map = L.map("map").setView([53.4084, -2.9916], 14);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        L.marker([53.4084, -2.9916])
            .addTo(map)
            .bindPopup("Greenfield Local Hub - Collection Point")
            .openPopup();

        return;
    }

    const postcodeInput = document.getElementById("postcode");
    const addressInput  = document.getElementById("shippingAddress");
    const cityInput     = document.getElementById("city");

    if (!postcodeInput || !addressInput || !cityInput) return;

    if (postcodeInput.value.trim() === "") {
        return;
    }

    const ukPostcode = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

    if (!ukPostcode.test(postcodeInput.value)) {
        postcodeInput.classList.add("inputInvalid");
        return;
    }

    const address = [
        addressInput.value,
        cityInput.value,
        postcodeInput.value,
        "UK"
    ].join(", ");

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                mapContainer.innerHTML =
                    "<p style='text-align:center;'>Unable to locate address.</p>";
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const map = L.map("map").setView([lat, lon], 14);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors"
            }).addTo(map);

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup("Delivery location")
                .openPopup();
        })
        .catch(() => {
            mapContainer.innerHTML =
                "<p style='text-align:center;'>Map unavailable.</p>";
        });
}
