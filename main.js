prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FHdd9KQ0F/model.json',modelLoaded);

function modelLoaded() {
    console.log("ModelLoaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+ prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(prediction == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        if(prediction == "Best"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
        }
        if(prediction == "Victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
      }
    }