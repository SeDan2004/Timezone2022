<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Оформление заказа</title>
    <link rel='stylesheet' href='/Static/Shop/orders.css'>
</head>
<body>
  
    <form method='POST' action='./submit.php'>
      <div class='DivForm'>
        <input type='text' placeholder='Имя' required name='Username'>
        <input type='tel' placeholder='Телефон' pattern='+[7-8]{1}[0-9]{10}' 
        required name='phone'>
        <input type='text' placeholder='Адрес' required name='adress'>
        <input type='submit' value='Подтвердить'>
      </div>
    </form>

  <script src='/Static/Shop/orders.js'></script>
</body>
</html>