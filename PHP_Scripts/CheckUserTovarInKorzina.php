<?php

  require_once('../settings.php');

  function getIdClock($arg) {
    return $arg[5];
  }

  $database = mysqli_connect($HOST, $USER_DB, $PASSWORD_DB, $DATABASE);
  $phpsess_cookie = $_COOKIE['PHPSESSID'];
  $str = "SELECT * FROM `orders` ord JOIN `backets` bct ON ord.id = bct.id_backet WHERE 
          `session_key` = '$phpsess_cookie'";
  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res);

  $id_clocks_arr = array_map('getIdClock', $res);
  echo json_encode($id_clocks_arr);
?>