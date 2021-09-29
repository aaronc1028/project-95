// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6u7uwMcnnwqdeZlVjiJ7YsUfpJh3jVNs",
    authDomain: "kwitter-638b5.firebaseapp.com",
    databaseURL: "https://kwitter-638b5-default-rtdb.firebaseio.com",
    projectId: "kwitter-638b5",
    storageBucket: "kwitter-638b5.appspot.com",
    messagingSenderId: "441112857957",
    appId: "1:441112857957:web:21bebba2d290b07acda58c",
    measurementId: "G-XKT0Q1NLXQ"
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

var roomName = localStorage.getItem("roomName");
var userName = localStorage.getItem("userName");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("outputRoomDiv").innerHTML = ""; 
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val(); 
            if (childKey != "purpose") {
                firebaseMessageID = childKey;
                messageData = childData;
                console.log(firebaseMessageID);
                console.log(messageData);
                var name = messageData['name'];
                var message = messageData['message'];
                var like = messageData['like'];
                nameWithTag= "<h4> " + name + "<img class='userTick' src='tick.png'></h4>";
                messageWithTag= "<h4 class='message_h4'>" + message + "</h4>";
                likeButton = "<button class='btn btn-warning' id=" + firebaseMessageID + " value=" + like + " onclick='updateLike(this.id)'>";
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = nameWithTag + messageWithTag + likeButton + spanWithTag;
                document.getElementById("outputRoomDiv").innerHTML += row;
                
            }
        });
    });
}

getData();


function updateLike(messageID) {
    console.log("clicked on like button - " + messageID);
    buttonId=messageID;
    likes=document.getElementById(buttonId).value;
    updateLikes=Number(likes)+1
    firebase.database().ref(roomName).child(messageID).update({
        like:updateLikes
    })
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location.replace("kwitter.html");
}
