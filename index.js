function e(id) {
    return document.getElementById(id);
}

var time = 0;
var level = 0;
var introLevel = 0;
// 1,1.30,2
// var times = [60, 90, 120, 150];
var introTimes = ['1min', '1min 30s', '2min'];
var times = [4, 6, 9, 12];

var btnStart = e('btnStart');
var btnStop = e('btnStop');
var btnReset = e('btnReset');
var btnIntro = e('btnIntro');
var blinkDiv = e('blink-div');
var txtName = e('txt-name');
blinkDiv.isHide = true;

var bgDiv = e('bg-div');
var timeDiv = e('time-div');

function getKey() {
    return parseInt(Date.now() / 1000);
}

function save() {
    var storage = JSON.parse(localStorage.report);
    var obj = {};
    obj.name = txtName.value;
    if (!obj.name)
        obj.name = prompt("Enter a name");
    obj.time = time;
    storage.push(obj);
    localStorage.report = JSON.stringify(storage);
}

function blink() {
    blinkDiv.isHide = !blinkDiv.isHide;
    if (blinkDiv.isHide)
        blinkDiv.style.visibility = 'hidden';
    else
        blinkDiv.style.visibility = 'visible';
}

function stop() {
    clearInterval(window.timer);
}

function reset() {
    save();
    time = 0;
    level = 0;
    timeDiv.innerText = 'TIMER';
    clearTimeout(window.showtime);
    clearInterval(window.timer);
    bgDiv.style.backgroundColor =
        getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-color');
    timeDiv.style.color =
        getComputedStyle(document.documentElement)
        .getPropertyValue('--txt-clr-' + level);

    blinkDiv.isHide = true;
    blinkDiv.style.visibility = 'hidden';
}

function start() {
    clearInterval(window.timer);

    if (time >= times[times.length - 1]) reset();

    if (time == 0) {
        timeDiv.innerText = '';
    }

    blink();

    window.timer = setInterval(() => {
        time++;
        blink();
        for (var i = 0; i < times.length; i++) {
            if (time < times[i]) {
                if (level != i) {
                    level = i;
                    bgDiv.style.backgroundColor =
                        getComputedStyle(document.documentElement)
                        .getPropertyValue('--bg-clr-' + level);
                    txtName.style.color =
                        getComputedStyle(document.documentElement)
                        .getPropertyValue('--txt-clr-' + level);

                    console.log('CH', level, times[level]);
                }
                break;
            }
        }

    }, 1000);
}

function intro() {
    timeDiv.innerText = introTimes[introLevel];
    introLevel++;
    bgDiv.style.backgroundColor =
        getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-clr-' + introLevel);
    timeDiv.style.color =
        getComputedStyle(document.documentElement)
        .getPropertyValue('--txt-clr-' + introLevel);

    if (introLevel >= introTimes.length)
        introLevel = 0;

}

btnStart.onclick = start;
btnStop.onclick = stop;
btnReset.onclick = reset;
btnIntro.onclick = intro;
txtName.onclick = function() { this.select(); }

if (!localStorage.report)
    localStorage.report = JSON.stringify([]);