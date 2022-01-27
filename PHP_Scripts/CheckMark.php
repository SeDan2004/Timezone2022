<?php 

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');

  $str = "UPDATE `comments` SET `CountLike` = 0, `CountDislike` = 0";
  $res = mysqli_query($database, $str);