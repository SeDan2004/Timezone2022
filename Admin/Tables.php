<?php 
  if ( !isset($_GET['type']) ) header('location: Admin.php');

  switch($_GET['type'])
  {
    case 'tovary':
      $name = 'Товары';
    break;

    case 'users':
      $name = 'Пользователи';
    break;

    case 'orders':
      $name = 'Заказы';
    break;
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <link rel='stylesheet' href='Tables.css'>
    <title>Товары</title>
</head>
<body>
  <header>
    <div class='headerDiv'>
      <h1 class='TypeTable'><?php echo $name?></h1>
      <!--<div class='col-10'></div>-->
      <div class='pageButtonsDiv'></div>
    </div>
  </header>

  <div class='Content' id='Table'>
    <div v-for='(i, ind) in list' class='IterDiv'>
      <div class='ClockDiv'>
        <h3 class='ModelClockTxt row'>Часы: {{i.clockName}}</h3>
        <div class='ContentClock row'>
          <img v-bind:src='i.imgSrc'>
          <div class='Opisanie col-6'>
            <h3>Описание:</h3>
            <h5>Характеристики: {{i.character}}</h5>
            <h5>Тег: {{i.tag}}</h5>
            <h5>Цена: {{i.price}}</h5>
          </div>
          <div class='ClocksBtns col-4'>
            <input type="button" value="Редактировать" v-on:click='btnsFunc'>
            <input type="button" value="Удалить" v-on:click='btnsFunc'>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src='Tables.js'></script>
</body>
</html>