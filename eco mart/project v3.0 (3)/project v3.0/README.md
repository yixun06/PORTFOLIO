# EcoMarket

EcoMarket is a web-based e-commerce system focused on sustainable products, built with HTML, CSS, JavaScript, and PHP.

## Project Overview
This project demonstrates end-to-end e-commerce fundamentals, including authentication, product browsing, cart operations, and checkout-related backend processing.

It is designed as a portfolio project to showcase practical full-stack development skills for internship and entry-level software roles.

## Features
- User registration and login
- Product browsing interface
- Add-to-cart and remove-from-cart workflows
- Payment confirmation flow
- Basic authentication/session handling

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla)
- PHP
- MySQL

## Important Runtime Note
Full backend features require a local PHP + MySQL environment.

Recommended local stacks:
- XAMPP
- Laragon

You can preview some frontend pages directly, but login/cart/checkout require backend + database.

## Local Setup
1. Install XAMPP or Laragon.
2. Start Apache and MySQL.
3. Place this folder inside your server root:
   - XAMPP: htdocs
   - Laragon: www
4. Open phpMyAdmin.
5. Create a database (example: ecomarket).
6. Import user_db.sql.
7. Check database credentials in PHP files and update if needed.
8. Open the site in browser from localhost, for example:
   - http://localhost/project%20v3.0/main%20page.html
9. Verify flows:
   - Register -> Login -> Browse products -> Add to cart -> Remove item -> Confirm payment.

## Screenshots
Store screenshots in docs/screenshots/ and reference them here.

Suggested screenshot list:
- Home page
- Product page
- Login page
- Register page
- Cart page
- Payment confirmation page

Example markdown:
```md
![Home](docs/screenshots/home.png)
![Shop](docs/screenshots/shop.png)
![Cart](docs/screenshots/cart.png)
```

## Demo Notes
- Online demo should be marked as frontend-only if backend hosting is not configured.
- PHP features require local/server-side runtime and database setup.

## Repository Name Suggestion
- ecomarket-php-ecommerce

## Future Improvements
- Add stronger server-side input validation
- Add secure password hashing and stricter session handling
- Refactor repeated PHP logic into reusable modules
- Reorganize project folders for maintainability
- Improve backend error handling and user-facing feedback

## Author
Khew Yi Xun
