<?php 

  require_once($_SERVER['DOCUMENT_ROOT'] . '/settings.php');

  $database = mysqli_connect($HOST, $USER_DB, $PASSWORD_DB, $DATABASE);
  

  function DeleteClockInBackets() {
    GLOBAL $database;
    $id = $_POST['id'];

    $str = "DELETE FROM `backets` WHERE `id` = '$id'";
    mysqli_query($database, $str);
  }

  switch($_POST['callfunc']) {
      case 'Delete':
        DeleteClockInBackets();
      break;
  }

?>