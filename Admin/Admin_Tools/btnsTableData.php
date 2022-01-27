<?php 

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');

  if ( isset($_POST['price']) )
  {
    $name = $_POST['list']['clockName'];
    $price = (double)$_POST['price'];
    $model = mb_substr($name, mb_strrpos($name, ' ') + 1);

    $str = "UPDATE `allclock` SET `price` = $price WHERE `model` LIKE '%$model%'";
    $res = mysqli_query($database, $str);
  }

  if ( isset($_POST['discount']) )
  {
    $name = $_POST['list']['clockName'];
    $model = mb_substr($name, mb_strrpos($name, ' ') + 1);

    $str = "SELECT * FROM `clocks_tags` ct JOIN `allclock` ac ON ct.id_clock = ac.id
            WHERE `model` LIKE '%$model%'";

    $res = mysqli_query($database, $str);
    $res = mysqli_fetch_all($res);
    
    if ( count($res) )
    {
      
      if ($_POST['discount'] !== '0')
      {
        $id_clock = $res[0][1];
        $discount = $_POST['discount'];
      
        $str = "UPDATE `clocks_tags` SET `discount` = $discount WHERE 
                `id_clock` = $id_clock";

        mysqli_query($database, $str);
      }
      else 
      {
        $id_clock = $res[0][1];

        $str = "UPDATE `clocks_tags` SET `discount` = '' WHERE
                `id_clock` = $id_clock";
        
        mysqli_query($database, $str);

        echo json_encode($res[0][13]);
      }
    }
    else 
    {
      
      if ($_POST['discount'] !== '0')
      {
        $discount = $_POST['discount'];
        $clock_id = $_POST['list']['id'];

        $str = "INSERT INTO `clocks_tags`
                (`id_clock`, `tag`, `date_delete`, `discount`)
                VALUES
                ('$clock_id', '', '', '$discount')";

        $res = mysqli_query($database, $str);
      }

    }
  }

  if ( isset($_POST['del']) )
  {
    $id = $_POST['list']['id'];
    
    $str = "SELECT * FROM `clocks_tags` WHERE `id_clock` = $id";
    $res = mysqli_query($database, $str);
    $res = mysqli_fetch_all($res);

    for ($i = 0; $i < count($res); $i++)
    {
      $current_id = $res[$i][0];

      $str = "DELETE FROM `clocks_tags` WHERE `id` = $current_id";
      $res = mysqli_query($database, $str);
    }

    $str = "DELETE FROM `allclock` WHERE `id` = $id";
    $res = mysqli_query($database, $str);
  }