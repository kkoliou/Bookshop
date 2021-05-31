var favorites = []

document.querySelector("#searchInput").addEventListener("keyup", function() {
    searchWork()
})

function searchWork() {
    let searchInput = document.querySelector("#searchInput").value

    var index = 0
    for (let work of favorites) {
        let contains = containsWord(searchInput, work)
        let htmlItem = document.querySelector(`#work-item${index}`)
        if (contains) {
            htmlItem.style.display = ""
        } else {
            htmlItem.style.display = "none"
        }
        index++
    }
}

function getFavorites() {
    let headers = new Headers()
    headers.append("Accept", "application/json")

    let init = {
        method: "GET",
        headers: headers
    }

    let url = '/favorites'
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            if (data.status == responses.SUCCESS) {
                this.favorites = data.favorites
                presentFavorites(favorites)
            }
        })
}

function presentFavorites(favs) {
    let layout = ""
    var index = 0
    for (let item of favs) {
        layout += `<div id="work-item${index}" class="work-item"><p><b>Title:</b> ${item.titleweb}<br><b>Author:</b> ${item.authorweb}</p>
        <div class="fav">
        <button id="likeBtn${index}" class="likeBtnFilled" onclick='favButtonPressed(${index})'></button>
        <button id="editBtn${index}" class="editBtn" onclick='editButtonPressed(${index})'></button>
        </div>
        </div>`
        index++
    }
    document.querySelector("#works").innerHTML = layout
}

function favButtonPressed(index) {
    let work = favorites[index]
    removeFromFavorites(work, function() {
        const tmp = favorites.indexOf(index);
        if (index > -1) {
            favorites.splice(tmp, 1);
        }
        presentFavorites(favorites)
    })
}

function editButtonPressed(index) {

}

function containsWord(searchInput, work) {
    if (work.titleweb.toLowerCase().includes(searchInput.toLowerCase())) {
        return true
    }
    return false
}
