<?php 
  
  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
  $str = "SELECT * FROM `brand_clock`";
  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res);

  echo json_encode($res);
?>