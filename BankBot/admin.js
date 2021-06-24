var users;
var userChats;
var loanRequests;
function load() {
    fetch("http://localhost:6061/get-all-details")
      .then((request) => request.json())
      .then((res) => {
        this.users = res;
      })
      .catch((error) => {
        console.log(error);
      });
      fetch("http://localhost:6061/get-user-chats")
      .then((request) => request.json())
      .then((res) => {
        this.userChats = res;
      })
      .catch((error) => {
        console.log(error);
      });
      fetch("http://localhost:6061/get-loan-requests")
      .then((request) => request.json())
      .then((res) => {
        this.loanRequests = res;
      })
      .catch((error) => {
        console.log(error);
      });
      //openUsers();
}

function getLoanRequestTable(){
    var usersTable=document.getElementById('reqs-table');
    if(!isEmpty(loanRequests)){
        loanRequests.forEach(element => {
            var tr=document.createElement('tr');
            var td=document.createElement('td');
            var text=document.createTextNode(element.sno);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.name);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.type);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            var a=document.createElement('a');
            a.setAttribute("href","./proof-docs/"+element.proof);
            a.setAttribute("onclick","downloadDocs("+element.proof+")");
            text=document.createTextNode(element.proof);
            a.appendChild(text);
            td.appendChild(a);
            tr.appendChild(td);
            td=document.createElement('td');
            a=document.createElement('a');
            a.setAttribute("href","./income-docs/"+element.income);
            a.setAttribute("onclick","downloadDocs("+element.proof+")");
            text=document.createTextNode(element.income);
            a.appendChild(text);
            td.appendChild(a);
            tr.appendChild(td);
            if(isEmpty(element.status)){
                td=document.createElement('td');
            var button=document.createElement("button");
            button.style.background="#0074d9";
            button.style.color="white";
            text=document.createTextNode("Accept");
            button.appendChild(text);
            button.setAttribute("onclick","acceptRequest("+element.sno+")");
            td.appendChild(button);
            tr.appendChild(td);
            td=document.createElement('td');
            button=document.createElement("button");
            button.style.background="#e12120";
            button.style.color="white";
            text=document.createTextNode("Decline");
            button.appendChild(text);
            button.setAttribute("onclick","declineRequest("+element.sno+")");
            td.appendChild(button);
            tr.appendChild(td);
            
            }
            else{
                td=document.createElement('td');
            text=document.createTextNode(element.status);
            if(element.status==='accepted'){
                td.style.color="green";
            }
            else{
                td.style.color="#e12120";
            }
            td.colSpan=2;
            td.appendChild(text);
            tr.appendChild(td);
            }
            usersTable.appendChild(tr);
            
        });
    }else{
        usersTable.innerHTML="<h1>No Chats Found</h1>";
    }
    return usersTable; 
}


function getUserChatsTable(){
    var usersTable=document.getElementById('chats-table');
    if(!isEmpty(userChats)){
        userChats.forEach(element => {
            var tr=document.createElement('tr');
            var td=document.createElement('td');
            var text=document.createTextNode(element.sno);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.id);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.name);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.economicStatusFall);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.overcome);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.companyResume);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.source);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.postpone);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.resumeDate);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            var a=document.createElement('a');
            a.setAttribute("href","./reason-files/"+element.reasonFile);
            text=document.createTextNode(element.reasonFile);
            a.appendChild(text);
            td.appendChild(a);
            tr.appendChild(td);
            td=document.createElement('td');
            var button=document.createElement("button");
            button.style.background="#e12120";
            button.style.color="white";
            text=document.createTextNode("Remove");
            button.appendChild(text);
            button.setAttribute("onclick","deleteChat("+element.sno+")");
            td.appendChild(button);
            tr.appendChild(td);
            usersTable.appendChild(tr);
        });
    }else{
        usersTable.innerHTML="<h1>No Chats Found</h1>";
    }
    return usersTable; 
}
function getUsersTable(){
    var usersTable=document.getElementById('users-table-field');
    if(!isEmpty(users)){
        users.forEach(element => {
            var tr=document.createElement('tr');
            var td=document.createElement('td');
            var text=document.createTextNode(element.id);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.name);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.type);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.totalAmount);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.dueAmount);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.paidAmount);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            text=document.createTextNode(element.remainAmount);
            td.appendChild(text);
            tr.appendChild(td);
            td=document.createElement('td');
            var button=document.createElement("button");
            button.style.background="#0074d9";
            button.style.color="white";
            text=document.createTextNode("Edit");
            button.appendChild(text);
            button.setAttribute("onclick","editUser("+element.id+")");
            td.appendChild(button);
            tr.appendChild(td);
            td=document.createElement('td');
            var button=document.createElement("button");
            button.style.background="#e12120";
            button.style.color="white";
            text=document.createTextNode("Delete");
            button.appendChild(text);
            button.setAttribute("onclick","deleteUser("+element.id+")");
            td.appendChild(button);
            tr.appendChild(td);
            usersTable.appendChild(tr);

        });
    }else{
        usersTable.innerHTML="<h1>No Users Found</h1>";
    }
    return usersTable; 
}
function openUsers(a){
    var table=document.getElementById('users-table-field');
    document.getElementById('users-table').style.display="block";
    document.getElementById('welcome').style.display="none";
    document.getElementById('user-chats').style.display="none";
    document.getElementById('loan-reqs').style.display="none";
    if(table.rows.length<=1){
        getUsersTable();
    }
    else{
        //console.log(table.rows.length);
    }
}
function openChats(a){
    var table=document.getElementById('chats-table');
    document.getElementById('users-table').style.display="none";
    document.getElementById('welcome').style.display="none";
    document.getElementById('user-chats').style.display="block";
    document.getElementById('loan-reqs').style.display="none";
    if(table.rows.length<=1){
        getUserChatsTable();
    }
    else{
        //console.log(table.rows.length);
    }
}
function openRequests(a){
    var table=document.getElementById('reqs-table');
    document.getElementById('users-table').style.display="none";
    document.getElementById('welcome').style.display="none";
    document.getElementById('user-chats').style.display="none";
    document.getElementById('loan-reqs').style.display="block";
    if(table.rows.length<=1){
        getLoanRequestTable();
        
    }
    else{
        console.log(table.rows.length);
    }
}
function editUser(id){
    document.cookie="id="+id+";path='./edit-user.html'";
    window.open('./edit-user.html','_self');
}
function deleteUser(id){
    window.open('./handle.php?stat='+id+'&sno=0','_self');
}
function deleteChat(id){
    window.open('./handle.php?stat='+id+'&sno=1','_self');
}
function downloadDocs(file){
    alert(file);
}
function acceptRequest(id){
    window.open('./handle.php?stat='+id+'&sno=2','_self');
}
function declineRequest(id){
    window.open('./handle.php?stat='+id+'&sno=3','_self');
}
function isEmpty(a) {
    return a === "" || a === undefined || a === null;
}

function downloadUserTable(filename,tableID){
    if(document.getElementById(tableID).rows.length<=1){
        alert("empty file retry");
    }
    else{
        var downloadurl;
    var dataFileType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');
    // Specify file name
    filename = filename?filename+'.xls':'export_excel_data.xls';
    
    // Create download link element
    downloadurl = document.createElement("a");
    
    document.body.appendChild(downloadurl);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;
    
        // Setting the file name
        downloadurl.download = filename;
        
        //triggering the function
        downloadurl.click();
    }
    }
    
}
