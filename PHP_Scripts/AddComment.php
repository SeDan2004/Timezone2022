<?php

  session_start();
  
  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
  
  if ( isset($_SESSION['login']) )
  {
    $login = $_SESSION['login'];
    $pass = $_SESSION['password'];

    $str = "SELECT * FROM `timezone_users` WHERE `login` = '%s' AND
            `password` = '%s'";

    $format = sprintf($str, $login, $pass);

    $res = mysqli_query($database, $format);
    $res = mysqli_fetch_all($res);

    $id_user = $res[0][0];

    $str = "INSERT INTO `comments`
    (`id_clock`, `user_id`, `comment`, `mark`, `date_add`, `CountLikes`, `CountDislikes`)
    VALUES
    ('%s', '%s', '%s', '%s', '%s', '%s', '%s')";

    $format = sprintf(
      $str,
      $_POST['id_clock'],
      $id_user,
      $_POST['comment'],
      $_POST['mark'],
      $_POST['date_add'],
      0,
      0
    );

    $res = mysqli_query($database, $format);
    $arr = [ $_SESSION['login'], $_POST['mark'], $_POST['date_add'], $_POST['comment'] ];

    echo json_encode($arr);
  }
  else 
  {
    $str = "INSERT INTO `comments`
    (`id_clock`, `user_id`, `comment`, `mark`, `date_add`, `CountLikes`, `CountDislikes`)
    VALUES
    ('%s', '%s', '%s', '%s', '%s', '%s', '%s')";

    $format = sprintf(
    $str,
    $_POST['id_clock'],
    0,
    $_POST['comment'],
    $_POST['mark'],
    $_POST['date_add'],
    0,
    0
    );

    $res = mysqli_query($database, $format);
    $arr = [ 'Аноним', $_POST['mark'], $_POST['date_add'], $_POST['comment'] ];

    echo json_encode($arr); 
  }