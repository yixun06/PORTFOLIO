<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>EcoMart Shop</title>
  <link rel="stylesheet" href="style.css" />

  <script>
    let cart = {}
    localStorage.setItem("cart", JSON.stringify(cart));
  </script>
</head>
<body>
  <header class="header">
    <div class="logo">
      <img src="pic/project logo.png" alt="EcoMart Logo" />
    </div>
    <nav id="nav-links-container-shop">
      <ul class="nav-links">
        <li><a href="main page.html">Home</a></li>
        <li><a href="shop.html" class="active">Shop</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="register.html">Register</a></li>
      </ul>
    </nav>
  </header>

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

//retrieve data from the register form
if($_SERVER["REQUEST_METHOD"] === "POST"){
$user_id = $_POST["user-id"];
}

//retrieve data from mysql
$sql = "SELECT * FROM users u, cart c WHERE u.id = c.id and u.id = '$user_id'";
$result = $connection -> query($sql);

//if there is data in mysql...
if($result -> num_rows > 0){
  echo("<center><h2>Thank you for your purchase</h2>");
  echo("<p>We've received your order will ship in 5 - 7 business days.<br>
  Your order number is $user_id</p>");

  //fetch_assoc = retrieve a row from the table in mysql
  //while there is next row exist
  echo("<div style='margin:40px'>");
  echo("<h3>Order Summary</h3>");
  $total_price = 0;
  while($row = $result -> fetch_assoc()){
    $product_name = $row["productName"];
    $product_price = $row["productPrice"];
    $product_quantity = $row["productQuantity"];
    $product_img = $row["productImg"];
    $total_price_per_product = $product_price * $product_quantity;
    $total_price += $total_price_per_product;

    //save the cart into another table named payment record
    $date = date("Y-m-d", time());
    $time = date("H:i:s", time());
    $sql = "INSERT INTO payment_record (id, productName, productPrice, productQuantity, paymentDate, paymentTime) VALUES ($user_id, '$product_name', $product_price, $product_quantity, '$date', '$time')";
    $connection -> query($sql);

    $sql = "DELETE FROM cart WHERE id = '$user_id'";
    $connection -> query($sql);

    echo("<div style='display:flex; flex-direction:column'>");
    echo("<div><img src='$product_img' style='width:10%;height:10%;'></div>");

    echo("<div>
    <p>Product Name: $product_name<br>
    Product Price: RM$product_price<br>
    Quantity : $product_quantity<br>
    Total: RM$total_price_per_product
    </p>
    </div></div>");
  }
  echo("<p><b>Total Price: RM$total_price</b></p>");
  echo("<button style='width:100px; height:30px; border:none; border-radius:5px; background-color:#2e7d32'><a href='main page.html' style='text-decoration:none; color:white'>Back To Menu</a></button>");
  echo("</div></center>");
}

?>

</body>
</html>