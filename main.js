function preload()
{
}
status = "";
percent = 0;
objects = [];
video_declare = "";
function setup()
{
    canvas = createCanvas(310, 310);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("detect").innerHTML = "detecting objects";
}
function modelloaded()
{
    console.log("cocossd is loaded", ml5.version);
    status = true;
    object_detector.detect(video,gotresult);
}
function gotresult(error,results)
{
    if(error)
    {
        console.error(error);
        //window.alert("There is an error click on 'ok' button to wait for the web page working");
        object_detector.detect(video, gotresult);
    }
    else
    {
        console.log(results);
        document.getElementById("detect").innerHTML = "Object Detected"
        objects = results;
        object_detector.detect(video, gotresult);
    }
}
function draw()
{
    image(video, 0, 0, 310, 310);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);  

        loop();
    for(i=0; i<objects.length; i++)
    {
        loop();
        replay.stop();
        percent= Math.floor(objects[i].confidence*100);
        object_name= objects[i].label;
        textSize(20);
        strokeWeight(1);
        stroke("red");
        fill("red")
        text(object_name+" "+percent+"%",objects[i].x+15,objects[i].y+40);
        document.getElementById("name").innerHTML = objects.length;
        noFill();
        strokeWeight(3);
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        synthesis = window.speechSynthesis;
        spoken_data = "There is a "+object_name+" in front of you.";
        utter = new SpeechSynthesisUtterance(spoken_data);
        synthesis.speak(utter);
    }
    }
}