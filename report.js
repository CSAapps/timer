function e(id) {
    return document.getElementById(id);
}

var report = JSON.parse(localStorage.report);

report.forEach(e => {
    document.body.innerHTML += `${e.name}:${e.time}<br>`
});