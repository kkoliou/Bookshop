function getWorks() {
    let searchInput = document.querySelector("#searchInput").value
    let headers = new Headers()
    headers.append("Accept", "application/json")

    let init = {
        method: "GET",
        headers: headers
    }

    let url = `https://reststop.randomhouse.com/resources/works?search=${searchInput}`
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            let works = data.work
            if (works.length === 0) {
                setupEmptyState()
            } else {
                presentWorks(works)
            }
        })
        .catch(error => setupEmptyState())
}

function presentWorks(works) {
    let layout = ""
    for (let item of works) {
        layout += `<div class="work-item"><p><b>Title:</b> ${item.titleweb}<br><b>Author:</b> ${item.authorweb}</p>
        <div class="fav">
        <button id="likeBtn" onclick='favButtonPressed()'></button>
        </div>
        </div>`
    }
    document.querySelector("#works").innerHTML = layout
}

function setupEmptyState() {
    document.querySelector("#works").innerHTML = "<p>No results found!</p>"
}

function favButtonPressed() {
    
}