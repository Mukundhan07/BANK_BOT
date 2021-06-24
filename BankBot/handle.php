<?php
$stat=$_REQUEST['stat'];
$sno=$_REQUEST['sno'];
$con=mysqli_connect("localhost","root","","otb");
if($con){
    if($sno==0){
        $query="DELETE FROM users WHERE id='$stat'";
    }
    else if($sno==1){
        $query="DELETE FROM chats WHERE sno='$stat'";
    }
    else if($sno==2){
        $query="UPDATE loanrequests SET status='accepted' WHERE sno='$stat'";
    }
    else if($sno==3){
        $query="UPDATE loanrequests SET status='declined' WHERE sno='$stat'";
    }
    if(mysqli_query($con,$query)){
        echo "<script>window.open('./bank-admin.html','_self');alert('succesfully updated');</script>";

    }
    else{
        echo mysqli_query($con,$query);
        echo "failed :".$query.'<br>';
        //echo "<script>window.history.back();alert('failed retry');</script>";
    }
}
else{
    echo "<script>window.history.back();alert('connection failed retry');</script>";
}
echo $stat."----".$sno;
?>