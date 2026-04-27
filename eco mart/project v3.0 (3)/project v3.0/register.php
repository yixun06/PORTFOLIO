<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register - EcoMarket</title>
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
        <li><a href="login.html">Login</a></li>
        <li><a href="register.html" class="active">Register</a></li>
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

      //retrieve data from the register form
      if($_SERVER["REQUEST_METHOD"] === "POST"){
        $register_name = $_POST["name"];
        $register_email = $_POST["email"];
        $register_password = $_POST["password"];
      }

      //retrieve data from mysql
      $sql = "SELECT * FROM users";
      $result = $connection -> query($sql);

      //if there is data in mysql...
      if($result -> num_rows > 0){
        $already_exist = false;

        //fetch_assoc = retrieve a row from the table in mysql
        //while there is next row exist
        while($row = $result -> fetch_assoc()){
          if(!$already_exist){
            $name = $row["name"];
            $email = $row["email"];

            //check whether the username or the email has been registered
            if($register_name === $name){
              echo("<script>alert('The username has already exists.')</script>");
              $already_exist = true;
            }
            if($register_email === $email){
              echo("<script>alert('The email has already exists.')</script>");
              $already_exist = true;
            }
          }
        }
        
        //save the username, email and password into mysql if they are not registered before
        if(!$already_exist){
          //hashed the password for security
          $hashed_password = password_hash($register_password, PASSWORD_DEFAULT);

          //prepare the SQL statement to insert user data
          $stmt = $connection -> prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
          $stmt -> bind_param("sss", $register_name, $register_email, $hashed_password);

          //execute the statement and check if successful
          if($stmt -> execute()){
            $user_id = $connection -> insert_id;

            //output the user's input
            echo("<h2>REGISTRATION SUCCESSFUL</h2>");
            echo("<p><b>Name:</b> $register_name</p>");
            echo("<p><b>Email:</b> $register_email</p>");
            echo("<p><b>ID:</b> $user_id<p>");
            echo("<p>Click <a href='login.html'>here</a> to login.</p>");
          }
          else{
            echo("Error " . $stmt -> error);
          }

          //close the statement
          $stmt -> close();
        }
        else{
          //back to registration page if the entered username or email is being registered
          echo("<script>location.href = 'register.html'</script>");
        }
      }
      //if there is no data in sql...
      else{
        //hashed the password for security
        $hashed_password = password_hash($register_password, PASSWORD_DEFAULT);

        //prepare the SQL statement to insert user data
        $stmt = $connection -> prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt -> bind_param("sss", $register_name, $register_email, $hashed_password);

        //execute the statement and check if successful
        if($stmt -> execute()){
          $user_id = $connection -> insert_id;

        //output the user's input
          echo("<h2>REGISTRATION SUCCESSFUL</h2>");
          echo("<p><b>Name:</b> $register_name</p>");
          echo("<p><b>Email:</b> $register_email</p>");
          echo("<p><b>ID:</b> $user_id<p>");
          echo("<p>Click <a href='login.html'>here</a> to login.</p>");
        }
        else{
          echo("Error " . $stmt -> error);
        }

        //close the statement
        $stmt -> close();
      }

      //close the connection
      $connection -> close();
    ?>
  </section>
</body>
</html>