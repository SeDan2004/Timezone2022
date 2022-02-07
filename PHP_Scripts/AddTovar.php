<?php
  session_start();
  require_once('../settings.php');

  $database = mysqli_connect($HOST, $USER_DB, $PASSWORD_DB, $DATABASE);
  
  function CheckKey() {
    GLOBAL $database;

    $phpsess_cookie = $_COOKIE['PHPSESSID'];
    
    if ( isset($_POST['id_clock']) ) {
      $id_clock = $_POST['id_clock'];
      $date_add = date('Y/m/d');
    }

    $str = "SELECT * FROM `orders` WHERE `session_key` = '$phpsess_cookie'";

    $res = mysqli_query($database, $str);
    $res = mysqli_fetch_all($res);

    if (count($res) === 0) {
      $str = "INSERT INTO `orders` (`session_key`, `date_add`) VALUES ('$phpsess_cookie', '$date_add')";
      $res = mysqli_query($database, $str);
      $id = $database->insert_id;

      $str = "INSERT INTO `backets` (`id_backet`, `tovar_id`, `count`) VALUES ('%d', '%d', '%d')";
      $format = sprintf($str, $id, $id_clock, 1);
      $res = mysqli_query($database, $format);
    } else {
     
      $str = "SELECT `id` FROM `orders` WHERE `session_key` = '$phpsess_cookie'";
      $res = mysqli_query($database, $str);
      $res = mysqli_fetch_all($res);
      $id_row = $res[0][0];

      $str = "INSERT INTO `backets` (`id_backet`, `tovar_id`, `count`) VALUES ('%d', '%d', '%d')";
      $format = sprintf($str, $id_row, $id_clock, 1);
      $res = mysqli_query($database, $format);

    }
  }

  CheckKey();
?>