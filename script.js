const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const countdown = document.getElementById('countdown');
const timeUp = document.getElementById('time-up');
const fireworks = document.getElementById('fireworks');

const christmas = new Date('12/25/1970');

christmas.setFullYear(new Date().getFullYear());

setInterval(() => {
    const diff = christmas - new Date();
    if (diff > 0) {
        days.innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        hours.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        minutes.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        seconds.innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        countdown.style.display = 'inherit';
        timeUp.style.display = 'none';
        fireworks.style.display = 'none';
    } else {
        countdown.style.display = 'none';
        timeUp.style.display = 'inherit';
        fireworks.style.display = 'initial';
    }
}, 1);

function debug() {
    christmas.setFullYear(1970);
}

function change_day() {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
}

let setHour = null;

const sunrise = document.getElementById('sunrise');
const midday = document.getElementById('midday');
const sunset = document.getElementById('sunset');

setInterval(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let hour;
    if (setHour) {
        hour = setHour
    } else {
        hour = (now - today) / (1000 * 60 * 60);
    }
    const position = (hour - 6) * 360 / 24 + 180
    document.documentElement.style.setProperty('--rot', position + 'deg');
    document.documentElement.style.setProperty('--rotm', -position + 'deg');
    document.documentElement.style.setProperty('--tr', position * 2.5 + 'px');
    document.documentElement.style.setProperty('--trm', position * (-2.5) + 'px');

    if (hour < 5) {
        sunrise.style.opacity = 0
        midday.style.opacity = 0
        sunset.style.opacity = 0
    } else if (hour < 6) {
        sunrise.style.opacity = hour - 5
        midday.style.opacity = 0
        sunset.style.opacity = 0
    } else if (hour < 6.5) {
        sunrise.style.opacity = 1
        midday.style.opacity = 0
        sunset.style.opacity = 0
    } else if (hour < 7.5) {
        sunrise.style.opacity = 1
        midday.style.opacity = hour - 7
        sunset.style.opacity = 0
    } else if (hour < 16.5) {
        sunrise.style.opacity = 0
        midday.style.opacity = 1
        sunset.style.opacity = 0
    } else if (hour < 17.5) {
        sunrise.style.opacity = 0
        midday.style.opacity = 1
        sunset.style.opacity = hour - 16.5
    } else if (hour < 18) {
        sunrise.style.opacity = 0
        midday.style.opacity = 0
        sunset.style.opacity = 1
    } else if (hour < 19) {
        sunrise.style.opacity = 0
        midday.style.opacity = 0
        sunset.style.opacity = 19 - hour
    } else {
        sunrise.style.opacity = 0
        midday.style.opacity = 0
        sunset.style.opacity = 0
    }
}, 10)

function cycle(speed) {
    setInterval(() => {if (setHour >= 24) {setHour = 0} else {setHour+= speed / 10000}}, 10)
}
