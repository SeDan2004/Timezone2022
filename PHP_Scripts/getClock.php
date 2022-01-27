<?php 
  function getClock($value = 50)
  {
    $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');
    
    $str = "SELECT * FROM `brand_clock` bc JOIN `allclock` ac ON ac.brand_id = bc.id ORDER BY RAND()";
    $res = mysqli_query($database, $str);
    $res = mysqli_fetch_all($res);
    
    $ClocksArr = [];
    $res_copy = $res;

    for ($i = 1; $i <= ceil( count($res) / $value ); $i++)
    {
      array_push($ClocksArr, array_splice($res_copy, 0, 50));
      $res_copy = array_slice($res_copy, 0, count($res_copy)); 
    }

    
    echo json_encode($ClocksArr);
  }

  isset($_POST['value']) === false ? getClock() : getClock($_POST['value']);
?>