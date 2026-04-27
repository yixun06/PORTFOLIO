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

if($_SERVER["REQUEST_METHOD"] === "POST"){
  $user_id = $_POST["user-id"];
  $current_page = $_POST["current-page"];
}

$sql_delete = "DELETE FROM cart WHERE id='$user_id'";
$connection -> query($sql_delete);

if($current_page === "main"){
  echo("<script>location.href = 'main page.html'</script>");
}
else if($current_page === "shop"){
  echo("<script>location.href = 'shop.html'</script>");
}

$connection -> close();
?>