// Waits for the HTML to be fully loaded before running
document.addEventListener('DOMContentLoaded', () => {

    console.log("JavaScript is successfully linked!");

    const accessibilityModal = document.getElementById("accessibilityModal");
    const accessibilityButton = document.getElementById("accessibilityImg");
    const closeAccessibility = document.querySelector(".closeAccessibility");

    if (!accessibilityModal || !accessibilityButton || !closeAccessibility) {
        console.error("Accessibility modal elements missing");
        return;
    }
    
    const prefs = ["emailNotif", "promoNotif"];

    prefs.forEach(id => {
        const box = document.getElementById(id);
        box.checked = localStorage.getItem(id) === "true";

        box.addEventListener("change", () => {
            localStorage.setItem(id, box.checked);
        });
    });

    // OPEN
    accessibilityButton.addEventListener("click", () => {
        accessibilityModal.style.display = "block";
    });

    // CLOSE BUTTON
    closeAccessibility.addEventListener("click", (e) => {
        e.stopPropagation();
        accessibilityModal.style.display = "none";
    });

    // CLICK OUTSIDE
    window.addEventListener("click", (e) => {
        if (e.target === accessibilityModal) {
            accessibilityModal.style.display = "none";
        }
    });

    // Alerts the user when a nav link is clicked
    const navLinks = document.querySelectorAll('.topbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(`You clicked on: ${link.innerText}`);
        });
    });

    // AUTH CHECK
    const username = sessionStorage.getItem("loggedInUser");

    if (!username) {
        window.location.href = "Home.html";
        return;
    }

    // SHOW USERNAME
    document.getElementById("welcomeUser").textContent = `Hello, ${username}`;

    // SECTION SWITCHING
    const buttons = document.querySelectorAll(".accountSidebar button[data-section]");
    const sections = document.querySelectorAll(".accountSection");
    const indicator = document.querySelector(".sidebarIndicator");

    function moveIndicator(button) {
        indicator.style.top = button.offsetTop + "px";
        indicator.style.height = button.offsetHeight + "px";
    }

    // Initial position
    
    const activeButton = document.querySelector(".accountSidebar button.active");

    if (activeButton) {
        moveIndicator(activeButton);
    }


    buttons.forEach(button => {
        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            sections.forEach(section => {
                section.classList.toggle(
                    "active",
                    section.id === button.dataset.section
                );
            });

            moveIndicator(button);
        });
    });

        const profileFields = {
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        phone: document.getElementById("phone"),
        email: document.getElementById("email")
    };

    const saveBtn = document.getElementById("saveProfile");

    // LOAD PROFILE
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));

    if (savedProfile) {
        Object.keys(profileFields).forEach(key => {
            profileFields[key].value = savedProfile[key] || "";
        });
    }

    // SAVE PROFILE
    saveBtn.addEventListener("click", () => {

        const profileData = {};

        Object.keys(profileFields).forEach(key => {
            profileData[key] = profileFields[key].value.trim();
        });

        localStorage.setItem("profileData", JSON.stringify(profileData));

        saveBtn.textContent = "Saved ✓";

        setTimeout(() => {
            saveBtn.textContent = "Save Changes";
        }, 1500);
    });

    buttons.forEach(button => {
    button.addEventListener("click", () => {
        localStorage.setItem("activeSection", button.dataset.section);
        });
    });

    const savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
        document.querySelector(`[data-section="${savedSection}"]`)?.click();
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        if (confirm("Are you sure you want to log out?")) {
            sessionStorage.clear();
            window.location.href = "Home.html";
        }
    });

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

