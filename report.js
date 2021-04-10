function e(id) {
    return document.getElementById(id);
}

var tbl = e('tbl');

function formatTime(time) {
    return `${parseInt(time/60)}:${time%60}`
}
var report = JSON.parse(localStorage.report);

report.forEach(e => {
    var row = `<tr><td>${e.name}</td><td>${formatTime(e.time)}</td></tr>`
    tbl.innerHTML += row;
});