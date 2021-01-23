function e(id) {
    var elm = document.getElementById(id);

    return elm;
}

var time = 0;
var level = 0;
//             2,3,4,4.30
// var times = [120, 180, 240, 270];
// var times = [5, 10, 20, 25];
var times = [20, 30, 40, 45];
var delay = 4500;
var btnStart = e('btnStart');
var btnStop = e('btnStop');
var btnReset = e('btnReset');

var bgDiv = e('bg-div');
var timeDiv = e('time-div');
timeDiv.hide = function() {
    this.style.display = 'none';
}
timeDiv.show = function() {
    this.style.display = 'flex';
}

function stop() {
    clearInterval(window.timer);
    timeDiv.show();
}

function reset() {
    time = 0;
    level = 0;
    timeDiv.innerText = 'TIMER';
    timeDiv.show();
    clearTimeout(window.showtime);
    clearInterval(window.timer);
    bgDiv.style.backgroundColor =
        getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-color');
    timeDiv.style.color =
        getComputedStyle(document.documentElement)
        .getPropertyValue('--txt-clr-' + level);
}

function start() {
    clearInterval(window.timer);

    if (time >= times[times.length - 1]) reset();

    if (time == 0) {
        timeDiv.innerText = '0 : 0';
    }

    clearTimeout(window.showtime);
    timeDiv.show();
    window.showtime = setTimeout(() => {
        timeDiv.hide();
    }, delay);

    window.timer = setInterval(() => {
        time++;
        timeDiv.innerText = `${parseInt(time/60)} : ${time%60}`;
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

                    clearTimeout(window.showtime);
                    timeDiv.show();
                    window.showtime = setTimeout(() => {
                        timeDiv.hide();
                    }, delay);

                    console.log('CH', level, times[level]);
                }
                break;
            } else if (i == times.length - 1) {
                timeDiv.show();
                timeDiv.innerText = "Time's up"
            }
        }

    }, 1000);
}

btnStart.onclick = start;
btnStop.onclick = stop;
btnReset.onclick = reset;