function e(id) {
    return document.getElementById(id);
}

var time = 0;
var level = 0;
//             2,3,4,4.30
var times = [120, 180, 240, 270];
// var times = [5, 10, 20, 25];
// var times = [20, 30, 40, 45];
// var times = [1, 2, 3, 4];
var delay = 4500;
var btnStart = e('btnStart');
var btnStop = e('btnStop');
var btnReset = e('btnReset');
var blinkDiv = e('blink-div');
var txtName = e('txt-name');
blinkDiv.isHide = true;

var bgDiv = e('bg-div');
var timeDiv = e('time-div');
timeDiv.hide = function() {
    // this.style.display = 'none';
}
timeDiv.show = function() {
    // this.style.display = 'flex';
}

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
    storage[getKey()] = obj;
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
    // timeDiv.show();
}


function reset() {
    save();
    time = 0;
    level = 0;
    timeDiv.innerText = 'TIMER';
    // timeDiv.show();
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
        // timeDiv.innerText = '0 : 0';
        timeDiv.innerText = '';
    }

    // clearTimeout(window.showtime);
    // timeDiv.show();
    // window.showtime = setTimeout(() => {
    //     timeDiv.hide();
    // }, delay);

    blink();

    window.timer = setInterval(() => {
        time++;
        // timeDiv.innerText = `${parseInt(time/60)} : ${time%60}`;
        blink();
        var i;
        for (i = 0; i < times.length; i++) {
            if (time < times[i]) {
                if (level != i) {
                    level = i;
                    bgDiv.style.backgroundColor =
                        getComputedStyle(document.documentElement)
                        .getPropertyValue('--bg-clr-' + level);
                    timeDiv.style.color =
                        getComputedStyle(document.documentElement)
                        .getPropertyValue('--txt-clr-' + level);

                    // clearTimeout(window.showtime);
                    // timeDiv.show();
                    // window.showtime = setTimeout(() => {
                    //     timeDiv.hide();
                    // }, delay);

                    console.log('CH', level, times[level]);
                }
                break;
            } else if (i == times.length - 1) {
                // timeDiv.show();
                timeDiv.innerText = "Time's up"
                clearInterval(window.timer);
            }
        }

    }, 1000);
}

btnStart.onclick = start;
btnStop.onclick = stop;
btnReset.onclick = reset;
txtName.onclick = function() { this.select(); }

if (!localStorage.report)
    localStorage.report = JSON.stringify({});