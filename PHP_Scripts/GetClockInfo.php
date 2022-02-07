<?php 

  require_once($_SERVER['DOCUMENT_ROOT'] . '/settings.php');

  $database = mysqli_connect($HOST, $USER_DB, $PASSWORD_DB, $DATABASE);
  $id_clock = $_POST['id_clock'];
  
  $str = "SELECT * FROM `allclock` WHERE `id` = '$id_clock'";

  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res)[0];

  $id = $res[0];
  $res = array_slice($res, 4, 6);


  $res[4] = $res[5];
  
  array_unshift($res, $id);
  array_pop($res);
  
  echo json_encode($res);