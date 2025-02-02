function countdown() {
    const endDate = new Date(document.getElementById('date').value + ' ' + document.getElementById('time').value);
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
        document.getElementById('countDownText').innerHTML = "00:00:00";
        document.getElementById('countDownText').style.color = "red";
        clearInterval(interval);
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countDownText = document.getElementById('countDownText');
    const newText = 
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

    // Switch between hourglass emojis and rotate if transitioning to '⏳'
    const sandTimer = document.getElementById('sandTimer');
    if (sandTimer.innerHTML === '⏳') {
        sandTimer.classList.add('rotate');
        sandTimer.innerHTML = '⌛';
    } else {
        sandTimer.innerHTML = '⏳';
        sandTimer.classList.remove('rotate');
    }
}

let interval;
document.getElementById('date').addEventListener('change', function() {
    clearInterval(interval);
    countdown();
    interval = setInterval(countdown, 1000);
});

document.getElementById('time').addEventListener('change', function() {
    clearInterval(interval);
    countdown();
    interval = setInterval(countdown, 1000);
});
