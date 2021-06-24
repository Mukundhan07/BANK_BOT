<?php
    $req=$_REQUEST['chatAnswers'];
    $answers=explode(",",$req);
    $reasonFile="";
    $validAnswers=array();
    $path='';
    for($i=0;$i<count($answers);$i++){
        
        
        if($i==8){
            $path=$answers[$i];
            $t=explode("\\",$answers[$i]);
            $reasonFile=$t[count($t)-1];
            array_push($validAnswers,$reasonFile);
        }else{
            array_push($validAnswers,$answers[$i]);
        }
        echo $i." . ".$validAnswers[$i]."<br>";
    }
    
    if(move_uploaded_file($path,"reason-files/".$reasonFile)){
        echo "<script>alert('file uploaded');</script>";
    }
    else{
        //echo "<script>alert('file upload failed retry');</script>";
    }
    $con=mysqli_connect("localhost","root","","otb");
    if($con){
        $query="INSERT INTO chats VALUES('$validAnswers[0]','$validAnswers[1]','$validAnswers[2]','$validAnswers[3]','$validAnswers[4]','$validAnswers[5]','$validAnswers[6]','$validAnswers[7]','$validAnswers[8]',0)";
        if(mysqli_query($con,$query)){
            echo "<script>window.history.back();alert('thank you');</script>";
        }
        else{
            echo mysqli_query($con,$query);
            echo "<script>window.history.back();alert('failed retry');</script>";
        }
    }
    else{
        echo "<script>window.history.back();alert('failed retry');</script>";
    }
    //echo $userId[0];
?>