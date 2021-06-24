<?php

$id=$_POST['id'];
$name=$_POST['name'];
$type=$_POST['type'];
$total=$_POST['totalAmount'];
$due=$_POST['dueAmount'];
$paid=$_POST['paidAmount'];
$remain=$_POST['remainAmount'];
$con=mysqli_connect("localhost","root","","otb");
    if($con){
        $query="INSERT INTO users VALUES('$id','$name','$type','$total','$due','$paid','$remain')";
        if(mysqli_query($con,$query)){
            echo "<script>window.open('./bank-admin.html','_self');alert('succesfully added');</script>";
        }
        else{
            echo mysqli_query($con,$query);
            echo "<script>window.history.back();alert('failed retry');</script>";
        }
    }
    else{
        echo "<script>window.history.back();alert('connection failed retry');</script>";
    }
echo $id."<br>".$name."<br>".$type."<br>".$total."<br>".$due."<br>".$paid."<br>".$remain;
?>