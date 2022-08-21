song1 = "";
song2 = "";
lwX = 0;
lwY = 0;
rwX = 0;
rwY = 0;
scoreLeftWrist = 0;
songvar_1 = "";
songvar_2 = "";


function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);

  
}

function modelLoaded()
{
    console.log("running");
}


function gotPoses(results)
{
   if(results.length>0)
   {

   console.log(results);
   scoreLeftWrist = results[0].pose.keypoints[9].score;
   console.log("scoreLeftWrist = " +  scoreLeftWrist);

   lwX = results[0].pose.leftWrist.x;
   lwY = results[0].pose.leftWrist.y;
   console.log("LeftX = " + lwX + " LeftY = " + lwY );

   rwX = results[0].pose.rightWrist.x;
   rwY = results[0].pose.rightWrist.y;
   console.log("RightX = " + rwX + " RightY = " + rwY );
   }
}

function draw()
{
    image(video, 0 , 0 , 600 , 500);
    songvar_1 = song1.isPlaying();
    songvar_2 = song2.isPlaying();
    fill("#FF0000");
    stroke("#000000");

    if(scoreLeftWrist > 0.2)
    {
       circle(lwX , lwY , 20);
       song2.stop();
       
       if (songvar_1 == false)
       {
        song1.play();
        document.getElementById("song").innerHTML = "Peter pan"
       }
    }
}
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}