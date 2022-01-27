<?php 
  
  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
  $current_time = time();

  $str = "SELECT * FROM `clocks_tags` WHERE `date_delete`";
  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res);

  for ($i = 0; $i < count($res); $i++)
  {
    if ( strtotime(date('d.m.Y')) >= strtotime($res[$i][3]) )
    {
      $id = $res[$i][0];

      if ($res[$i][4] === '')
      {
        $str = "DELETE FROM `clocks_tags` WHERE `id` = $id";
        $res1 = mysqli_query($database, $str);
      }
      else 
      {
        $str = "UPDATE `clocks_tags` SET `tag` = '', `date_delete` = '' WHERE `id` = $id";
        $res2 = mysqli_query($database, $str);
      }
    }
  }
?>