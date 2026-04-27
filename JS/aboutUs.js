// Waits for the HTML to be fully loaded before running
document.addEventListener('DOMContentLoaded', () => {
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

learnMoreButton.onclick = function() {
    window.location.href = "aboutUs.html";
}