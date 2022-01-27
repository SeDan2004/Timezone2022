<?php

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');

  function GetCount()
  {
    GLOBAL $database;

    $str = "SELECT COUNT(*) FROM `comments` WHERE `id_clock` = '%s'";
    $format = sprintf($str, $_POST['id_clock']);

    $res = mysqli_query($database, $format);
    $res = mysqli_fetch_all($res);

    $arr_buttons = [];
    $count = (int)$res[0][0];
    $boof = $count;
    $i = 1;

    $count /= 25;
    $count = ceil($count);

    while ($i <= $count)
    {
      array_push($arr_buttons, $i);
      $i++;
    }

    array_push($arr_buttons, $boof);

    echo json_encode($arr_buttons);
  }

  function GetComments()
  {
    GLOBAL $database;

    function sortArr($arg)
    {
      return [
        $arg[3], $arg[4],
        $arg[5], $arg[6],
        $arg[7], $arg[9],
        $arg[0]
      ];
    }

    $offset = (int)$_POST['offset'];

    $str = "SELECT * FROM `comments` cm LEFT JOIN `timezone_users` tb ON cm.user_id = tb.id
            WHERE cm.id_clock = '%s'";
  
    $format = sprintf($str, $_POST['id_clock']);

    $res = mysqli_query($database, $format);
    $res = mysqli_fetch_all($res);

    $res = array_slice($res, ($offset - 1) * 25, 25);
    
    $res = array_map('sortArr', $res);
    
    echo json_encode($res);
  }
  
  isset($_POST['Count']) ? GetCount() : GetComments(); 