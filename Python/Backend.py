#-------------------------------
#| DATA FOR THE BACKEND SYSTEM |
#-------------------------------

def loginDatabase():
    return {
        "Gerald1293": "H3ll0W0RlD",
        "HomerBimpson": "Spr1ngFi3ld",
        "LoganSnorelax": "P00ki3MoN"
    }

SESSION = {
    "logged_in": False,
    "user": None
}

#---------------------------
#| AUTHENTICATION SERVICES |
#---------------------------

def loginForm():
    logins = loginDatabase()

    username = input("Username: ")
    password = input("Password: ")

    if username in logins and logins[username] == password:
        SESSION["logged_in"] = True
        SESSION["user"] = username
        accountRedirect()
    else:
        print("\n Invalid Username or Password")
        loginForm()

def Logout():
    SESSION["logged_in"] = False
    SESSION["user"] = None
    print("\nLogged Out")
    loginForm()

#-------------------------
#| ROUTING AND REDIRECTS |
#-------------------------

def accountRedirect():
    print(f"\n Login Successful")
    print(f"Welcome, {SESSION["user"]}!")
    homeRedirect()

def homeRedirect():
    print("\n Home Page Loaded")
    navBar()

def accountButton():
    if not SESSION["logged_in"]:
        loginForm()
        return
    print("\n Account Page opened")

def logoRedirect():
    homeRedirect()

def aboutUsRedirect():
    print("\n About Us Page loaded")

def productsRedirect():
    if not SESSION["logged_in"]:
        print("Please log in first")
        loginForm()
        return
    print("\n Products Page loaded")

#------------------------------
#| UI COMPONENTS (LOGIC ONLY) |
#------------------------------

def navBar():
    print("\n Navigation bar displayed")

def accessibilityButton():
    print("Accessibility Options loaded")

#---------------------
#| SHOPPING/FEATURES |
#---------------------
def shoppingBasket():
    print("\n Shopping basket loaded")

def addToCart():
    print("Item added to cart")

def learnMoreButton():
    print("Learn More button opened")

#-------------------------
#| ACCESSIBILITY OPTIONS |
#-------------------------

def textSize():
    print("Text size increased")

def highContrast():
    print("High contrast mode enabled")

def dyslexiaFont():
    print("Dyslexia-friendly font enabled")

#---------------------
#| START BACKEND RUN |
#---------------------

loginForm()