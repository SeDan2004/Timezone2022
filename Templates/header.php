<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/Static/Other/index.css'>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js'></script>
    <title>TIMEZONE</title>
</head>
<body>

  <div class='wrapper'>

    <div class='TovarBox'>

      <div class='TovarBoxHeader row'>
        <div class='col-3'></div>
        <h4 class='col-6'>Информация о товаре</h4>
        <div class='col-2'></div>
        <input type='button' value='X' class='CloseButtonTovarBox'>
      </div>

      <div class='TovarBoxContent'>
        
        <img src=''>
        <div class='Inf'>
          <h4></h4>
          <h5></h5>
          <h2></h2>
        </div>

      </div>

      <div class='TovarBoxFooter'>
        <input type='button' value='В корзину'>
      </div>

      <div class='CommentArea'>
        <div class='HeaderComment'>
          <h3>Отзывы</h3>
          <h5 class='countComments'>Всего:</h5>
          <h5></h5>
        </div>

        <div class='CommentDiv'>
          
        </div>

        <div class='NavigateCommentButtons'>
          <div class='LeftArrow'></div>
          <div class='RightArrow'></div>
        </div>

        <div class='WriteCommentDiv'>
          <h3>Оставить отзыв</h3>

          <div class='TextWarning'>
            <p>Warning</p>
          </div>

          <textarea rows='2' class='CommentWindow' maxlength='1000'></textarea>

          <div>
            <h1 class="Star">★</h1>
            <h1 class="Star">★</h1>
            <h1 class="Star">★</h1>
            <h1 class="Star">★</h1>
            <h1 class="Star">★</h1>
            <div style='width: 25%'></div>
            <input type='button' value='Очистить'>
            <input type='button' value='Подтвердить'>
          </div>
        </div>

      </div>

    </div>

  </div>
<?php 
require_once('Modules/Header/head.php');
?>