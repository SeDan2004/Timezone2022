<?php

  require_once('../Upload.php');

  $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');

  $str = "SELECT * FROM `AllClock`";
  $result = mysqli_query($database, $str);
  
  if ($result === false) {

    $str = "CREATE TABLE `allclock` %s";
    $str2 = "(" . 
    "`id` INT AUTO_INCREMENT PRIMARY KEY, " . 
    "`brand_id` INT, " . 
    "`gender_id` INT, " . 
    "`model` TEXT, " . 
    "`country` TEXT, " . 
    "`mechanism_type` TEXT, " .
    "`water_resistance` TEXT, " . 
    "`glass` TEXT, " . 
    "`price` INT, " . 
    "`opisanie` TEXT, " .
    "`link_img` TEXT" . 
    ")";
    
    $format = sprintf($str, $str2);
    mysqli_query($database, $format);

    echo 'Была создана таблица';

  }

  function readCsv($arg) {
    
    global $database;

    function String_To_Array($arg)
    {
      return explode(';', $arg);
    }

    /*function Check_Same_Model($arr_cl)
    {
      $i = 0;

      while ( $i < count($arr_cl) )
      {
        $model_i = $arr_cl[$i][0];
        $model_i = mb_substr($model_i, mb_strrpos($model_i, ' ') + 1);

        for ($m = 0; $m < count($arr_cl); $m++)
        {
          if ($m === $i) continue;
          $model_m = $arr_cl[$m][0];
          $model_m = mb_substr($model_m, mb_strrpos($model_m, ' ') + 1);

          if ($model_i === $model_m)
          {
            $arr_copy = array_merge( array_slice($arr_cl, 0, $m), array_slice($arr_cl, $m + 1) );
            return Check_Same_Model($arr_copy);
          }
        }

        $i++;
      }
      
      return $arr_cl;
    }*/

    function Check_Same_Model($arr_cl)
    {
      function ToAssociateArray($arg)
      {
        // здесь я вырезаю модель из строки и привожу к виду ключ => значение;
        return $arr[] = mb_substr($arg[0], mb_strrpos($arg[0], ' ') + 1);
      }

      function ClearNull($arg)
      {
        if ($arg === null) return null;
        return $arg;
      }

      $ArrModel = array_map('ToAssociateArray', $arr_cl);
      $ArrModel = array_unique($ArrModel);
      $m = 0;
      
      while ($m < count($arr_cl))
      {
        if (array_key_exists($m, $ArrModel) === false) $arr_cl[$m] = null;
        $m++;
      }

      return array_filter($arr_cl, 'ClearNull');
    }

    function CheckClocksInDB($clock_arr)
    {
      global $database;

      function ClearEmpty($arg)
      {
        if ($arg === 'empty') return null;
        return $arg;
      }

      for ($i = 0; $i < count($clock_arr); $i++)
      {
        $model = mb_substr($clock_arr[$i][0], mb_strrpos($clock_arr[$i][0], ' ') + 1);

        $str = "SELECT * FROM `allclock` WHERE model = '$model'";
        $res = mysqli_query($database, $str);
        $res = mysqli_fetch_all($res);

        if (count($res) > 0)
        {
          array_splice($clock_arr, $i, 1, 'empty');
        }
      }
      $clock_arr = array_filter($clock_arr, 'ClearEmpty');
      return $clock_arr;
    }

    function AddClockInDB($clock_arr)
    {
      global $database;

      $iter = 0;

      for ($i = 0; $i < count($clock_arr); $i++)
      {
        $brand_clock = mb_substr($clock_arr[$i][0], 0, mb_strrpos($clock_arr[$i][0], ' '));
        
        $str = "SELECT * FROM `brand_clock` WHERE brand = '$brand_clock'";
        $res = mysqli_query($database, $str);
        $res = mysqli_fetch_all($res);

        if ($brand_clock === '') continue;

        if (count($res) === 0)
        {
          $str = "INSERT INTO `brand_clock` (`brand`) VALUES ('$brand_clock')";
          $res = mysqli_query($database, $str);
          
          $str = "SELECT * FROM `brand_clock` WHERE brand = '$brand_clock'";
          $res = mysqli_query($database, $str);
          $res = mysqli_fetch_all($res);

          $brand_id = (int)$res[0][0];
        }
        else 
        {
          $brand_id = (int)$res[0][0];
        }

        $clock_arr[$i][2] = explode(', ', $clock_arr[$i][2]);
        
        $gender = $clock_arr[$i][2][0];

        if ($gender === 'мужские женские') $gender = 'унисекс';

        $str = "SELECT * FROM `gender_clock` WHERE gender LIKE '%s'";
        $format = sprintf($str, '%' . $gender . '%');
        $res = mysqli_query($database, $format);
        $res = mysqli_fetch_all($res);

        
        $gender = (int)$res[0][0];
        $model = mb_substr($clock_arr[$i][0], mb_strrpos($clock_arr[$i][0], ' ') + 1);
        $country = $clock_arr[$i][2][1];
        $mechanism_type = $clock_arr[$i][2][2];
        $water_resistance = $clock_arr[$i][2][3];
        $glass = str_replace('стекло: ', '', $clock_arr[$i][2][4]);
        $price = $clock_arr[$i][1];
        $opisanie = implode(", ", array_slice($clock_arr[$i][2], 5, count($clock_arr[$i][2]) - 1));
        $link_img = '/' . $clock_arr[$i][3];

        if ( strpos($price, ' ') )
        {
          while ( strpos($price, ' ') !== false)
          {
            $price = str_replace(' ', '', $price);
          }

          $price = (int)$price;
        }

        $str = "INSERT INTO `allclock` %s VALUES %s";
        $need = "(" . 
        "`brand_id`,
         `gender_id`,
         `model`, 
         `country`, 
         `mechanism_type`, 
         `water_resistance`, 
         `glass`, 
         `price`, 
         `opisanie`, 
         `link_img`
         )";

        $values = "('$brand_id', '$gender', '$model', 
                    '$country', '$mechanism_type', '$water_resistance', 
                    '$glass', '$price', '$opisanie', 
                    '$link_img')";

        $str = sprintf($str, $need, $values);
        mysqli_query($database, $str);
        AddNewTags();
        $iter++;
      }

      echo "В таблицу было добавлено: $iter записей!";
      return $iter;
    }

    function AddNewTags()
    {
      GLOBAL $database;
  
      $NxtMonthDate = time() + (3600 * 24 * 30);

      $get_clock_id = "SELECT * FROM `allclock`";
      $res = mysqli_query($database, $get_clock_id);
      $res = mysqli_fetch_all($res);
      
      $id_clock = (int)$res[count($res) - 1][0];
      $addTag = "INSERT INTO `clocks_tags` (`id_clock`, `tag`, `date_delete`, `discount`) VALUES ('%d', '%s', '%s', '%s')";
      $format = sprintf($addTag, $id_clock, "NEW", date('d.m.Y', $NxtMonthDate), "");
      mysqli_query($database, $format);
    }

    $fop = fopen($arg, 'r');
    $fr = fread($fop, filesize($arg));
    $arr_str_clock = explode("\n", $fr);

    array_shift($arr_str_clock);
    array_pop($arr_str_clock);
    
    $arr_clock = array_map('String_To_Array', $arr_str_clock);
    $arr_clock = Check_Same_Model($arr_clock);
    $arr_clock = CheckClocksInDB($arr_clock);
    AddClockInDB($arr_clock);
  }

  for ($i = 0; $i < count($list); $i++) {

    if ($list[$i] === $_POST['name']) {
      readCsv($_SERVER['DOCUMENT_ROOT'] . '/ClockCsv/' . $list[$i]);
      break;
    }

  }

?>