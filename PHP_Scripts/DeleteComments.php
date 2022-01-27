<?php 

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
  $current_date = date('d.m.Y');

  $str = "SELECT COUNT(*) FROM `comments`";
  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res);
  
  if ( (int)$res[0][0] > 2000 )
  {
    $str = "DELETE FROM `comments` WHERE NOT `date_add` = '$current_date'";
    $res = mysqli_query($database, $str);
  }