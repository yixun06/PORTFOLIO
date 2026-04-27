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
  die("Connection failed: " . $connection -> connect_error);
}

//retrieve data of the product
if($_SERVER["REQUEST_METHOD"] === "POST"){
  $img_id = $_POST["img-id"];
  $current_page = $_POST["current-page"];
  $user_id = $_POST["user-id"];
  $product_name = $_POST["product-name"];
  $product_price = $_POST["product-price"];
  $product_quantity = $_POST["product-quantity"];
  $product_img = $_POST["product-img"];
  $product_id = $_POST["product-id"];
}

//check whether the product already exist in database
//retrieve data from database
$sql = "SELECT * FROM cart";
$result = $connection -> query($sql);
$product_already_exist = false;

//if there is data in mysql...
if($result -> num_rows > 0){
  //fetch_assoc = retrieve a row from the table in mysql
  //while there is next row exist...
  while($row = $result -> fetch_assoc()){
    $user_id_exist = $row["id"];
    $product_name_exist = $row["productName"];

    if($user_id_exist == $user_id && $product_name_exist == $product_name){
      $product_already_exist = true;
      $sql_delete = "UPDATE cart SET productQuantity = '$product_quantity' WHERE productName = '$product_name'";
      $connection -> query($sql_delete);
    }
  }
}

//prepare the SQL statement to insert user data
$stmt = $connection -> prepare("INSERT INTO cart (id, productName, productPrice, productQuantity, productImg, productId) VALUES (?, ?, ?, ?, ?, ?)");
$stmt -> bind_param("ssssss", $user_id, $product_name, $product_price, $product_quantity, $product_img, $product_id);

if(!$product_already_exist){
  //execute the statement and check if successful
  if($stmt -> execute()){
    if($current_page === "main"){
      echo("<script>location.href = 'main page.html'</script>");
    }
    else if($current_page === "shop"){
      echo("<script>location.href = 'shop.html'</script>");
    }
  }
  else{
    echo("Error " . $stmt -> error);
  }
}
else{
  if($current_page === "main"){
      echo("<script>location.href = 'main page.html'</script>");
    }
  else if($current_page === "shop"){
    echo("<script>location.href = 'shop.html'</script>");
  }
}

//delete product that quantity is 0
$sql_delete = "DELETE FROM cart WHERE productQuantity = 0";
$connection -> query($sql_delete);

$stmt -> close();
$connection -> close();
?>