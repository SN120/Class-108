document.getElementById("Check_button").disabled = true;
var prediction1 = "";
var prediction2 = "";
Webcam.set({
    width: 380,
    height: 275,
    image_format: 'png',
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach('#camera');
function Snapshot() {
    document.getElementById("Check_button").disabled = false;
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "Image_result" src = "' + data_uri + '"/>';
    })
}

console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BsSeRaEn8/model.json", modelLoaded);
function modelLoaded() {
    console.log("Model Loaded");
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The first prediction is " + prediction1 + ". and your second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function Check() {
    img = document.getElementById("Image_result");
    classifier.classify(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if (result[0].label == "Sad") {
            document.getElementById("emoji").innerHTML = "&#128546";
        }
        if (result[0].label == "Irritated") {
            document.getElementById("emoji").innerHTML = "&#128548";
        } 
        if (result[0].label == "Happy") {
            document.getElementById("emoji").innerHTML = "&#128512";
        } 

        if (result[1].label == "Sad") {
            document.getElementById("emoji2").innerHTML = "&#128546";
            
        }
        if (result[1].label == "Irritated") {
            document.getElementById("emoji2").innerHTML = "&#128548";
        } 
        if (result[1].label == "Happy") {
            document.getElementById("emoji2").innerHTML = "&#128512";
        } 
    }
}