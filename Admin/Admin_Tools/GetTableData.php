<?php 
  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
  $type = $_POST['type'];
  $offset = isset($_POST['offset']) ? $_POST['offset'] : 0;
  
  if ($type === 'count')
  {
    if ($_POST['GetT'] === 'tovary')
    {
      $str = "SELECT COUNT(*) FROM `allclock` ac JOIN `brand_clock` bc ON ac.brand_id = bc.id";
      $res = mysqli_query($database, $str);
      $res = mysqli_fetch_all($res);

      echo $res[0][0];
    }
  }

  if ($type === 'tovary')
  {
    $str = "SELECT * FROM `allclock` ac JOIN `brand_clock` bc ON ac.brand_id = bc.id
            LEFT JOIN `clocks_tags` ct ON ac.id = ct.id_clock LIMIT 50 OFFSET $offset";

    $res = mysqli_query($database, $str);
    $res = mysqli_fetch_all($res);

    echo json_encode($res);
  }

  if ($type === 'users')
  {
    $str = "SELECT * FROM `timezone_users`";
    $res = mysqli_query($database, $str);
    $res = mysqli_fetch_all($res);

    echo json_encode($res);
  }
?>