var botMsgs = [];
var humanMsgs = [];
var questions = [
  "is this pandemic affects your economical status?",
  "will you overcome from it?",
  "is your company resumes work?",
  "what is your source of income?",
  "will you want to postpone your due date?",
  "when did you probably resume your due(date) ?",
];
var qi = 0;
var answers = [];
var userId;
var userName;
var users;
var pend;
var resumeDate;
var botName = "Mr.Cool Bot";
var synth = window.speechSynthesis;
var voices = synth.getVoices();
var talk = document.getElementById("talk");
var voiceToText = document.getElementById("voice-to-text");
const speech =
  window.SpeechRecognition || window.webkitSpeechRecognition || false;
const recorder = new speech();
recorder.onstart = () => {
  console.log("Voice activated");
};
recorder.onresult = (event) => {
  //console.log(event);
  document.getElementById("talk").style.color = "black";
  var text = event.results[0][0].transcript;
  if (isEmpty(text)) {
    alert("Unable to hear try again");
  } else {
    //console.info(text);
    addMyMessage(text);
  }
};

function addMyMessage(text) {
  if (isEmpty(text)) {
    alert("type/speak something");
  } else {
    var div = document.createElement("div");
    div.classList.add("human-div");
    var element = document.createElement("div");
    element.classList.add("human");
    var textNode = document.createTextNode(text);
    element.appendChild(textNode);
    div.appendChild(element);
    voiceToText.appendChild(div);
    voiceToText.style.border = "2px solid black";
    humanMsgs.push(text);
    //addBotMessage(text.toLowerCase());
    if (qi + 1 > questions.length || isEmpty(pend)) {
      addBotMessage(text.toLowerCase());
    } else {
      if (qi !== 0) {
        startConversation(text);
      }
    }
  }
}
function isEmpty(a) {
  return a === "" || a === undefined || a === null;
}

function isValidFile(input) {
  var file = input.files[0];
  var filename = input.value;
  var ext = filename.split(".");
  var extension = ext[ext.length - 1].toLowerCase();
  var valid = extension === "txt";
  if (!valid) {
    addStraightBotMessage("put a valid file!");
    input.value = "";
  } else {
    let letter = "";
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      console.log(reader.result);
      letter = reader.result;
      
    };
    addStraightBotMessage("thank you");
    

    answers = [userId, userName, ...answers,filename];
    console.log(answers);
    document.cookie = "answered=yes;";

    /*var input=document.createElement("input");
    input.setAttribute("type","submit");
    input.setAttribute("formaction","./chats.php?chatAnswers=" + answers);
    input.setAttribute("name","submit");
    input.click();*/

    window.open("./chats.php?chatAnswers=" + answers,'_self');
    
    //window.open(file);
    //console.log(botMsgs);
    //console.log(humanMsgs);
    //console.log(resumeDate);
  }
}

function isImageFile(ext) {
  return ext === "jpg" || ext === "jpeg" || ext === "png";
}

function getUserLoanDetails(id) {
  var f = 0;
  var detail = "your loan id not found contact nearby branch";
  if (!isEmpty(users)) {
    users.forEach((element) => {
      if (element.id === id) {
        f = 1;
        userId = id;
        userName = element.name;
        addStraightBotMessage("Here it is your loan details");
        addStraightMessage("Id : " + element.id);
        addStraightMessage("Name : " + element.name);
        addStraightMessage("Type : " + element.type + " loan");
        addStraightMessage("Total Amount : " + element.totalAmount);
        addStraightMessage("Due Amount : " + element.dueAmount);
        addStraightMessage("Paid Amount : " + element.paidAmount);
        addStraightMessage("Remain Amount : " + element.remainAmount);
        startConversation(null);
        return detail;
      }
    });
    if (f === 0) {
      addStraightBotMessage(detail);
    }
  } else {
    addStraightBotMessage("Unable to fetch try again");
  }

  return detail;
}

function isValidDate(date) {
  date = date.trim();
  var str = date.split("/");
  if (str.length === 2) {
    if (
      str[0].length <= 2 &&
      str[1].length <= 4 &&
      str[0].length > 0 &&
      str[1].length > 0
    ) {
      if (!isNaN(str[0]) && !isNaN(str[1])) {
        if (
          parseInt(str[0]) < 13 &&
          parseInt(str[0]) > 0 &&
          parseInt(str[1].substring(str[1].length - 2)) >= 20
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function startConversation(answer) {
  addStraightBotMessage(questions[qi]);
  pend = questions[qi];

  if (answer !== null) {
    answers.push(answer);
  }
  qi++;
  //addStraightBotMessage("Thank you type feedback in your text");
}

function addBotMessage(text) {
  if (isEmpty(pend)) {
    var speak = "Sorry, I cant understand!";
    var get = 0;
    if (text.includes("what is your name")) {
      speak = "My name is " + botName;
    } else if (text.startsWith("set your name as")) {
      botName = text.substring(17);
      speak = botName + ", it's cool";
    } else if (
      (text.includes("your") || text.includes("programmer")) &&
      !(text.includes("your name") || text.includes("i"))
    ) {
      speak = getDeveloper();
    } else if (text.includes("feedback")) {
      var feedback = prompt("feedback :", "Good");
      var feedbackerName = prompt("Your name :", "Harry Potter");
      speak = "thanks for the feedback Mr." + feedbackerName;
    } else if (text.includes("thank")) {
      speak = "you're welcome :)";
    } else if (text.includes("prakash")) {
      speak = "The best programmer in the world";
    } else if (
      text.startsWith("will") ||
      text.startsWith("shall") ||
      text.startsWith("can") ||
      text.startsWith("are") ||
      text.startsWith("is") ||
      text.startsWith("do") ||
      text.startsWith("did") ||
      text.startsWith("does")
    ) {
      var ran = Math.random() * 1000;
      if (ran < 700) {
        speak = "Yes... :)";
      } else {
        speak = "No... :(";
      }
    } else if (
      text.startsWith("hello") ||
      text.startsWith("hi") ||
      text.startsWith("hi") ||
      text.startsWith("hey") ||
      text.startsWith("hai")
    ) {
      speak = "glad to get this from you, what can i do for you";
    } else if (!isNaN(text)) {
      getUserLoanDetails(text);
      speak = "";
    } else if (text.includes("contact")) {
      speak += "contact @ 8827327641";
    } else if (
      (text.includes("apply") || text.includes("want")) &&
      text.includes("loan")
    ) {
      speak = "";
      get = 1;
      var input = document.createElement("a");
      var textNode = document.createTextNode(" apply here");
      input.appendChild(textNode);
      input.setAttribute("href", "./apply-loan.html");
      input.setAttribute("target", "_blank");
      setNode(input);
    } else if (text === "i am your admin password cool") {
      speak = "welcome boss";
      window.open("./bank-admin.html", "_self");
    } else if (text.includes("file") || text.includes("reason")) {
      speak = "";
      get = 1;
      var input = document.createElement("input");
      input.type = "file";
      input.onchange = "isValidFile(event.target.value)";
      input.setAttribute("onchange", "isValidFile(this)");
      setNode(input);
    }
  } else if (!isEmpty(pend) && pend.includes("resume") && isEmpty(resumeDate)) {
    if (text === "exit") {
      pend = "";
    } else if (isValidDate(text)) {
      resumeDate = text;
      answers.push(text);
      speak = "provide a letter file for your economical status and reasons";
      get = 1;
      var input = document.createElement("input");
      input.type = "file";
      input.setAttribute("name", "fileToUpload");
      input.onchange = "isValidFile(event.target.value)";
      input.setAttribute("onchange", "isValidFile(this)");
      setNode(input);
    } else {
      speak = "it is not a valid date format!, please enter valid date";
    }
  }
  if (speak !== "" || get === 1) {
    var utterThis = new SpeechSynthesisUtterance(speak);
    synth.speak(utterThis);
    var div = document.createElement("div");
    div.classList.add("bot-div");
    var element = document.createElement("div");
    element.classList.add("bot");
    var textNode = document.createTextNode(speak);
    element.appendChild(textNode);
    if (get === 1) {
      get = 0;
      element.appendChild(getNode());
      pend = "";
    }
    div.appendChild(element);
    voiceToText.appendChild(div);
    botMsgs.push(speak);
    voiceToText.style.border = "2px solid black";
  }
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
}

function addStraightBotMessage(text) {
  var speak = text;
  var div = document.createElement("div");
  div.classList.add("bot-div");
  var element = document.createElement("div");
  element.classList.add("bot");
  var textNode = document.createTextNode(speak);
  element.appendChild(textNode);
  div.appendChild(element);
  voiceToText.appendChild(div);
  botMsgs.push(speak);
  voiceToText.style.border = "2px solid black";
  var utterThis = new SpeechSynthesisUtterance(speak);
  synth.speak(utterThis);
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
}

function addStraightMessage(text) {
  var speak = text;
  var div = document.createElement("div");
  div.classList.add("bot-div");
  var element = document.createElement("div");
  element.classList.add("bot");
  var textNode = document.createTextNode(speak);
  element.appendChild(textNode);
  div.appendChild(element);
  voiceToText.appendChild(div);
  botMsgs.push(speak);
  voiceToText.style.border = "2px solid black";
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
}

function getDeveloper() {
  return "Mr.Prakash The Programmer and Developer";
}

function start() {
  recorder.start();
  document.getElementById("talk").style.color = "red";
}
function getText() {
  var text = document.getElementById("text");
  addMyMessage(text.value);
  text.value = "";
}
function close() {
  alert("close");
}
function closeNote() {
  //document.getElementById("note").innerHTML = "";
  document.getElementById("note").style.display = "none";
}
function load() {
  fetch("http://localhost:6061/get-all-details")
    .then((request) => request.json())
    .then((res) => {
      this.users = res;
    })
    .catch((error) => {
      console.log(error);
      //return "your loan detail not found";
    });
    if(isEmpty(getCookie("answered"))){
      addStraightBotMessage("Please Enter your Loan Id");
    }
    else{
      addStraightBotMessage("If you want to see your loan details enter loan id");
    }
  
}
var extraNode;
function setNode(a) {
  extraNode = a;
}
function getNode() {
  return extraNode;
}
function openHome() {
  window.open();
}
document.getElementById("text").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getText();
  }
});
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}