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

var roomName;
var userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Welcome " + userName + "!";

function addRoom() {
    roomName = document.getElementById("roomName").value;
    console.log("Room name :" +roomName);

    firebase.database().ref("/").child(roomName).update({
        purpose: "Adding room name"
    });

    localStorage.setItem("roomName", roomName);
    window.location = "kwitterPage.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("outputRoomDiv").innerHTML = ""; 
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            roomNames = childKey;
            console.log("Room Names - " + roomNames);
            row = "<div class='roomNames' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
            document.getElementById("outputRoomDiv").innerHTML += row;
        });
    });

}

getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "kwitter.html";
}