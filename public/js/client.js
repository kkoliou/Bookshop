var works = []

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
                this.works = works
                presentWorks(works)
            }
        })
        .catch(error => setupEmptyState())
}

function presentWorks(works) {
    let layout = ""
    var index = 0
    for (let item of works) {
        layout += `<div class="work-item"><p><b>Title:</b> ${item.titleweb}<br><b>Author:</b> ${item.authorweb}</p>
        <div class="fav">
        <button id="likeBtn${index}" class="likeBtn" onclick='favButtonPressed(${index})'></button>
        </div>
        </div>`
        index++
    }
    document.querySelector("#works").innerHTML = layout
}

function setupEmptyState() {
    document.querySelector("#works").innerHTML = "<p>No results found!</p>"
}

function favButtonPressed(index) {
    let button = document.querySelector(`#likeBtn${index}`)
    let work = works[index]

    if (button.className == "likeBtnFilled") {
        removeFromFavorites(work, function() {
            button.className = "likeBtn"
        })
    } else {
        addToFavorites(work, function() {
            button.className = "likeBtnFilled"
        })
    } 
}

function addToFavorites(work, completionBlock) {
    completionBlock()
}

function removeFromFavorites(work, completionBlock) {
    completionBlock()
}
