const user = 'raghav4';
let userName;

function userProfile() {
    window.location.href = `https://gist.github.com/${user}`;
}
fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(data => {
        userName = data.name.split(' ');
        document.getElementById('cFont').innerText = `${userName[0]}'s GitHub Gists`;
    })
    .catch(error => console.error(error))
fetch(`https://api.github.com/users/${user}/gists`)
    .then(response => response.json())
    .then(data => {
        let userData = data;
        for (var i = 0; i < data.length; i++) {
            let fileName;
            for (var prop in data[i].files) {
                fileName = data[i].files[prop];
                break;
            }
            var toInsert = `<td data-label="Description">${i+1}.</td>
            <td data-label="File"><a href="${data[i].html_url}">${fileName.filename}</a></td>
            <td data-label="Description">${data[i].description}</td>
            <td data-label="Updated At">${prettyDate(data[i].updated_at)}</td>`;
            var tableBody = document.getElementById('tBody-id');
            var tr = document.createElement('tr');
            tr.innerHTML = toInsert;
            tableBody.appendChild(tr);
        }
        // console.log(data) 
    })
    .catch(error => console.error(error))

function prettyDate(time) {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    var secs = (((new Date()).getTime() - date.getTime()) / 1000);
    Math.floor(secs);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
        return secs + (secs > 1 ? ' seconds ago' : ' second ago');
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + (hours > 1 ? ' hours ago' : ' hour ago');
    }
    var weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
        return days + (days > 1 ? ' days ago' : ' day ago');
    }
    var months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
        return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
    }
    var years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
        return months + (months > 1 ? ' months ago' : ' month ago');
    }
    years = Math.floor(years);
    return years + (years > 1 ? ' years ago' : ' years ago');
}

function realDate(time) {
    return new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
}