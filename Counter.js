const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');

const hr = 0;
const min = 0;
const sec = 15;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const starTime = Date.now();
const futureTime = starTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer(){
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime/setTime) * 360;

    if(angle>180){
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }else{
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }
    const hrs = Math.floor((remainingTime/(3600000))%24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const mins = Math.floor((remainingTime/(60000))%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secs = Math.floor((remainingTime/(1000))%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    timer.innerHTML=`
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
    `

    if(remainingTime <= 6000){
        semicircles[0].style.backgroundColor = "red";
        semicircles[1].style.backgroundColor = "red";
        timer.style.color = "red";
    }

    if(remainingTime < 0){
        clearInterval(timerLoop);
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML=`
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `

        timer.style.color = "lightgray";
    }
}