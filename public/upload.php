<?php


    $servername = "localhost";
    $username = "together";
    $password = "together";
    $dbname = "together_db";


    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "SELECT MAX(id) FROM Photos";
    $result = $conn->query($sql);

    $row = $result->fetch_row();

    $num = $row[0] + 1;

    $conn->close();

    $filename = "image" . $num . ".png";

    // Get image string posted from Android App
    $base=$_REQUEST['image'];

    // Decode Image
    $binary=base64_decode($base);
    header('Content-Type: bitmap; charset=utf-8');
    // Images will be saved under 'www/imgupload/uplodedimages' folder
    $file = fopen('images/'.$filename, 'wb');
    // Create File
    fwrite($file, $binary);
    fclose($file);
    echo 'Image upload complete, Please check your php file directory';
?>