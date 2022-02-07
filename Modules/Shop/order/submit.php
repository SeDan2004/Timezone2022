<?php

$curl = curl_init();

$url = "https://securepay.tinkoff.ru/v2/Init";
$args = ["TerminalKey" => "TinkoffBankTest",
        "Amount" => "50000",
        "OrderId" => "cajdqwe0qe2dqw",
        "Description" => "test"];
$args = json_encode($args);

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $args);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
));

$out = curl_exec($curl);
$json = json_decode($out);

header("location: $json->PaymentURL");

var_dump($json->PaymentURL);