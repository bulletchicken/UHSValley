

const video = document.getElementById('video')

//happy: 3, 8, 10, 11
//sad: 1, 2
//angry: 4, 5, 6, 7, 8, 9


var happy3 = new Audio('voicelines/University of Toronto - Scarborough 3.m4a')
var happy8 = new Audio('voicelines/University of Toronto - Scarborough 8.m4a')
var happy10 = new Audio('voicelines/University of Toronto - Scarborough 10.m4a')
var happy11 = new Audio('voicelines/University of Toronto - Scarborough 11.m4a')

var sad1 = new Audio('voicelines/University of Toronto - Scarborough.m4a')
var sad2 = new Audio('voicelines/University of Toronto - Scarborough 2.m4a')

var angry4 = new Audio('voicelines/University of Toronto - Scarborough 4.m4a')
var angry5 = new Audio('voicelines/University of Toronto - Scarborough 5.m4a')
var angry6 = new Audio('voicelines/University of Toronto - Scarborough 6.m4a')
var angry7 = new Audio('voicelines/University of Toronto - Scarborough 7.m4a')
var angry8 = new Audio('voicelines/University of Toronto - Scarborough 8.m4a')
var angry9 = new Audio('voicelines/University of Toronto - Scarborough 9.m4a')



/*
var sad1 = new Audio('sad1')
var sad2 = new Audio('sad2')

var happy1 = new Audio('happy1')
var happy2 = new Audio('happy2')

var angry1 = new Audio('angry1')
var angry2 = new Audio('angry2')
*/


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
])

//0,0 beep boop beep
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  
  //window.open("stats.html", "statistics", "height=200,width=200")
}

function stopVideoButton(){
  location.reload(); //simply just reloads page
};


const capture = async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const video = document.createElement("video");

  try {
    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = captureStream;
    context.drawImage(video, 0, 0, window.width, window.height);
    const frame = canvas.toDataURL("image/png");
    captureStream.getTracks().forEach(track => track.stop());
    window.location.href = frame;
  } catch (err) {
    console.error("Error: " + err);
  }
};

var download = function(){
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    //angry, disgusted, fearful, happy, neutral, sad, surprised
    const angerprob = Math.round(Math.max( (detections["0"]["expressions"]["angry"]), (detections["0"]["expressions"]["disgusted"]))*1000)/10
    const happyprob = Math.round((detections["0"]["expressions"]["happy"]) *1000)/10
    const sadprob = Math.round((detections["0"]["expressions"]["sad"])*1000)/10


    document.getElementById("angry").innerHTML = "%" + angerprob + " angry";
    document.getElementById("happy").innerHTML = "%" + happyprob + " happy";
    document.getElementById("sad").innerHTML = "%" + sadprob + " sad";
    
//happy: 3, 8, 10, 11
//sad: 1, 2
//angry: 4, 5, 6, 7, 8, 9
    


    if(angerprob>75){
      //var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      //window.locat-ion.href=image;

      let x = Math.floor(Math.random()*6)

      const allAngry = [angry4, angry5, angry6, angry7, angry8, angry9]
      setTimeout(allAngry[x].play(), 3000)

      /*
      if(x==0){
        setTimeout(angry4.play(), 5000);
      } else if(x==1){
        setTimeout(angry5.play(), 5000);
      } else if(x==2){
        setTimeout(angry6.play(), 5000);
      } else if(x==3){
        setTimeout(angry7.play(), 5000);
      } else if(x==4){
        setTimeout(angry8.play(), 5000);
      } else if(x==5){
        setTimeout(angry9.play(), 5000);
      }
      */

    }

    else if(happyprob>90){
      
      //download canvas OR take a pic with webcam somehow
      let x = Math.floor(Math.random()*4)
      console.log(x);
      const allHappy = [happy3, happy8, happy10, happy11]
      
      setTimeout(allHappy[x].play(), 3000)

      /*
      console.log(x);
      if(x==0){
        happy3.play();
      }else if(x==1){
        happy8.play();
      } else if(x==2){
        happy10.play();
      } else if(x==3){
        happy11.play();
      }
      */
    }

    else if(sadprob>70){
      let x = Math.floor(Math.random()*10)
      if(x%2==0){
        setTimeout(sad1.play(), 3000);
      } else {
        setTimeout(sad2.play(), 3000);
      }
    }
    
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 200)
})
