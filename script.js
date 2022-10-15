const video = document.getElementById('video')
var audio = new Audio('youAng.mp3')


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
    if(angerprob>70){
      audio.play()
    }
    if(happyprob>70){

    }
    if(sadprob>70){

    }
    
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 500)
})
