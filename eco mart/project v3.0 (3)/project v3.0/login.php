<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - EcoMarket</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="header">
    <div class="logo"><img src="pic/project logo.png"></div>
    <nav>
      <ul class="nav-links">
        <li><a href="main page.html">Home</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html" class="active">Login</a></li>
        <li><a href="register.html">Register</a></li>
      </ul>
    </nav>
  </header>

  <section class="form-container">
    <?php
      //database connection setting
      $host_name = "localhost";
      $user_name = "root";
      $password = "";
      $db_name = "user_db";

      //create connection
      $connection = new mysqli($host_name, $user_name, $password, $db_name);

      //check connection
      if($connection -> connect_error){
        die("<h2>Connection failed: " . $connection -> connect_error . "</h2>");
      }

      //retrieve data from the login form
      if($_SERVER["REQUEST_METHOD"] === "POST"){
        $login_email = $_POST["email"];
        $login_password = $_POST["password"];
      }

      //retrieve data from mysql
      $sql = "SELECT * FROM users";
      $result = $connection -> query($sql);

      //if there is data in mysql...
      if($result -> num_rows > 0){
        $login_success = false;
        $login_fail = false;

        //fetch_assoc = retrieve a row from the table in mysql
        //while there is next row exist...
        while($row = $result -> fetch_assoc()){
          //stop looping when email and password correct or
          //when email match but password wrong
          if(!$login_success && !$login_fail){
            $user_id = $row["id"];
            $name = $row["name"];
            $email = $row["email"];
            $password = $row["password"];

            //check whether the email and password entered by the user is matched 
            // with the email and password that are registered
            if($login_email === $email){
              //hashed password can be verify using password_verify() method
              if(!(password_verify($login_password, $password))){
                $login_fail = true;
                echo("<script>localStorage.setItem('loginStatus', 'false')</script>");
                echo("<script>localStorage.setItem('userId', $user_id)</script>");
                echo("<script>alert('Wrong Password.')</script>");
                echo("<script>location.href = 'login.html'</script>");
              }
              else{
                $sql = "SELECT * FROM cart";
                $result = $connection -> query($sql);
                
                if($result -> num_rows > 0){
                  ?>
                    
                  <html>
                  <script>
                    let cart = {}
                  </script>
                  </html>

                  <?php
                  while($row = $result -> fetch_assoc()){
                    $product_id = $row["productId"];
                    $product_quantity = $row["productQuantity"];
                    ?>

                    <html>
                    <script>
                      cart[<?php echo($product_id); ?>] = <?php echo($product_quantity) ?>;
                      localStorage.setItem("cart", JSON.stringify(cart));
                    </script>
                    </html>

                    <?php
                  }

                  echo("<script>localStorage.setItem('loginStatus', 'true');</script>");
                }

                $login_success = true;
                echo("<script>localStorage.setItem('loginStatus', 'true')</script>");
                echo("<script>localStorage.setItem('userId', $user_id)</script>");
                echo("<h2>Login Successful!</h2>");
                echo("<p>Welcome back, <b>$name</b>!</p>");
                echo("<p>Click <a href='shop/.html'>here</a> to shop.</p>");
              }
            }
          }
          else{
            break;
          }
        }

        //if no email in mysql match with email entered by user...
        if(!$login_success && !$login_fail){
            echo("<script>localStorage.setItem('loginStatus', 'false')</script>");
            echo("<script>alert('Invalid email.')</script>");
            echo("<script>location.href = 'login.html'</script>");
        }
      }
    ?>
  </section>

  <script src="login.js"></script>
</body>
</html>
