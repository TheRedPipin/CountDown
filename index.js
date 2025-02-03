function countdown() {
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    let endDate;

    if (dateInput) {
        endDate = new Date(dateInput + ' ' + timeInput);
    } else {
        const now = new Date();
        endDate = new Date(now.toDateString() + ' ' + timeInput);
        if (endDate <= now) {
            endDate.setDate(endDate.getDate() + 1);
        }
    }

    const now = new Date();
    if (endDate <= now) {
        const countDownText = document.getElementById('countDownText');
        countDownText.classList.add('shake');
        setTimeout(() => countDownText.classList.remove('shake'), 500);
        clearInterval(interval);
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
        countDownText.innerHTML = "00:00:00:00";
        countDownText.style.color = "#333";
        const now = new Date();
        const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        document.getElementById('timeSlider').value = secondsSinceMidnight;
        return;
    }

    const diff = endDate - now;
    console.log(diff);
    if (diff <= 1000) {
        document.getElementById('countDownText').innerHTML = "00:00:00:00";
        document.getElementById('countDownText').style.color = "red";
        clearInterval(interval);
        confettiEffect();
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countDownText = document.getElementById('countDownText');
    countDownText.style.color = "#333";
    const newText = 
        (days < 10 ? '0' : '') + days + ':' +
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds;

    countDownText.innerHTML = '';
    for (let i = 0; i < newText.length; i++) {
        const span = document.createElement('span');
        span.innerHTML = newText[i];
        if (countDownText.childNodes[i] && countDownText.childNodes[i].innerHTML !== newText[i]) {
            span.classList.add('fade');
        }
        countDownText.appendChild(span);
    }
}

function confettiEffect() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        const confettiParams = [
            { particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } },
            { particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } }
        ];
        confettiParams.forEach(params => window.confetti(Object.assign({}, params)));

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

let interval;
document.getElementById('startButton').addEventListener('click', function() {
    clearInterval(interval);
    countdown();
    interval = setInterval(countdown, 1000);
    document.getElementById('date').disabled = true;
    document.getElementById('time').disabled = true;
    document.getElementById('timeSlider').disabled = true;
    document.getElementById('startButton').disabled = true;
});

document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(interval);
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('countDownText').innerHTML = "00:00:00:00";
    document.getElementById('countDownText').style.color = "#333";
    const now = new Date();
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    document.getElementById('timeSlider').value = secondsSinceMidnight;
    document.getElementById('date').disabled = false;
    document.getElementById('time').disabled = false;
    document.getElementById('timeSlider').disabled = false;
    document.getElementById('startButton').disabled = false;
});

document.getElementById('timeSlider').addEventListener('input', function() {
    const seconds = parseInt(this.value, 10);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('time').value = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
});

document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    document.getElementById('timeSlider').value = secondsSinceMidnight;
});

document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(interval);
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('countDownText').innerHTML = "00:00:00:00";
    document.getElementById('countDownText').style.color = "#333";
    const now = new Date();
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    document.getElementById('timeSlider').value = secondsSinceMidnight;
});
