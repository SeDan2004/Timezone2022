<?php

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');

  function UpdateLike()
  {
    GLOBAL $database;

    if ( isset($_POST['ValueTwo']) )
    {
      $str = "UPDATE `comments` SET `CountDislikes` = '%s' WHERE `id` = '%s'";
      $format = sprintf($str, $_POST['ValueTwo'], $_POST['CommentId']);

      $res = mysqli_query($database, $format);
    }

    $str = "UPDATE `comments` SET `CountLikes` = '%s' WHERE `id` = '%s'";
    $format = sprintf($str, $_POST['Value'], $_POST['CommentId']);

    $res = mysqli_query($database, $format);
    
    echo 'green';
  }

  function UpdateDislike()
  {
    GLOBAL $database;

    if ( isset($_POST['ValueTwo']) )
    {
      $str = "UPDATE `comments` SET `CountLikes` = '%s' WHERE `id` = '%s'";
      $format = sprintf($str, $_POST['ValueTwo'], $_POST['CommentId']);

      $res = mysqli_query($database, $format);
    }

    $str = "UPDATE `comments` SET `CountDislikes` = '%s' WHERE `id` = '%s'";
    $format = sprintf($str, $_POST['Value'], $_POST['CommentId']);

    $res = mysqli_query($database, $format);

    echo 'red';
  }

  $_POST['CheckMark'] === 'Like' ? UpdateLike() : UpdateDislike();