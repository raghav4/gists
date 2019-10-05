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
            var toInsert = `<td data-label="File"><a href="${data[i].html_url}">${fileName.filename}</a></td>
            <td data-label="Description">${data[i].description}</td>
            <td data-label="Updated At">${data[i].updated_at}</td>`;
            var tableBody = document.getElementById('tBody-id');
            var tr = document.createElement('tr');
            tr.innerHTML = toInsert;
            tableBody.appendChild(tr);
        }
        // console.log(data) 
    })
    .catch(error => console.error(error))