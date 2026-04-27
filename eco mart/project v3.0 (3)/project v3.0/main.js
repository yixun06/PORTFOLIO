document.addEventListener("DOMContentLoaded", () => {
  
    // Shop More button functionality (if applicable)
    const shopMoreBtn = document.getElementById("shopMoreBtn");
    if (shopMoreBtn) {
        shopMoreBtn.addEventListener("click", () => {
            const isLoggedIn = false; // Replace with real login check later
            if (!isLoggedIn) {
                alert("Please login or register to continue shopping.");
                window.location.href = "login.html";
            } else {
                window.location.href = "shop.html";
            }
        });
    }

    // Highlight current nav link
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});