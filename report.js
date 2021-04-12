function e(id) {
    return document.getElementById(id);
}

var tbl = e('tbl');
var btnClr = e('btn-clr');
var tblDiv = e('tbl-div');

function formatTime(time) {
    return `${parseInt(time/60)} : ${String(time%60).padStart(2, '0')}`
}
var report = JSON.parse(localStorage.report);

for (var i = 0; i < 10; i++) {
    if (report.length) {
        report.forEach(e => {
            var row = `<tr><td>${e.name}</td><td>${formatTime(e.time)}</td></tr>`
            tbl.innerHTML += row;
        });
    } else {
        tblDiv.innerHTML = "No saved reports"
    }
}

btnClr.onclick = function() {
    localStorage.report = JSON.stringify([]);
    tblDiv.innerHTML = "No saved reports"
}