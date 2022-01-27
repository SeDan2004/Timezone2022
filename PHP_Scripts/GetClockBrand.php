<?php
 $database = mysqli_connect('localhost', 'root', 'root', 'timezone_bd');

 function GetClock()
 {
   GLOBAL $database;

   function CheckLimit20($arg)
   {
     GLOBAL $database;

     $str = "SELECT * FROM `brand_clock` bc JOIN `allclock` ac ON bc.id = ac.brand_id
             WHERE `brand` LIKE '%s' ORDER BY RAND() LIMIT 20";
    
     $format = sprintf($str, '%' . $arg[1] . '%');
     $res = mysqli_query($database, $format);
     $res = mysqli_fetch_all($res);

     if ( count($res) !== 20 ) return null;
     return $res;
   }

   $str = "SELECT * FROM `brand_clock`";
   $AllBrands = mysqli_query($database, $str);
   $AllBrands = mysqli_fetch_all($AllBrands);

   $AllBrands = array_filter($AllBrands, 'CheckLimit20');
   $AllBrands = array_slice($AllBrands, 0, count($AllBrands));
   
   $brands = [];

   while ( count($brands) !== 3)
   {
     $LengthArr = count($AllBrands) - 1;
     $RandomElem = rand(0, $LengthArr);
     array_push( $brands, array_splice($AllBrands, $RandomElem, 1, null) );
   }

   for ($i = 0; $i < count($AllBrands); $i++)
   {
     $str = "SELECT * FROM `brand_clock` bc JOIN `allclock` ac ON bc.id = ac.brand_id
             WHERE `brand` LIKE '%s' ORDER BY RAND() LIMIT 20";
     
     $format = sprintf($str, '%' . $AllBrands[$i][1] . '%');
     $res = mysqli_query($database, $format);
     $AllBrands[$i] = mysqli_fetch_all($res);
   }

   echo json_encode($AllBrands);
 }

 GetClock();
?>