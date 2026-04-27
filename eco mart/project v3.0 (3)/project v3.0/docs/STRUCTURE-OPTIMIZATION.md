# EcoMarket Structure Optimization (Suggested)

This is a recommended structure for improving maintainability and GitHub readability.

## Current Strengths
- Clear separation between frontend pages and backend PHP endpoints by filename
- Includes SQL schema file for local setup
- Includes static assets folder (pic)

## Suggested Target Structure
```text
project/
  public/
    pages/
      main-page.html
      shop.html
      about.html
      service.html
      contact.html
      login.html
      register.html
    assets/
      css/
        style.css
      js/
        main.js
        auth.js
        shop.js
        register.js
        setCurrentPage.js
      images/
        ...
  backend/
    auth/
      login.php
      register.php
    cart/
      addToCart.php
      removeCart.php
    payment/
      confirmPayment.php
    config/
      db.php
  database/
    user_db.sql
  docs/
    screenshots/
  README.md
```

## Why This Helps
- Easier navigation for interviewers and collaborators
- Cleaner backend/frontend boundaries
- Better long-term scalability for adding routes and modules
- More professional repository presentation

## Suggested Next Refactor Steps
1. Move CSS/JS/image files under assets.
2. Create a central backend config file for DB connection.
3. Rename main page.html to main-page.html for URL safety.
4. Update all script/style/include paths after moving files.
5. Add simple API response standards for PHP endpoints.
