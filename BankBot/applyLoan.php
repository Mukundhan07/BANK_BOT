<?php
if(isset($_POST['submit'])){
    $name = $_POST['applicant-name'];
$proof = $_FILES["proof-doc"];
$proof_name = $proof['name'];
$proof_type = $proof['type'];
$proof_size = $proof['size'];
$proof_path = $proof['tmp_name'];
$income = $_FILES["income-doc"];
$income_name = $income['name'];
$income_type = $income['type'];
$income_size = $income['size'];
$income_path = $income['tmp_name'];
$con=mysqli_connect("localhost","root","","otb");
    if($con){
        if(move_uploaded_file($proof_path,'proof-docs/'.$proof_name)
                &&move_uploaded_file($income_path,'income-docs/'.$income_name)){
                    $query="INSERT INTO loanrequests VALUES(0,'$name','home','$proof_name','$income_name','')";
        if(mysqli_query($con,$query)){
            echo "<script>window.open('./chatbot.html','_self');alert('succesfully applied');</script>";
        }
        else{
            echo mysqli_query($con,$query);
            echo "<script>window.history.back();alert('failed retry');</script>";
        }
        }   
        else{
            echo "<script>window.history.back();alert('file upload failed retry');</script>";
        }
        
    }
    else{
        echo "<script>window.history.back();alert('connection failed retry');</script>";
    }
    echo $proof_name.$income_name;
}

?>