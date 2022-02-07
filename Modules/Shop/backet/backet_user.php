<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/Static/Shop/backet/backet_user.css'>
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous">
    </script>
    <title>Моя корзина</title>
</head>
<body>

  <h2 class='KorzinaTxt'>Корзина</h2>
  <?php

    function TovarInformationGet() {
      $root = $_SERVER['DOCUMENT_ROOT'];
      require_once($root . '/settings.php');
      
      $database = mysqli_connect($HOST, $USER_DB, $PASSWORD_DB, $DATABASE);
      $phpsess_cookie = $_COOKIE['PHPSESSID'];

      function GetInfClock($arg) {
        return [
          $arg[0],
          $arg[3], $arg[7], $arg[8], $arg[9],
          $arg[10], $arg[11], $arg[12], $arg[13],
          $arg[14], $arg[16]
        ];
      }

      $str = 
        "SELECT * FROM `orders` WHERE `session_key` = '$phpsess_cookie'";

      $res = mysqli_query($database, $str);
      $res = mysqli_fetch_all($res);

      $id_clocks = $res[0][0];

      $str = 
        "SELECT * FROM `backets` bct JOIN `allclock` ac ON
         bct.tovar_id = ac.id JOIN `brand_clock` bc ON
         ac.brand_id = bc.id
         WHERE bct.id_backet = $id_clocks";

      $res = mysqli_query($database, $str);
      $res = mysqli_fetch_all($res);
      $res = array_map('GetInfClock', $res);
      
      return count($res) > 0 ? $res : count($res);
    }

    $arr_clock = TovarInformationGet();

    if ( is_array($arr_clock) === false) {
  ?>

  <p class='EmptyTxt'>Корзина пуста!</p>

  <?php
    } else {
  ?>

  <div class='TovarDiv'>

  <?php
      $price = 0;

      for ($i = 0; $i < count($arr_clock); $i++) {
        $clockinf = $arr_clock[$i];
        $inf = "$clockinf[3], $clockinf[4],
                $clockinf[5], стекло: $clockinf[6], $clockinf[8]";

        $price += (int)$clockinf[7];     
  ?>

  <div class='Clock_Div' id='<?php echo $clockinf[0]?>'>
    <div class='ImageBox'>
      <img src=<?php echo $clockinf[9]?>>
    </div>
    <div class='DivClockInf'>
      <h4>Модель</h4>
      <span class='Model'>
        <?php echo $clockinf[count($clockinf) - 1] . ' ' . $clockinf[2];?>
      </span>
      <h4>Описание</h4>
      <span class='Opisanie'>
        <?php echo $inf;?>
      </span>
      <h4>Цена: <?php echo number_format((int)$clockinf[7], 0, ',', ' ')?> Руб</h4>
    </div>
    <div class='MenuButtons'>
      <img src='/IconAndImages/close_black_36dp.svg' class='DeleteButton'>
      <div class='buttonsDiv'>
        <h2>Кол-во: <?php echo $clockinf[1]?></h2>
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg>
      </div>
    </div>
  </div>

  <?php
      }
  ?>

  </div>

  <?php 
    }
  ?>

  <!--../order/order.php-->
  <div class='FinishPrice'>
  <h1>Итого: <?php echo number_format($price, 0, ',', '.');?> RUB</h1>
  </div>

  <footer>
    <input type='button' value='На главную'>
    <div style='width: 80%'></div>
    <input type='button' value='Очистить корзину'>
    <input type='button' value='Оформить заказ'>
  </footer>

  <script src='/Static/Shop/backet/backet_user.js'></script>
</body>
</html>