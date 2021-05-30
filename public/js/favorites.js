var favorites = []

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
        layout += `<div class="work-item"><p><b>Title:</b> ${item.titleweb}<br><b>Author:</b> ${item.authorweb}</p>
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
    
}

function editButtonPressed(index) {

}

const responses = {
	SUCCESS: "success",
	ERROR: "error",
}
