var prediction1=""
var prediction2=""
Webcam.set({
  width:350,
  height:300,
  image_format:"png",
  png_quality:90
})
camera=document.getElementById("camera")
Webcam.attach("#camera")

function capture(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'></img>"
    })
}

console.log(ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5F3svljyp/model.json",modelLoaded)

function modelLoaded(){
    console.log("hello")
}

function speak(){
    var synth= window.speechSythesis
    speechData1="The first Prediction is "+prediction1;
    speechData2="The second Prediction is "+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speechData1+speechData2)
    synth.speak(utterthis)
}