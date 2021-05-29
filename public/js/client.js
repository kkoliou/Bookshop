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
        }, function() {
            button.className = "likeBtnFilled"
            showAlreadyFavoriteAlert()
        })
    } 
}

function addToFavorites(work, completionBlock, alreadyFavoriteBlock) {
    let init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(work)
    }

    let url = '/favorite'
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            if (data.status == responses.SUCCESS) {
                completionBlock()
            } else if (data.status == responses.ALREADY_FAVORITE) {
                alreadyFavoriteBlock()
            } else {
                showGenericErrorAlert()
            }
        })
}

function removeFromFavorites(work, completionBlock) {
    let init = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(work)
    }

    let url = '/favorite'
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            if (data.status == responses.SUCCESS) {
                completionBlock()
            } else {
                showGenericErrorAlert()
            }
        })
}

function showAlreadyFavoriteAlert() {
    alert('Already in favorites!')
}

function showGenericErrorAlert() {
    alert('Something went wrong. Please try again.')
}

const responses = {
	SUCCESS: "success",
	ALREADY_FAVORITE: "already_favorite",
	ERROR: "error",
}
