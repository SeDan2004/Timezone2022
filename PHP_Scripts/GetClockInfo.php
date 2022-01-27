<?php 

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
  $model = $_POST['Model'];
  
  $str = "SELECT * FROM `allclock` WHERE `model` = '$model'";

  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res)[0];

  $id = $res[0];
  $res = array_slice($res, 4, 6);


  $res[4] = $res[5];
  
  array_unshift($res, $id);
  array_pop($res);
  
  echo json_encode($res);