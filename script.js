const video = document.getElementById('video')
var audio = new Audio('youAng.mp3')
const angy = document.getElementById("angry");

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
  window.open("stats.html", "statistics", "height=200,width=200")
  
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



    console.log(detections["0"]["expressions"])

    //angry, disgusted, fearful, happy, neutral, sad, surprised
    const angerprob = (detections["0"]["expressions"]["angry"])
    console.log(angerprob);
    //angy.innerHTML = angerprob;
    if(angerprob>0.7){
      audio.play()
    }

    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})
